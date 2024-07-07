const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await Todo.create({ title, description, userId: req.user.userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.userId } });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findOne({ where: { id, userId: req.user.userId } });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({ where: { id, userId: req.user.userId } });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
