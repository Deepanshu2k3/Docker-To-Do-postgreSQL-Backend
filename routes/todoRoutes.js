const express = require('express');
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createTodo);
router.get('/', authenticate, getTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;
