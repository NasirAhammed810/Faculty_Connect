import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useAuth } from '../../contexts/AuthContext'

export default function StudentDashboard() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }

  // Sample data for student
  const courses = [
    { id: '1', code: 'CS101', name: 'Programming Fundamentals', progress: 75, color: '#4F46E5' },
    { id: '2', code: 'CS201', name: 'Data Structures', progress: 60, color: '#059669' },
    { id: '3', code: 'MATH101', name: 'Calculus I', progress: 90, color: '#DC2626' },
    { id: '4', code: 'PHYS101', name: 'Physics Fundamentals', progress: 45, color: '#EA580C' },
  ]

  const assignments = [
    { id: '1', course: 'CS101', title: 'Programming Assignment 3', due: 'Tomorrow', status: 'Pending' },
    { id: '2', course: 'CS201', title: 'Linked List Implementation', due: '2 days', status: 'Submitted' },
    { id: '3', course: 'MATH101', title: 'Calculus Problems Set', due: '1 week', status: 'Pending' },
  ]

  const announcements = [
    { id: '1', title: 'Mid-term Exam Schedule', date: '2 hours ago', priority: 'high' },
    { id: '2', title: 'Library Timings Changed', date: '1 day ago', priority: 'medium' },
    { id: '3', title: 'Sports Day Registration', date: '2 days ago', priority: 'low' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          {user?.profilePic ? (
            <Image
              source={{ uri: user.profilePic }}
              style={styles.profilePic}
            />
          ) : (
            <Ionicons name="person-circle" size={90} color="#fff" />
          )}

          <Text style={styles.welcome}>Welcome Back 👋</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>
            Student {user?.className ? `• ${user.className}` : ''}
          </Text>
          
          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text" size={28} color="#27ae60" />
              <Text style={styles.actionTitle}>Assignments</Text>
              <Text style={styles.actionSubtitle}>3 pending</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="book" size={28} color="#27ae60" />
              <Text style={styles.actionTitle}>Materials</Text>
              <Text style={styles.actionSubtitle}>Study notes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="trophy" size={28} color="#27ae60" />
              <Text style={styles.actionTitle}>Grades</Text>
              <Text style={styles.actionSubtitle}>View marks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar" size={28} color="#27ae60" />
              <Text style={styles.actionTitle}>Schedule</Text>
              <Text style={styles.actionSubtitle}>Timetable</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
            {courses.map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseCard}>
                <View style={[styles.courseIcon, { backgroundColor: `${course.color}15` }]}>
                  <FontAwesome5 name="book" size={24} color={course.color} />
                </View>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseName}>{course.name}</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${course.progress}%`, backgroundColor: course.color }]} />
                </View>
                <Text style={styles.progressText}>{course.progress}% Complete</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Pending Assignments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Assignments</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.assignmentsList}>
            {assignments.map((assignment) => (
              <TouchableOpacity key={assignment.id} style={styles.assignmentCard}>
                <View style={[
                  styles.assignmentStatus,
                  { backgroundColor: assignment.status === 'Pending' ? '#FFEBEE' : '#E8F5E9' }
                ]}>
                  <Ionicons 
                    name={assignment.status === 'Pending' ? 'time' : 'checkmark-circle'} 
                    size={20} 
                    color={assignment.status === 'Pending' ? '#DC2626' : '#059669'} 
                  />
                </View>
                <View style={styles.assignmentInfo}>
                  <Text style={styles.assignmentCourse}>{assignment.course}</Text>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <Text style={[
                    styles.assignmentDue,
                    { color: assignment.status === 'Pending' ? '#DC2626' : '#059669' }
                  ]}>
                    Due: {assignment.due}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Announcements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.announcementsList}>
            {announcements.map((announcement) => (
              <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
                <View style={[
                  styles.announcementPriority,
                  { 
                    backgroundColor: announcement.priority === 'high' ? '#FEF2F2' : 
                                    announcement.priority === 'medium' ? '#FFFBEB' : '#F0F9FF' 
                  }
                ]}>
                  <Ionicons 
                    name={announcement.priority === 'high' ? 'alert-circle' : 'information-circle'} 
                    size={20} 
                    color={announcement.priority === 'high' ? '#DC2626' : 
                          announcement.priority === 'medium' ? '#D97706' : '#0EA5E9'} 
                  />
                </View>
                <View style={styles.announcementInfo}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <Text style={styles.announcementDate}>{announcement.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Classes</Text>
          
          <View style={styles.classesList}>
            <View style={styles.classCard}>
              <View style={styles.classTime}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.classTimeText}>9:00 AM - 10:30 AM</Text>
              </View>
              <Text style={styles.className}>CS101 - Programming Fundamentals</Text>
              <Text style={styles.classRoom}>Room: 301 • Prof. Dr. Smith</Text>
            </View>
            
            <View style={styles.classCard}>
              <View style={styles.classTime}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.classTimeText}>11:00 AM - 12:30 PM</Text>
              </View>
              <Text style={styles.className}>MATH101 - Calculus I</Text>
              <Text style={styles.classRoom}>Room: 205 • Prof. Dr. Johnson</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#27ae60',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  welcome: {
    fontSize: 18,
    color: '#d4f8e8',
    marginTop: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  role: {
    fontSize: 14,
    color: '#b8f0d9',
    marginTop: 5,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 15,
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#d4f8e8',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  viewAllText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginTop: 10,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  coursesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: 160,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  assignmentsList: {
    gap: 12,
  },
  assignmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  assignmentStatus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentCourse: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  assignmentDue: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  announcementsList: {
    gap: 10,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementPriority: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: '#666',
  },
  classesList: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  classTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classTimeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 4,
  },
  classRoom: {
    fontSize: 14,
    color: '#666',
  },
  logoutBtn: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footerSpacer: {
    height: 20,
  },
})