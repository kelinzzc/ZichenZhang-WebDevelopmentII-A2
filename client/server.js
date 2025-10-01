const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.CLIENT_PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API proxy configuration 
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/event/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'event-details.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Client server running at http://localhost:${PORT}`);
    console.log(`Homepage: http://localhost:${PORT}`);
});