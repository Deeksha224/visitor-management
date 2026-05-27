import express from 'express';
import { updateVisitorStatus } from '../controllers/approvalController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/status', protect, authorizeRoles('employee', 'admin'), updateVisitorStatus);

export default router;
