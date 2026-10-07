import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ensure uploads directory exists
const uploadsDir = 'uploads'
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Generates a unique filename: timestamp-randomstring.extension
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueName = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext
    cb(null, uniqueName)
  }
})

// File filter logic
const fileFilter = (req, file, cb) => {
  // ✅ Allowed extensions
  const allowedExtensions = /jpeg|jpg|png|pdf|doc|docx|zip|txt/
  
  // Check extension name
  const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase())
  
  // Check mime type (added application/octet-stream for better mobile support)
  const allowedMimeTypes = /image\/jpeg|image\/png|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/zip|text\/plain|application\/octet-stream/
  const mimetype = allowedMimeTypes.test(file.mimetype)

  if (extname || mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Error: Invalid file type. Only Images, PDF, Doc, and ZIP are allowed.'))
  }
}

// Final upload configuration
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB Limit
  },
  fileFilter: fileFilter
})

export default upload