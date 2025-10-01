const request = require('supertest');
const app = require('./server');
const db = require('./config/database');

// 测试数据
const TEST_EVENT_ID = 1;
const TEST_CATEGORY_ID = 1;

describe('慈善活动API测试', () => {
    beforeAll(async () => {
        // 等待数据库连接
        await db.testConnection();
    });

    describe('健康检查端点', () => {
        test('GET /health - 应该返回健康状态', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
        });
    });

    describe('活动端点', () => {
        test('GET /api/events - 应该返回活动列表', async () => {
            const response = await request(app).get('/api/events');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.pagination).toBeDefined();
        });

        test('GET /api/events/search - 应该支持搜索', async () => {
            const response = await request(app)
                .get('/api/events/search')
                .query({ location: '悉尼' });
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        test('GET /api/events/:id - 应该返回活动详情', async () => {
            const response = await request(app).get(`/api/events/${TEST_EVENT_ID}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(TEST_EVENT_ID);
        });

        test('GET /api/events/featured/featured - 应该返回热门活动', async () => {
            const response = await request(app).get('/api/events/featured/featured');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('类别端点', () => {
        test('GET /api/categories - 应该返回类别列表', async () => {
            const response = await request(app).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        test('GET /api/categories/:id - 应该返回类别详情', async () => {
            const response = await request(app).get(`/api/categories/${TEST_CATEGORY_ID}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(TEST_CATEGORY_ID);
        });
    });

    describe('错误处理', () => {
        test('GET /api/events/9999 - 不存在的活动应该返回404', async () => {
            const response = await request(app).get('/api/events/9999');
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        test('GET /invalid-route - 无效路由应该返回404', async () => {
            const response = await request(app).get('/invalid-route');
            expect(response.status).toBe(404);
        });
    });
});