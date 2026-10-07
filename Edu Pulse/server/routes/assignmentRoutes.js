import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import Assignment from '../models/Assignment.js' // ✅ Ensure correct path
import {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentsByTeacher,
  getAssignmentsForStudent,
} from '../controllers/assignmentController.js'

const router = express.Router()

router.post('/', protect, upload.single('file'), createAssignment)
router.get('/class/:className', protect, getAssignmentsByClass)
router.get('/teacher', protect, getAssignmentsByTeacher)
router.get('/student', protect, getAssignmentsForStudent)

// ✅ FIXED: Single Assignment Route
router.get('/:id', protect, async (req, res) => {
  try {
    // Validate ID to prevent MongoDB casting error (prevents 500 error)
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid Assignment ID format' });
    }

    const assignment = await Assignment.findById(req.params.id).populate('faculty', 'name');
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }
    
    res.json({ success: true, assignment });
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router