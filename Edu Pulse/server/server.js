import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import userRoutes from './routes/userRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import adminRoutes from './routes/admin.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();
connectDB();

const app = express();

/**
 * ✅ UPDATED CORS CONFIGURATION
 * Using origin: '*' for development is the most reliable way to prevent 
 * "Network Request Failed" on mobile devices, which often send 
 * non-standard headers or null origins.
 */
app.use(cors({
  origin: '*', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create HTTP server for WebSockets
const server = http.createServer(app);

// Setup Socket Handlers
import setupSocketHandlers from './websocket/socketHandlers.js';
setupSocketHandlers(server);

/**
 * 🛠️ HEALTH CHECK
 * Use this in your phone's browser (http://10.245.235.1:5000/api/health)
 * to confirm the connection is alive.
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is reachable via mobile',
    ip: '10.245.235.1',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

app.get('/', (req, res) => res.send('FacultyConnect API is running...'));

const PORT = process.env.PORT || 5000;

/**
 * ✅ FIXED IP BINDING
 * Listening on '0.0.0.0' is mandatory for external device access.
 */
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://10.17.213.1:${PORT}`);
  console.log(`🔌 WebSockets enabled and CORS configured for mobile`);
});