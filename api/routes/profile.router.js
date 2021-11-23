import express from 'express';
import { readProfile } from '../controllers/profile.controller.js';
const router = express.Router();

router.get('/', readProfile);

export default router;
