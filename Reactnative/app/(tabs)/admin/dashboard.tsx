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

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  // Sample admin data
  const systemStats = [
    { id: '1', title: 'Total Users', value: '1,250', change: '+12%', icon: 'people', color: '#4F46E5' },
    { id: '2', title: 'Active Faculty', value: '85', change: '+5%', icon: 'chalkboard-teacher', color: '#059669' },
    { id: '3', title: 'Active Students', value: '1,150', change: '+8%', icon: 'user-graduate', color: '#DC2626' },
    { id: '4', title: 'System Uptime', value: '99.8%', change: '+0.2%', icon: 'server', color: '#EA580C' },
  ];

  const adminActions = [
    { id: '1', title: 'User Management', icon: 'people', description: 'Manage user accounts', color: '#2c5aa0' },
    { id: '2', title: 'System Analytics', icon: 'chart-bar', description: 'View platform analytics', color: '#2c5aa0' },
    { id: '3', title: 'Content Management', icon: 'file-alt', description: 'Manage platform content', color: '#2c5aa0' },
    { id: '4', title: 'Settings', icon: 'cog', description: 'System configuration', color: '#2c5aa0' },
    { id: '5', title: 'Reports', icon: 'file-export', description: 'Generate reports', color: '#2c5aa0' },
    { id: '6', title: 'Security', icon: 'shield-alt', description: 'Security settings', color: '#2c5aa0' },
  ];

  const recentActivities = [
    { id: '1', action: 'New faculty added', user: 'Dr. Smith', time: '10 min ago', type: 'add' },
    { id: '2', action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { id: '3', action: 'Password reset requested', user: 'John Doe', time: '2 hours ago', type: 'security' },
    { id: '4', action: 'Course content updated', user: 'Prof. Johnson', time: '3 hours ago', type: 'update' },
  ];

  const quickTasks = [
    { id: '1', title: 'Approve pending requests', count: 5, priority: 'high' },
    { id: '2', title: 'Review system logs', count: 12, priority: 'medium' },
    { id: '3', title: 'Update user permissions', count: 3, priority: 'low' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.adminBadge}>
            <Ionicons name="shield" size={30} color="#fff" />
          </View>
          <Text style={styles.welcome}>Administrator Panel</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>System Administrator</Text>
          
          {/* Admin Stats */}
          <View style={styles.adminStats}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <FontAwesome5 name="user-cog" size={16} color="#fff" />
                <Text style={styles.statLabel}>Super Admin</Text>
              </View>
              <View style={styles.statItem}>
                <FontAwesome5 name="key" size={16} color="#fff" />
                <Text style={styles.statLabel}>Full Access</Text>
              </View>
            </View>
          </View>
        </View>

        {/* System Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <View style={styles.statsGrid}>
            {systemStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <FontAwesome5 name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <Text style={styles.statChange}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>All Actions</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionsGrid}>
            {adminActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <FontAwesome5 name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          
          <View style={styles.tasksList}>
            {quickTasks.map((task) => (
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
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCount}>{task.count} items</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[
                  styles.activityIcon,
                  { 
                    backgroundColor: activity.type === 'add' ? '#D1FAE5' : 
                                    activity.type === 'system' ? '#DBEAFE' : 
                                    activity.type === 'security' ? '#FEE2E2' : '#FEF3C7' 
                  }
                ]}>
                  <Ionicons 
                    name={activity.type === 'add' ? 'person-add' : 
                          activity.type === 'system' ? 'server' : 
                          activity.type === 'security' ? 'shield-checkmark' : 'create'} 
                    size={18} 
                    color={activity.type === 'add' ? '#059669' : 
                          activity.type === 'system' ? '#2563EB' : 
                          activity.type === 'security' ? '#DC2626' : '#D97706'} 
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityUser}>{activity.user}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          
          <View style={styles.healthCard}>
            <View style={styles.healthHeader}>
              <Ionicons name="pulse" size={24} color="#2c5aa0" />
              <Text style={styles.healthTitle}>Current Status</Text>
              <View style={styles.healthStatus}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>All Systems Operational</Text>
              </View>
            </View>
            
            <View style={styles.healthMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>CPU Usage</Text>
                <Text style={styles.metricValue}>42%</Text>
                <View style={styles.metricBar}>
                  <View style={[styles.metricFill, { width: '42%', backgroundColor: '#4F46E5' }]} />
                </View>
              </View>
              
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Memory</Text>
                <Text style={styles.metricValue}>68%</Text>
                <View style={styles.metricBar}>
                  <View style={[styles.metricFill, { width: '68%', backgroundColor: '#059669' }]} />
                </View>
              </View>
              
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Storage</Text>
                <Text style={styles.metricValue}>85%</Text>
                <View style={styles.metricBar}>
                  <View style={[styles.metricFill, { width: '85%', backgroundColor: '#EA580C' }]} />
                </View>
              </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2c5aa0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  adminBadge: {
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
    color: '#e0e0e0',
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
    color: '#bbbbbb',
    marginTop: 5,
    marginBottom: 15,
  },
  adminStats: {
    width: '100%',
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#bbbbbb',
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
    color: '#2c5aa0',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
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
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statChange: {
    fontSize: 12,
    color: '#059669',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  taskCount: {
    fontSize: 14,
    color: '#666',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityUser: {
    fontSize: 14,
    color: '#666',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  healthCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginLeft: 10,
    flex: 1,
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  healthMetrics: {
    gap: 15,
  },
  metric: {
    gap: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  metricBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  metricFill: {
    height: '100%',
    borderRadius: 3,
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