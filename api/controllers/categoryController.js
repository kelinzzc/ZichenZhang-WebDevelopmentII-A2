const db = require('../config/database');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const sql = `
            SELECT 
                c.*,
                COUNT(e.id) as event_count
            FROM categories c
            LEFT JOIN events e ON c.id = e.category_id AND e.is_active = TRUE AND e.is_suspended = FALSE
            GROUP BY c.id, c.name, c.description
            ORDER BY c.name
        `;

        const categories = await db.query(sql);

        res.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('Get categories list error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get categories list',
            message: error.message
        });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT 
                c.*,
                COUNT(e.id) as event_count
            FROM categories c
            LEFT JOIN events e ON c.id = e.category_id AND e.is_active = TRUE AND e.is_suspended = FALSE
            WHERE c.id = ?
            GROUP BY c.id, c.name, c.description
        `;

        const categories = await db.query(sql, [parseInt(id)]);

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: categories[0]
        });

    } catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get category',
            message: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById
};