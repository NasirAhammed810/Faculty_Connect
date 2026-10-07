import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from './contexts/AuthContext';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const [activeRole, setActiveRole] = useState(0);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  // ✅ SINGLE SOURCE OF REDIRECTION
  useEffect(() => {
    if (loading) return;

    if (user) {
      const role = user.role?.toLowerCase();
      console.log('AUTO REDIRECT ROLE:', role);

      if (role === 'admin') {
        router.replace('/(tabs)/admin/dashboard');
      } else if (role === 'faculty') {
        router.replace('/(tabs)/faculty/dashboard');
      } else if (role === 'student') {
        router.replace('/(tabs)/student/dashboard');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1a237e" />
      </View>
    );
  }

  const roles = [
    {
      icon: 'cog',
      title: 'Administrator',
      description: 'Complete institutional management and analytics platform for academic administration',
      features: [
        'User account management',
        'Institutional analytics & reports',
        'System-wide monitoring',
        'Platform configuration',
        'Adding new members & editing profiles'
      ],
      color: '#2c5aa0'
    },
    {
      icon: 'chalkboard-teacher',
      title: 'Faculty Member',
      description: 'Comprehensive course delivery and student evaluation system',
      features: [
        'Create & manage assignments',
        'Upload course materials',
        'Grade student submissions',
        'Analyze student feedback',
        'Manage class schedules',
        'Take attendance & generate reports'
      ],
      color: '#d35400'
    },
    {
      icon: 'user-graduate',
      title: 'Student',
      description: 'Integrated learning and academic engagement platform',
      features: [
        'Access course materials',
        'Submit assignments digitally',
        'Provide course feedback',
        'View grades & progress',
        'Check attendance records',
        'Real-time communication'
      ],
      color: '#27ae60'
    }
  ];

  const platformFeatures = [
    {
      icon: 'tasks',
      title: 'Assignment Management',
      description: 'Complete workflow from creation to grading with automated tracking'
    },
    {
      icon: 'comments',
      title: 'Academic Communication',
      description: 'Structured messaging system between students and faculty'
    },
    {
      icon: 'chart-bar',
      title: 'Analytics & Reports',
      description: 'Comprehensive institutional insights and performance tracking'
    },
    {
      icon: 'file-upload',
      title: 'Digital Resource Hub',
      description: 'Centralized learning materials distribution system'
    },
    {
      icon: 'clipboard-check',
      title: 'Attendance Management',
      description: 'Digital attendance system with comprehensive reporting'
    },
    {
      icon: 'star',
      title: 'Evaluation System',
      description: 'Structured feedback with analytical insights and reporting'
    }
  ];

  const projectOverview = [
    {
      title: "Comprehensive Digital Transformation",
      description: "FacultyConnect represents a complete digital transformation of academic operations and student-faculty communication at RKVALLEY University."
    },
    {
      title: "Modern Technology Infrastructure",
      description: "Built on cutting-edge technologies including React Native, Node.js, and MongoDB. The system incorporates real-time communication, robust data analytics, and mobile-responsive design."
    },
    {
      title: "Institutional Excellence Platform",
      description: "Designed specifically for higher education institutions, FacultyConnect provides tools for curriculum management, student assessment, faculty coordination, and administrative oversight."
    }
  ];

  const accessSteps = [
    {
      step: 1,
      title: "Administrator Access",
      description: "Institutional administrators can manage user accounts, configure system settings, generate comprehensive reports, and monitor platform performance.",
      icon: 'cog',
      action: "System Configuration & Analytics"
    },
    {
      step: 2,
      title: "Faculty Portal",
      description: "Faculty members access specialized tools for course management, assignment creation, grade submission, attendance tracking, and student performance analysis.",
      icon: 'chalkboard-teacher',
      action: "Course Management & Evaluation"
    },
    {
      step: 3,
      title: "Student Dashboard",
      description: "Students engage with learning materials, submit assignments, track academic progress, receive feedback, and communicate with instructors.",
      icon: 'user-graduate',
      action: "Learning & Academic Engagement"
    }
  ];

  const techStack = [
    {
      icon: 'react',
      title: "React Native",
      description: "Cross-platform mobile framework for iOS and Android"
    },
    {
      icon: 'node-js',
      title: "Node.js Backend",
      description: "Scalable server environment with REST API"
    },
    {
      icon: 'database',
      title: "MongoDB Database",
      description: "Flexible NoSQL database for academic data"
    },
    {
      icon: 'shield-alt',
      title: "JWT Security",
      description: "Secure authentication with role-based access"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1a237e" barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Navigation */}
        <View style={styles.navbar}>
          <View style={styles.navContainer}>
            <View style={styles.navBrand}>
              <FontAwesome5 name="graduation-cap" size={24} color="#fff" />
              <Text style={styles.navBrandText}>FacultyConnect</Text>
            </View>
            <View style={styles.navLinks}>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Access Portal</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Digital Academic Platform</Text>
          </View>
          
          <Text style={styles.heroTitle}>
            Academic Excellence Through{'\n'}
            <Text style={styles.gradientText}> Digital Innovation</Text>
          </Text>
          
          <Text style={styles.heroDescription}>
            A comprehensive digital platform designed to enhance academic operations, 
            facilitate student-faculty collaboration, and provide robust institutional 
            management capabilities through modern technology solutions.
          </Text>
          
          <View style={styles.heroButtons}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Ionicons name="log-in" size={20} color="#fff" />
                <Text style={styles.buttonText}>Access Platform</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <FontAwesome5 name="book" size={18} color="#1a237e" />
                <Text style={styles.secondaryButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {/* Platform Overview Card */}
          <View style={styles.platformOverviewCard}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="university" size={20} color="#1a237e" />
              <Text style={styles.cardHeaderText}>Platform Overview</Text>
            </View>
            
            <View style={styles.overviewContent}>
              <View style={styles.platformHighlight}>
                <FontAwesome5 name="sync-alt" size={20} color="#1a237e" />
                <View style={styles.highlightText}>
                  <Text style={styles.highlightTitle}>Unified Academic Ecosystem</Text>
                  <Text style={styles.highlightDescription}>Integrates administration, teaching, and learning processes</Text>
                </View>
              </View>
              
              <View style={styles.platformHighlight}>
                <FontAwesome5 name="shield-alt" size={20} color="#1a237e" />
                <View style={styles.highlightText}>
                  <Text style={styles.highlightTitle}>Enterprise Security</Text>
                  <Text style={styles.highlightDescription}>Role-based access control with data protection</Text>
                </View>
              </View>
              
              <View style={styles.platformHighlight}>
                <FontAwesome5 name="mobile-alt" size={20} color="#1a237e" />
                <View style={styles.highlightText}>
                  <Text style={styles.highlightTitle}>Multi-Platform Access</Text>
                  <Text style={styles.highlightDescription}>Responsive design for all devices and screen sizes</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Platform Overview */}
        <View style={[styles.section, styles.overviewSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Comprehensive Academic Management Platform</Text>
            <Text style={styles.sectionSubtitle}>Transforming educational delivery through integrated digital solutions</Text>
          </View>
          
          <View style={styles.overviewGrid}>
            {projectOverview.map((item, index) => (
              <View key={index} style={styles.overviewCard}>
                <View style={styles.cardNumber}>
                  <Text style={styles.cardNumberText}>0{index + 1}</Text>
                </View>
                <Text style={styles.overviewCardTitle}>{item.title}</Text>
                <Text style={styles.overviewCardDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Platform Features */}
        <View style={[styles.section, styles.featuresSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Platform Capabilities</Text>
            <Text style={styles.sectionSubtitle}>Comprehensive academic management tools for modern education</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {platformFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <FontAwesome5 name={feature.icon as any} size={24} color="#1a237e" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Step-by-Step Access */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Role-Based Platform Access</Text>
            <Text style={styles.sectionSubtitle}>Structured access pathways for different academic stakeholders</Text>
          </View>
          
          {/* Access Steps */}
          <View style={styles.accessSteps}>
            {accessSteps.map((step, index) => (
              <View key={index} style={styles.accessStep}>
                <View style={styles.stepIndicator}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{step.step}</Text>
                  </View>
                  {index < accessSteps.length - 1 && <View style={styles.stepConnector} />}
                </View>
                
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <FontAwesome5 name={step.icon as any} size={20} color="#1a237e" />
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <TouchableOpacity 
                      style={styles.stepToggle}
                      onPress={() => setCurrentStep(currentStep === index ? null : index)}
                    >
                      <Text style={styles.stepToggleText}>
                        {currentStep === index ? 'Hide Details' : 'View Details'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  {currentStep === index && (
                    <View style={styles.stepDetails}>
                      <Text style={styles.stepDescription}>{step.description}</Text>
                      <View style={styles.stepAction}>
                        <Ionicons name="arrow-forward" size={16} color="#1a237e" />
                        <Text style={styles.stepActionText}>{step.action}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Role Features Display */}
          <View style={styles.rolesDisplay}>
            <View style={styles.rolesHeader}>
              <Text style={styles.rolesTitle}>Platform Features by Role</Text>
              <Text style={styles.rolesSubtitle}>Select a role to explore specific capabilities</Text>
            </View>
            
            <View style={styles.roleSelector}>
              {roles.map((role, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.roleOption,
                    activeRole === index && { 
                      borderColor: role.color, 
                      backgroundColor: `${role.color}10` 
                    }
                  ]}
                  onPress={() => setActiveRole(index)}
                >
                  <FontAwesome5 
                    name={role.icon as any} 
                    size={20} 
                    color={activeRole === index ? role.color : '#666'} 
                  />
                  <Text style={[
                    styles.roleOptionText,
                    activeRole === index && { color: role.color, fontWeight: '600' }
                  ]}>
                    {role.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.roleDisplay}>
              <View style={styles.roleInfo}>
                <View style={styles.roleHeader}>
                  <FontAwesome5 
                    name={roles[activeRole].icon as any} 
                    size={28} 
                    color={roles[activeRole].color} 
                  />
                  <Text style={styles.roleTitle}>{roles[activeRole].title}</Text>
                </View>
                <Text style={styles.roleDescription}>{roles[activeRole].description}</Text>
                
                <View style={styles.featuresList}>
                  {roles[activeRole].features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <FontAwesome5 name="check" size={16} color={roles[activeRole].color} />
                      <Text style={styles.featureItemText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Technology Stack */}
        <View style={[styles.section, styles.techSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Technology Infrastructure</Text>
            <Text style={styles.sectionSubtitle}>Built on robust, scalable enterprise technologies</Text>
          </View>
          
          <View style={styles.techGrid}>
            {techStack.map((tech, index) => (
              <View key={index} style={styles.techCard}>
                <View style={styles.techIcon}>
                  <FontAwesome5 name={tech.icon as any} size={30} color="#1a237e" />
                </View>
                <Text style={styles.techTitle}>{tech.title}</Text>
                <Text style={styles.techDescription}>{tech.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Begin Your Digital Academic Journey</Text>
          <Text style={styles.ctaSubtitle}>Join our community of students and faculty advancing education through technology</Text>
          
          <View style={styles.ctaButtons}>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity style={styles.ctaPrimaryButton}>
                <Ionicons name="log-in" size={22} color="#fff" />
                <Text style={styles.ctaButtonText}>Access Academic Portal</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity style={styles.ctaSecondaryButton}>
                <Ionicons name="person-add" size={22} color="#1a237e" />
                <Text style={styles.ctaSecondaryButtonText}>Request Institutional Access</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerSection}>
              <View style={styles.footerBrand}>
                <FontAwesome5 name="graduation-cap" size={24} color="#fff" />
                <Text style={styles.footerBrandText}>FacultyConnect</Text>
              </View>
              <Text style={styles.footerText}>Enterprise Learning Management System</Text>
              <Text style={styles.footerText}>RKVALLEY University</Text>
              
              <View style={styles.accreditation}>
                <View style={styles.accreditationBadge}>
                  <FontAwesome5 name="award" size={16} color="#FFD700" />
                  <Text style={styles.accreditationText}>Accredited Institution</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Academic Resources</Text>
              <Text style={styles.footerLink}>Platform Overview</Text>
              <Text style={styles.footerLink}>System Capabilities</Text>
              <Text style={styles.footerLink}>User Access Guide</Text>
              <Text style={styles.footerLink}>Technical Specifications</Text>
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Institutional Contact</Text>
              
              <View style={styles.contactItem}>
                <Ionicons name="location" size={16} color="#ccc" />
                <Text style={styles.contactText}>RK Valley Campus, Vempalli</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Ionicons name="call" size={16} color="#ccc" />
                <Text style={styles.contactText}>Academic Support Desk</Text>
              </View>
              
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={16} color="#ccc" />
                <Text style={styles.contactText}>lms-support@rguktrkv.ac.in</Text>
              </View>
            </View>
            
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>University Information</Text>
              <Text style={styles.footerText}>RKVALLEY University</Text>
              <Text style={styles.footerTextSmall}>Shaping Future Leaders Through Excellence in Education</Text>
              
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialLink}>
                  <FontAwesome5 name="linkedin" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLink}>
                  <FontAwesome5 name="twitter" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLink}>
                  <FontAwesome5 name="facebook" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.footerBottom}>
            <Text style={styles.footerBottomText}>
              © 2026 FacultyConnect Student & Faculty Communication Portal. All rights reserved. | RKVALLEY University
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    backgroundColor: '#1a237e',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navBrandText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#3949ab',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#f5f7ff',
  },
  heroBadge: {
    backgroundColor: '#1a237e',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 15,
  },
  gradientText: {
    color: '#3949ab',
  },
  heroDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#1a237e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e8eaf6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#1a237e',
    fontSize: 16,
    fontWeight: '600',
  },
  platformOverviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  overviewContent: {
    gap: 15,
  },
  platformHighlight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
    marginBottom: 2,
  },
  highlightDescription: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  overviewSection: {
    backgroundColor: '#f9f9f9',
  },
  featuresSection: {
    backgroundColor: '#f5f7ff',
  },
  techSection: {
    backgroundColor: '#f9f9f9',
  },
  sectionHeader: {
    marginBottom: 25,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  overviewGrid: {
    gap: 20,
  },
  overviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overviewCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 10,
  },
  overviewCardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  accessSteps: {
    marginBottom: 30,
  },
  accessStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepConnector: {
    width: 2,
    flex: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
  stepContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  stepToggle: {
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  stepToggleText: {
    fontSize: 12,
    color: '#1a237e',
    fontWeight: '500',
  },
  stepDetails: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  stepDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  stepAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepActionText: {
    fontSize: 14,
    color: '#1a237e',
    fontWeight: '500',
  },
  rolesDisplay: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  rolesHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rolesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 5,
  },
  rolesSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  roleSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  roleOptionText: {
    fontSize: 14,
    color: '#666',
  },
  roleDisplay: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  roleInfo: {
    gap: 10,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  roleDescription: {
    fontSize: 14,
    color: '#555',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureItemText: {
    fontSize: 14,
    color: '#333',
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  techCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  techIcon: {
    marginBottom: 15,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 5,
    textAlign: 'center',
  },
  techDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaSection: {
    backgroundColor: '#1a237e',
    padding: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  ctaPrimaryButton: {
    backgroundColor: '#3949ab',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ctaSecondaryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
  },
  ctaSecondaryButtonText: {
    color: '#1a237e',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#1a237e',
    padding: 20,
  },
  footerContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 20,
  },
  footerSection: {
    width: '48%',
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  footerBrandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  footerTextSmall: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 10,
  },
  accreditation: {
    marginTop: 10,
  },
  accreditationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  accreditationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  footerSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#ccc',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  socialLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  footerBottomText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});