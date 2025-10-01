const mysql = require('mysql2');
require('dotenv').config();

// 数据库配置
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

// 创建连接池
const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

// 连接测试函数
const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT NOW() as current_time');
        console.log('✅ 数据库连接成功:', rows[0].current_time);
        return true;
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
        return false;
    }
};

// 通用查询函数
const query = async (sql, params = []) => {
    try {
        console.log(`🔍 执行查询: ${sql}`, params);
        const [rows] = await promisePool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('❌ 查询执行失败:', error);
        throw new Error(`数据库查询错误: ${error.message}`);
    }
};

// 关闭连接池
const closePool = async () => {
    try {
        await promisePool.end();
        console.log('📦 数据库连接池已关闭');
    } catch (error) {
        console.error('关闭连接池时出错:', error);
    }
};

module.exports = {
    pool: promisePool,
    testConnection,
    query,
    closePool
};