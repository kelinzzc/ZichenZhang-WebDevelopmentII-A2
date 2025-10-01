const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 导入路由
const eventRoutes = require('./routes/events');
const categoryRoutes = require('./routes/categories');

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（为客户端提供图片等资源）
app.use('/images', express.static('public/images'));

// API路由配置
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);

// 根路径路由
app.get('/', (req, res) => {
    res.json({
        message: '慈善活动API服务运行中',
        version: '1.0.0',
        endpoints: {
            events: '/api/events',
            categories: '/api/categories'
        }
    });
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Charity Events API'
    });
});

// 404处理
app.use('*', (req, res) => {
    res.status(404).json({
        error: '端点未找到',
        message: `请求的路径 ${req.originalUrl} 不存在`
    });
});

// 全局错误处理中间件
app.use((error, req, res, next) => {
    console.error('服务器错误:', error);
    res.status(500).json({
        error: '内部服务器错误',
        message: process.env.NODE_ENV === 'development' ? error.message : '请稍后重试'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 API服务器运行在端口 ${PORT}`);
    console.log(`📚 API文档: http://localhost:${PORT}`);
});

module.exports = app;