import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import approvalRoutes from './routes/approvalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Visitor routes
app.use('/api/visitors', visitorRoutes);

// Approval routes
app.use('/api/approvals', approvalRoutes);

// Server listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
