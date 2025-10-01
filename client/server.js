const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.CLIENT_PORT || 3001;

// 中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API代理配置（如果需要）
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/event/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'event-details.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🌐 客户端服务器运行在 http://localhost:${PORT}`);
    console.log(`📱 首页: http://localhost:${PORT}`);
});