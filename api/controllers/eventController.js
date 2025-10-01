const db = require('../config/database');

// Get all events (homepage)
const getAllEvents = async (req, res) => {
    try {
        const { page = 1, limit = 10, type = 'upcoming' } = req.query;
        const offset = (page - 1) * limit;

        let whereClause = 'WHERE e.is_active = TRUE AND e.is_suspended = FALSE';
        
        // Filter events by type
        if (type === 'upcoming') {
            whereClause += ' AND e.event_date >= CURDATE()';
        } else if (type === 'past') {
            whereClause += ' AND e.event_date < CURDATE()';
        }

        const limitNum = parseInt(limit, 10);
        const offsetNum = parseInt(offset, 10);

        const sql = `
            SELECT 
                e.id,
                e.title,
                e.description,
                e.full_description,
                e.event_date,
                e.location,
                e.venue_details,
                e.ticket_price,
                e.goal_amount,
                e.current_amount,
                e.max_attendees,
                e.image_url,
                c.name as category_name,
                c.id as category_id,
                o.name as organization_name,
                o.id as organization_id,
                (e.goal_amount - e.current_amount) as remaining_amount,
                ROUND((e.current_amount / e.goal_amount) * 100, 2) as progress_percentage
            FROM events e
            JOIN categories c ON e.category_id = c.id
            JOIN organizations o ON e.organization_id = o.id
            ${whereClause}
            ORDER BY e.event_date ASC
            LIMIT ${limitNum} OFFSET ${offsetNum}
        `;

        console.log('🔍 Executing query:', sql);
        
        const events = await db.query(sql);

        // Get total count for pagination
        const countSql = `
            SELECT COUNT(*) as total 
            FROM events e 
            ${whereClause}
        `;
        const [countResult] = await db.query(countSql);
        const total = countResult.total;

        res.json({
            success: true,
            data: events,
            pagination: {
                page: parseInt(page),
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });

    } catch (error) {
        console.error('Get events list error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get events list',
            message: error.message
        });
    }
};

// Search events
const searchEvents = async (req, res) => {
    try {
        const { date, location, category, keyword } = req.query;
        
        let whereConditions = ['e.is_active = TRUE AND e.is_suspended = FALSE'];
        let params = [];

        // Build dynamic query conditions
        if (date) {
            whereConditions.push('DATE(e.event_date) = ?');
            params.push(date);
        }
        
        if (location) {
            whereConditions.push('e.location LIKE ?');
            params.push(`%${location}%`);
        }
        
        if (category) {
            whereConditions.push('e.category_id = ?');
            params.push(parseInt(category));
        }
        
        if (keyword) {
            whereConditions.push('(e.title LIKE ? OR e.description LIKE ? OR e.full_description LIKE ?)');
            params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
        }

        const whereClause = whereConditions.length > 0 ? 
            `WHERE ${whereConditions.join(' AND ')}` : '';

        const sql = `
            SELECT 
                e.id,
                e.title,
                e.description,
                e.event_date,
                e.location,
                e.ticket_price,
                e.goal_amount,
                e.current_amount,
                e.image_url,
                c.name as category_name,
                o.name as organization_name,
                ROUND((e.current_amount / e.goal_amount) * 100, 2) as progress_percentage
            FROM events e
            JOIN categories c ON e.category_id = c.id
            JOIN organizations o ON e.organization_id = o.id
            ${whereClause}
            ORDER BY e.event_date ASC
        `;

        const events = await db.query(sql, params);

        res.json({
            success: true,
            data: events,
            total: events.length,
            filters: { date, location, category, keyword }
        });

    } catch (error) {
        console.error('Search events error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search events',
            message: error.message
        });
    }
};

// Get event details
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT 
                e.*,
                c.name as category_name,
                c.description as category_description,
                o.name as organization_name,
                o.description as organization_description,
                o.mission_statement,
                o.contact_email,
                o.contact_phone,
                o.address,
                ROUND((e.current_amount / e.goal_amount) * 100, 2) as progress_percentage,
                (e.goal_amount - e.current_amount) as remaining_amount,
                (e.max_attendees - COALESCE((SELECT SUM(ticket_quantity) FROM registrations WHERE event_id = e.id), 0)) as available_tickets
            FROM events e
            JOIN categories c ON e.category_id = c.id
            JOIN organizations o ON e.organization_id = o.id
            WHERE e.id = ? AND e.is_active = TRUE AND e.is_suspended = FALSE
        `;

        const events = await db.query(sql, [parseInt(id)]);

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Event not found',
                message: 'The specified event does not exist or has been suspended'
            });
        }

        res.json({
            success: true,
            data: events[0]
        });

    } catch (error) {
        console.error('Get event details error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get event details',
            message: error.message
        });
    }
};

// Get featured events
const getFeaturedEvents = async (req, res) => {
    try {
        const sql = `
            SELECT 
                e.id,
                e.title,
                e.description,
                e.event_date,
                e.location,
                e.ticket_price,
                e.goal_amount,
                e.current_amount,
                e.image_url,
                c.name as category_name,
                o.name as organization_name,
                ROUND((e.current_amount / e.goal_amount) * 100, 2) as progress_percentage
            FROM events e
            JOIN categories c ON e.category_id = c.id
            JOIN organizations o ON e.organization_id = o.id
            WHERE e.is_active = TRUE 
                AND e.is_suspended = FALSE 
                AND e.event_date >= CURDATE()
            ORDER BY e.current_amount / e.goal_amount DESC, e.event_date ASC
            LIMIT 6
        `;

        const events = await db.query(sql);

        res.json({
            success: true,
            data: events
        });

    } catch (error) {
        console.error('Get featured events error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get featured events',
            message: error.message
        });
    }
};

module.exports = {
    getAllEvents,
    searchEvents,
    getEventById,
    getFeaturedEvents
};