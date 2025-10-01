const request = require('supertest');
const app = require('./server');
const db = require('./config/database');

// Test data
const TEST_EVENT_ID = 1;
const TEST_CATEGORY_ID = 1;

describe('Charity Events API Tests', () => {
    beforeAll(async () => {
        // Wait for database connection
        await db.testConnection();
    });

    describe('Health Check Endpoint', () => {
        test('GET /health - should return health status', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
        });
    });

    describe('Events Endpoints', () => {
        test('GET /api/events - should return events list', async () => {
            const response = await request(app).get('/api/events');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.pagination).toBeDefined();
        });

        test('GET /api/events/search - should support search', async () => {
            const response = await request(app)
                .get('/api/events/search')
                .query({ location: 'Sydney' });
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        test('GET /api/events/:id - should return event details', async () => {
            const response = await request(app).get(`/api/events/${TEST_EVENT_ID}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(TEST_EVENT_ID);
        });

        test('GET /api/events/featured/featured - should return featured events', async () => {
            const response = await request(app).get('/api/events/featured/featured');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('Categories Endpoints', () => {
        test('GET /api/categories - should return categories list', async () => {
            const response = await request(app).get('/api/categories');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        test('GET /api/categories/:id - should return category details', async () => {
            const response = await request(app).get(`/api/categories/${TEST_CATEGORY_ID}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(TEST_CATEGORY_ID);
        });
    });

    describe('Error Handling', () => {
        test('GET /api/events/9999 - non-existent event should return 404', async () => {
            const response = await request(app).get('/api/events/9999');
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });

        test('GET /invalid-route - invalid route should return 404', async () => {
            const response = await request(app).get('/invalid-route');
            expect(response.status).toBe(404);
        });
    });
});