import express from 'express';
import { registerVisitor } from '../controllers/visitorController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', protect, authorizeRoles('guard', 'admin'), upload.single('photo'), registerVisitor);

export default router;
