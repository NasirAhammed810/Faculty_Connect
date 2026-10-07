import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function FacultyDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  // Sample faculty data
  const facultyStats = [
    { id: '1', title: 'Courses', value: '4', icon: 'book', color: '#d35400' },
    { id: '2', title: 'Students', value: '145', icon: 'user-graduate', color: '#d35400' },
    { id: '3', title: 'Assignments', value: '8', icon: 'tasks', color: '#d35400' },
    { id: '4', title: 'Avg Rating', value: '4.7', icon: 'star', color: '#d35400' },
  ];

  const facultyActions = [
    { id: '1', title: 'Create Assignment', icon: 'edit', color: '#d35400' },
    { id: '2', title: 'Upload Material', icon: 'upload', color: '#d35400' },
    { id: '3', title: 'Grade Students', icon: 'grade', color: '#d35400' },
    { id: '4', title: 'Take Attendance', icon: 'checklist', color: '#d35400' },
    { id: '5', title: 'Schedule Class', icon: 'calendar', color: '#d35400' },
    { id: '6', title: 'Send Announcement', icon: 'announcement', color: '#d35400' },
  ];

  const courses = [
    { id: '1', code: 'CS101', name: 'Programming Fundamentals', students: 45, time: 'Mon, Wed 9-10:30 AM' },
    { id: '2', code: 'CS201', name: 'Data Structures', students: 38, time: 'Tue, Thu 11-12:30 PM' },
    { id: '3', code: 'CS301', name: 'Algorithms', students: 42, time: 'Mon, Fri 2-3:30 PM' },
  ];

  const pendingTasks = [
    { id: '1', task: 'Grade CS101 Assignment 3', due: 'Tomorrow', priority: 'high' },
    { id: '2', task: 'Review Project Submissions', due: '2 days', priority: 'medium' },
    { id: '3', task: 'Update Course Materials', due: 'This week', priority: 'low' },
  ];

  const upcomingClasses = [
    { id: '1', course: 'CS101', time: 'Today, 9:00 AM', room: 'Room 301', status: 'upcoming' },
    { id: '2', course: 'CS201', time: 'Today, 11:00 AM', room: 'Room 205', status: 'upcoming' },
    { id: '3', course: 'CS301', time: 'Tomorrow, 2:00 PM', room: 'Room 108', status: 'tomorrow' },
  ];

  const recentAnnouncements = [
    { id: '1', title: 'Mid-term Exam Guidelines', date: 'Yesterday', course: 'CS101' },
    { id: '2', title: 'Assignment Deadline Extended', date: '2 days ago', course: 'CS201' },
    { id: '3', title: 'Lab Schedule Update', date: '3 days ago', course: 'CS301' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.facultyBadge}>
            <Ionicons name="person-circle" size={35} color="#fff" />
          </View>
          <Text style={styles.welcome}>Welcome, Professor</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>Faculty Member</Text>
          
          {/* Faculty Stats */}
          <View style={styles.facultyStats}>
            <View style={styles.statsRow}>
              {facultyStats.map((stat) => (
                <View key={stat.id} style={styles.statItem}>
                  <FontAwesome5 name={stat.icon} size={16} color="#fff" />
                  <Text style={styles.statLabel}>{stat.title}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {facultyActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: '#FFF0E6' }]}>
                  <MaterialIcons name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.coursesList}>
            {courses.map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseCard}>
                <View style={styles.courseIcon}>
                  <FontAwesome5 name="chalkboard-teacher" size={24} color="#d35400" />
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseCode}>{course.code}</Text>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <View style={styles.courseDetails}>
                    <View style={styles.courseDetail}>
                      <Ionicons name="people" size={14} color="#666" />
                      <Text style={styles.detailText}>{course.students} students</Text>
                    </View>
                    <View style={styles.courseDetail}>
                      <Ionicons name="time" size={14} color="#666" />
                      <Text style={styles.detailText}>{course.time}</Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pending Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>{pendingTasks.length} Tasks</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksList}>
            {pendingTasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={[
                  styles.taskPriority,
                  { 
                    backgroundColor: task.priority === 'high' ? '#FEF2F2' : 
                                    task.priority === 'medium' ? '#FFFBEB' : '#F0F9FF' 
                  }
                ]}>
                  <Ionicons 
                    name={task.priority === 'high' ? 'alert-circle' : 'time'} 
                    size={20} 
                    color={task.priority === 'high' ? '#DC2626' : 
                          task.priority === 'medium' ? '#D97706' : '#0EA5E9'} 
                  />
                </View>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.task}</Text>
                  <Text style={styles.taskDue}>Due: {task.due}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Classes</Text>
          
          <View style={styles.classesList}>
            {upcomingClasses.map((classItem) => (
              <View key={classItem.id} style={styles.classCard}>
                <View style={styles.classHeader}>
                  <View style={[
                    styles.classStatus,
                    { backgroundColor: classItem.status === 'upcoming' ? '#FFE4CC' : '#FFF0E6' }
                  ]}>
                    <Ionicons 
                      name="time" 
                      size={16} 
                      color={classItem.status === 'upcoming' ? '#d35400' : '#FFA94D'} 
                    />
                    <Text style={[
                      styles.statusText,
                      { color: classItem.status === 'upcoming' ? '#d35400' : '#FFA94D' }
                    ]}>
                      {classItem.status === 'upcoming' ? 'Upcoming' : 'Tomorrow'}
                    </Text>
                  </View>
                  <Text style={styles.classTime}>{classItem.time}</Text>
                </View>
                <Text style={styles.classCourse}>{classItem.course}</Text>
                <Text style={styles.classRoom}>{classItem.room}</Text>
              </View>
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
            {recentAnnouncements.map((announcement) => (
              <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
                <View style={styles.announcementIcon}>
                  <Ionicons name="megaphone" size={20} color="#d35400" />
                </View>
                <View style={styles.announcementInfo}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <View style={styles.announcementMeta}>
                    <Text style={styles.announcementCourse}>{announcement.course}</Text>
                    <Text style={styles.announcementDate}>{announcement.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Office Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office Hours</Text>
          
          <View style={styles.officeHoursCard}>
            <View style={styles.officeHoursHeader}>
              <Ionicons name="business" size={24} color="#d35400" />
              <Text style={styles.officeHoursTitle}>Available This Week</Text>
            </View>
            
            <View style={styles.officeHoursSchedule}>
              <View style={styles.scheduleItem}>
                <Text style={styles.day}>Monday</Text>
                <Text style={styles.time}>2:00 PM - 4:00 PM</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.day}>Wednesday</Text>
                <Text style={styles.time}>10:00 AM - 12:00 PM</Text>
              </View>
              <View style={styles.scheduleItem}>
                <Text style={styles.day}>Friday</Text>
                <Text style={styles.time}>3:00 PM - 5:00 PM</Text>
              </View>
            </View>
            
            <Text style={styles.officeLocation}>Location: Faculty Block, Room 205</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#d35400',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  facultyBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcome: {
    fontSize: 18,
    color: '#ffe6cc',
    marginTop: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  role: {
    fontSize: 14,
    color: '#ffcc99',
    marginTop: 5,
    marginBottom: 15,
  },
  facultyStats: {
    width: '100%',
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 15,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 70,
  },
  statLabel: {
    fontSize: 12,
    color: '#ffcc99',
    marginTop: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
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
    color: '#d35400',
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
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
    textAlign: 'center',
  },
  coursesList: {
    gap: 12,
  },
  courseCard: {
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
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 8,
  },
  courseDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  courseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  tasksList: {
    gap: 12,
  },
  taskCard: {
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
  taskPriority: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  taskDue: {
    fontSize: 14,
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  classStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  classTime: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  classCourse: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 4,
  },
  classRoom: {
    fontSize: 14,
    color: '#666',
  },
  announcementsList: {
    gap: 12,
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
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E6',
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
  announcementMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementCourse: {
    fontSize: 14,
    color: '#d35400',
    fontWeight: '500',
  },
  announcementDate: {
    fontSize: 12,
    color: '#999',
  },
  officeHoursCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  officeHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  officeHoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginLeft: 10,
    flex: 1,
  },
  officeHoursSchedule: {
    gap: 12,
    marginBottom: 15,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  day: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  officeLocation: {
    fontSize: 14,
    color: '#d35400',
    fontWeight: '500',
    textAlign: 'center',
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
});