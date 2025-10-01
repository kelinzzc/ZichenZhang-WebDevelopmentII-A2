const mysql = require('mysql2');

// Create database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',        
    password: '817817', 
    database: 'charityevents_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Convert to Promise interface
const promisePool = pool.promise();

// Test connection function
async function testConnection() {
    try {
        const [rows] = await promisePool.query('SELECT NOW() as current_time');
        console.log('Database connection successful - current time:', rows[0].current_time);
        
        // Test table query
        const [events] = await promisePool.query('SELECT COUNT(*) as count FROM events');
        console.log(`Database contains ${events[0].count} events`);
        
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
}

// General query function
async function query(sql, params = []) {
    try {
        const [rows] = await promisePool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Export module
module.exports = {
    pool: promisePool,
    testConnection,
    query
};