import express from 'express';

import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/tasks.controller.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', addTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
