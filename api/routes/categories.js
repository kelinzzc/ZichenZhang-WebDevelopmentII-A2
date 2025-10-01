const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById
} = require('../controllers/categoryController');


// @route   GET /api/categories
// @access  Public
router.get('/', getAllCategories);


// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', getCategoryById);

module.exports = router;