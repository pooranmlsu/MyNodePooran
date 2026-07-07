const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  searchNews,
} = require('../controllers/newsController');

// Search route must come before :id route
router.get('/search', searchNews);
router.route('/').get(getNews).post(createNews);
router.route('/:id').get(getNewsById).put(updateNews).delete(deleteNews);

module.exports = router;