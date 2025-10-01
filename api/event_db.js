const mysql = require('mysql2');

// 创建数据库连接配置
const dbConfig = {
    host: 'localhost',
    user: 'root',        // 替换为你的MySQL用户名
    password: '817817', // 替换为你的MySQL密码
    database: 'charityevents_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 转换为Promise接口
const promisePool = pool.promise();

// 测试连接函数
async function testConnection() {
    try {
        const [rows] = await promisePool.query('SELECT NOW() as current_time');
        console.log('✅ 数据库连接成功 - 当前时间:', rows[0].current_time);
        
        // 测试表查询
        const [events] = await promisePool.query('SELECT COUNT(*) as count FROM events');
        console.log(`📊 数据库包含 ${events[0].count} 个活动`);
        
        return true;
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
        return false;
    }
}

// 通用查询函数
async function query(sql, params = []) {
    try {
        const [rows] = await promisePool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('数据库查询错误:', error);
        throw error;
    }
}

// 导出模块
module.exports = {
    pool: promisePool,
    testConnection,
    query
};