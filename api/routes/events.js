const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    searchEvents,
    getEventById,
    getFeaturedEvents
} = require('../controllers/eventController');

// @desc    获取所有活动（支持分页和类型过滤）
// @route   GET /api/events
// @access  Public
router.get('/', getAllEvents);

// @desc    搜索活动
// @route   GET /api/events/search
// @access  Public
router.get('/search', searchEvents);

// @desc    获取活动详情
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', getEventById);

// @desc    获取热门活动
// @route   GET /api/events/featured/featured
// @access  Public
router.get('/featured/featured', getFeaturedEvents);

module.exports = router;