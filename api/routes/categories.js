const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById
} = require('../controllers/categoryController');

// @desc    获取所有类别
// @route   GET /api/categories
// @access  Public
router.get('/', getAllCategories);

// @desc    根据ID获取类别
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', getCategoryById);

module.exports = router;