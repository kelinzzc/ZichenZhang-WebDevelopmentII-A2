const mysql = require('mysql2');
require('dotenv').config();

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '817817',
    database: process.env.DB_NAME || 'charityevents_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// Connection test function
const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
};

// General query function
const query = async (sql, params = []) => {
    try {
        console.log(`Executing query: ${sql}`, params);
        const [rows] = await promisePool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Query execution failed:', error);
        throw new Error(`Database query error: ${error.message}`);
    }
};

// Close connection pool
const closePool = async () => {
    try {
        await promisePool.end();
        console.log('Database connection pool closed');
    } catch (error) {
        console.error('Error closing connection pool:', error);
    }
};

module.exports = {
    pool: promisePool,
    testConnection,
    query,
    closePool
};