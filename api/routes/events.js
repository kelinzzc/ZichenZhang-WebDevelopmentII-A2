const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    searchEvents,
    getEventById,
    getFeaturedEvents
} = require('../controllers/eventController');

// @route   GET /api/events
// @access  Public
router.get('/', getAllEvents);


// @route   GET /api/events/search
// @access  Public
router.get('/search', searchEvents);


// @route   GET /api/events/:id
// @access  Public
router.get('/:id', getEventById);


// @route   GET /api/events/featured/featured
// @access  Public
router.get('/featured/featured', getFeaturedEvents);

module.exports = router;