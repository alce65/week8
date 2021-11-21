import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js';

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
