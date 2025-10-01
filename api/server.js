const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const eventRoutes = require('./routes/events');
const categoryRoutes = require('./routes/categories');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/images', express.static('public/images'));

// API route configuration
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);

// Root path route
app.get('/', (req, res) => {
    res.json({
        message: 'Charity Events API service is running',
        version: '1.0.0',
        endpoints: {
            events: '/api/events',
            categories: '/api/categories'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Charity Events API'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `The requested path ${req.originalUrl} does not exist`
    });
});

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`API documentation: http://localhost:${PORT}`);
});

module.exports = app;