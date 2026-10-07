import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import User from '../models/User.js'
import Timetable from '../models/Timetable.js'
import Assignment from '../models/Assignment.js'
import Feedback from '../models/Feedback.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env') })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://makampremkumar59_db_user:MPrem%4026092004@edupulse.4gtlrtl.mongodb.net/facultyconnect?retryWrites=true&w=majority'

const seedR21Data = async () => {
  try {
    console.log('🔌 Connecting to MongoDB Atlas (FacultyConnect Database)...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB successfully!')

    // Clear existing data in this database
    console.log('🧹 Clearing old collections...')
    await User.deleteMany({})
    await Timetable.deleteMany({})
    await Assignment.deleteMany({})
    await Feedback.deleteMany({})
    console.log('✨ Old collections cleared!')

    console.log('👥 Creating R21 Batch Users...')

    // 1. Admins
    const hodUser = new User({
      name: 'Dr. Ratna Kumari (HOD CSE)',
      username: 'hod_ratnakumari',
      email: 'hod.ratnakumari@facultyconnect.edu',
      password: '123456',
      role: 'Admin',
      isVerified: true
    })
    await hodUser.save()

    const aoUser = new User({
      name: 'Ravi Sir (Administrative Officer)',
      username: 'ao_ravi',
      email: 'ao.ravi@facultyconnect.edu',
      password: '123456',
      role: 'Admin',
      isVerified: true
    })
    await aoUser.save()

    // 2. Faculty
    const swapnaFaculty = new User({
      name: 'Swapna Mam',
      username: 'swapna',
      email: 'swapna@facultyconnect.edu',
      password: '123456',
      role: 'Faculty',
      isVerified: true
    })
    await swapnaFaculty.save()

    const ratnaFaculty = new User({
      name: 'Ratna Kumari Mam',
      username: 'ratnakumari',
      email: 'ratna@facultyconnect.edu',
      password: '123456',
      role: 'Faculty',
      isVerified: true
    })
    await ratnaFaculty.save()

    // 3. R21 Batch Students (E4 CSE-E Section)
    const studentsData = [
      { name: 'Shaik Nasir', username: 'R210001', email: 'nasir@facultyconnect.edu', className: 'E4 CSE-E' },
      { name: 'Mahendra', username: 'R210147', email: 'mahendra@facultyconnect.edu', className: 'E4 CSE-E' },
      { name: 'Jyothi Reddy', username: 'R210312', email: 'jyothireddy@facultyconnect.edu', className: 'E4 CSE-E' },
      { name: 'Dev Deepak', username: 'R211100', email: 'devdeepak@facultyconnect.edu', className: 'E4 CSE-E' }
    ]

    const createdStudents = []
    for (const student of studentsData) {
      const u = new User({
        name: student.name,
        username: student.username,
        email: student.email,
        password: '123456',
        role: 'Student',
        className: student.className,
        isVerified: true
      })
      await u.save()
      createdStudents.push(u)
    }

    console.log('✅ Users created successfully!')
    console.log(`- 2 Admins (HOD Ratna Kumari, AO Ravi Sir)`)
    console.log(`- 2 Faculty (Swapna Mam, Ratna Kumari Mam)`)
    console.log(`- 4 R21 Students in E4 CSE-E (Nasir, Mahendra, Jyothi Reddy, Dev Deepak)`)

    // 4. Timetables for E4 CSE-E
    console.log('📅 Creating Timetable for E4 CSE-E...')
    const timetableEntries = [
      {
        facultyId: swapnaFaculty._id,
        facultyName: 'Swapna Mam',
        day: 'Monday',
        timeSlot: '1',
        startTime: '08:30',
        endTime: '09:30',
        subject: 'Web Technologies',
        className: 'E4 CSE-E',
        room: 'Room 301'
      },
      {
        facultyId: ratnaFaculty._id,
        facultyName: 'Ratna Kumari Mam',
        day: 'Monday',
        timeSlot: '2',
        startTime: '09:30',
        endTime: '10:30',
        subject: 'Distributed Systems',
        className: 'E4 CSE-E',
        room: 'Room 301'
      },
      {
        facultyId: swapnaFaculty._id,
        facultyName: 'Swapna Mam',
        day: 'Monday',
        timeSlot: '3',
        startTime: '10:45',
        endTime: '11:45',
        subject: 'Software Engineering',
        className: 'E4 CSE-E',
        room: 'Room 301'
      },
      {
        facultyId: ratnaFaculty._id,
        facultyName: 'Ratna Kumari Mam',
        day: 'Tuesday',
        timeSlot: '1',
        startTime: '08:30',
        endTime: '09:30',
        subject: 'Distributed Systems',
        className: 'E4 CSE-E',
        room: 'Room 301'
      },
      {
        facultyId: swapnaFaculty._id,
        facultyName: 'Swapna Mam',
        day: 'Tuesday',
        timeSlot: '2',
        startTime: '09:30',
        endTime: '10:30',
        subject: 'Web Technologies Lab',
        className: 'E4 CSE-E',
        room: 'Lab 2'
      }
    ]

    await Timetable.insertMany(timetableEntries)
    console.log('✅ Timetables created successfully!')

    // 5. Create Sample Assignments
    console.log('📚 Creating Assignments...')
    await Assignment.create({
      title: 'Web Tech Lab Assignment 1 - Responsive Dashboard',
      description: 'Build a responsive portal layout using CSS Flexbox/Grid and React components.',
      className: 'E4 CSE-E',
      faculty: swapnaFaculty._id
    })

    await Assignment.create({
      title: 'Distributed Systems Task - Raft Consensus Notes',
      description: 'Submit a 2-page brief summary on consensus protocols and fault tolerance.',
      className: 'E4 CSE-E',
      faculty: ratnaFaculty._id
    })
    console.log('✅ Sample Assignments created!')

    // 6. Create Sample Feedback
    console.log('💬 Creating Sample Feedback Entries...')
    await Feedback.create({
      studentId: createdStudents[0]._id,
      studentName: createdStudents[0].name,
      facultyId: swapnaFaculty._id,
      facultyName: swapnaFaculty.name,
      subject: 'Web Technologies',
      rating: 5,
      comments: 'Very clear explanation of concepts and hands-on lab sessions!',
      isAnonymous: false
    })

    await Feedback.create({
      studentId: createdStudents[1]._id,
      studentName: createdStudents[1].name,
      facultyId: ratnaFaculty._id,
      facultyName: ratnaFaculty.name,
      subject: 'Distributed Systems',
      rating: 5,
      comments: 'Great lecture on cloud architecture and distributed node communication.',
      isAnonymous: true
    })
    console.log('✅ Sample Feedback created!')

    console.log('🎉 R21 DATABASE SEEDING COMPLETED SUCCESSFULLY!')
    console.log('--------------------------------------------------')
    console.log('🔑 ALL ACCOUNTS HAVE THE PASSWORD: 123456')
    console.log('--------------------------------------------------')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  }
}

seedR21Data()
