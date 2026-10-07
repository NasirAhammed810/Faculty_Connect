import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import ApiService from '../services/api';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Student' as 'Student' | 'Faculty' | 'Admin',
    className: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { register } = useAuth();

  // OTP Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRoleChange = (role: 'Student' | 'Faculty' | 'Admin') => {
    setForm({ 
      ...form, 
      role,
      className: role === 'Student' ? form.className : '' // Clear className for non-students
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({

   mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.8,
});


    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    if (!form.name || !form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (form.role === 'Student' && !form.className) {
      Alert.alert('Error', 'Please select your class');
      return;
    }

    setIsLoading(true);
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('role', form.role)


      
      if (form.role === 'Student') {
        formData.append('className', form.className);
      }
      
      if (profileImage) {
        const filename = profileImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : 'image';
        
        formData.append('profilePic', {
          uri: profileImage,
          name: filename || 'profile.jpg',
          type,
        } as any);
      }

      // Call register API
      const userData = await ApiService.register(formData);
      
      // Show OTP modal
      setRegisteredEmail(form.email);
      setShowOtpModal(true);
      setOtpTimer(300); // 5 minutes
      
      Alert.alert('Success', 'Registration successful! Please verify your email with the OTP sent to your inbox.');
      
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await ApiService.verifyOtp(registeredEmail, otp);
      
      // Auto-login after successful verification
      const loginRes = await ApiService.login(
  form.username,
  form.password
)

      
      Alert.alert('Success', 'Email verified successfully! Redirecting to dashboard...');
      setShowOtpModal(false);
      
    } catch (error: any) {
      Alert.alert('Verification Failed', error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await ApiService.resendOtp(registeredEmail);
      setOtpTimer(300); // Reset timer to 5 minutes
      setOtp('');
      Alert.alert('Success', 'New OTP sent to your email.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP.');
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp('');
    setOtpTimer(0);
  };

  const studentClasses = [
    'E1 CSE-A', 'E1 CSE-B', 'E1 CSE-C', 'E1 CSE-D', 'E1 CSE-E',
    'E2 CSE-A', 'E2 CSE-B', 'E2 CSE-C', 'E2 CSE-D', 'E2 CSE-E',
    'E3 CSE-A', 'E3 CSE-B', 'E3 CSE-C', 'E3 CSE-D', 'E3 CSE-E',
    'E4 CSE-A', 'E4 CSE-B', 'E4 CSE-C', 'E4 CSE-D', 'E4 CSE-E',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#1a237e" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Ionicons name="person-add" size={40} color="#fff" />
            </View>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>Join our educational platform and start your learning journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            
            {/* Name Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="person" size={16} color="#1a237e" /> Full Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                editable={!isLoading}
              />
            </View>

            {/* Username Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="at" size={16} color="#1a237e" /> Username
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Choose a unique username"
                value={form.username}
                onChangeText={(text) => setForm({ ...form, username: text })}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Text style={styles.helperText}>This will be your unique identifier on the platform</Text>
            </View>

            {/* Email Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="mail" size={16} color="#1a237e" /> Email Address
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Text style={styles.helperText}>We'll send a verification code to this email</Text>
            </View>

            {/* Password Field */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="lock-closed" size={16} color="#1a237e" /> Password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Role Selection */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="people" size={16} color="#1a237e" /> I am a
              </Text>
              <View style={styles.roleSelector}>
                {(['Student', 'Faculty', 'Admin'] as const).map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleButton,
                      form.role === role && styles.roleButtonActive
                    ]}
                    onPress={() => handleRoleChange(role)}
                    disabled={isLoading}
                  >
                    <Text style={[
                      styles.roleButtonText,
                      form.role === role && styles.roleButtonTextActive
                    ]}>
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Class Selection (only for Students) */}
            {form.role === 'Student' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  <Ionicons name="school" size={16} color="#1a237e" /> Class
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.classSelector}>
                    {studentClasses.map((className) => (
                      <TouchableOpacity
                        key={className}
                        style={[
                          styles.classButton,
                          form.className === className && styles.classButtonActive
                        ]}
                        onPress={() => setForm({ ...form, className })}
                        disabled={isLoading}
                      >
                        <Text style={[
                          styles.classButtonText,
                          form.className === className && styles.classButtonTextActive
                        ]}>
                          {className}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            {/* Role Description Alerts */}
            {form.role === 'Faculty' && (
              <View style={[styles.alert, styles.facultyAlert]}>
                <Ionicons name="person-check" size={20} color="#1e40af" />
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Faculty Account</Text>
                  <Text style={styles.alertText}>
                    As faculty, you'll be able to create and manage course content, assignments, and interact with students.
                  </Text>
                </View>
              </View>
            )}

            {form.role === 'Admin' && (
              <View style={[styles.alert, styles.adminAlert]}>
                <Ionicons name="shield-checkmark" size={20} color="#92400e" />
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Administrator Account</Text>
                  <Text style={styles.alertText}>
                    As an administrator, you'll have full access to manage users, content, and system settings.
                  </Text>
                </View>
              </View>
            )}

            {/* Profile Picture Upload */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                <Ionicons name="camera" size={16} color="#1a237e" /> Profile Picture
              </Text>
              <TouchableOpacity
                style={styles.uploadCard}
                onPress={pickImage}
                disabled={isLoading}
              >
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <Ionicons name="cloud-upload" size={40} color="#94a3b8" />
                )}
                <Text style={styles.uploadText}>
                  {profileImage ? 'Change Profile Picture' : 'Choose Profile Picture'}
                </Text>
                <Text style={styles.uploadHelper}>
                  Optional: JPG, PNG, or GIF (Max: 5MB)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading || !form.name || !form.username || !form.email || !form.password || (form.role === 'Student' && !form.className)}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="person-add" size={20} color="#fff" />
                  <Text style={styles.submitButtonText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.loginLink}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#1a237e" />
              <Text style={styles.modalTitle}>Verify Your Email</Text>
              <TouchableOpacity onPress={closeOtpModal} disabled={isVerifying}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Ionicons name="mail-check" size={48} color="#1a237e" style={styles.modalIcon} />
              <Text style={styles.modalSubtitle}>Almost there, {form.name}!</Text>
              <Text style={styles.modalText}>
                We've sent a 6-digit verification code to:
              </Text>
              <Text style={styles.modalEmail}>{registeredEmail}</Text>

              {/* OTP Timer */}
              {otpTimer > 0 && (
                <View style={[styles.alert, styles.timerAlert]}>
                  <Ionicons name="time" size={16} color="#f59e0b" />
                  <Text style={styles.timerText}>
                    Code expires in: <Text style={styles.timerValue}>{formatTime(otpTimer)}</Text>
                  </Text>
                </View>
              )}

              {otpTimer === 0 && (
                <View style={[styles.alert, styles.expiredAlert]}>
                  <Ionicons name="warning" size={16} color="#ef4444" />
                  <Text style={styles.expiredText}>Code has expired. Please request a new one.</Text>
                </View>
              )}

              {/* OTP Input */}
              <Text style={styles.otpLabel}>Enter Verification Code</Text>
              <TextInput
                style={styles.otpInput}
                placeholder="000000"
                value={otp}
                onChangeText={(text) => setOtp(text.replace(/\D/g, '').slice(0, 6))}
                keyboardType="number-pad"
                maxLength={6}
                editable={otpTimer > 0 && !isVerifying}
              />
              <Text style={styles.otpHelper}>Enter the 6-digit code from your email</Text>

              {/* Verify Button */}
              <TouchableOpacity
                style={[styles.verifyButton, (isVerifying || otp.length !== 6 || otpTimer === 0) && styles.verifyButtonDisabled]}
                onPress={handleOtpVerification}
                disabled={isVerifying || otp.length !== 6 || otpTimer === 0}
              >
                {isVerifying ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Resend Button */}
              <TouchableOpacity
                style={[styles.resendButton, (isVerifying || otpTimer > 240) && styles.resendButtonDisabled]}
                onPress={handleResendOtp}
                disabled={isVerifying || otpTimer > 240}
              >
                <Ionicons name="refresh" size={16} color="#64748b" />
                <Text style={styles.resendButtonText}>
                  {otpTimer > 240 ? `Resend in ${formatTime(otpTimer - 240)}` : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalFooter}>
              <Ionicons name="information-circle" size={14} color="#64748b" />
              <Text style={styles.modalFooterText}>
                Didn't receive the code? Check your spam folder or try resending.
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  backButton: {
    padding: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a237e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#1e293b',
  },
  helperText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  classSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  classButtonActive: {
    backgroundColor: '#1a237e',
    borderColor: '#1a237e',
  },
  classButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  classButtonTextActive: {
    color: '#fff',
  },
  alert: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 20,
  },
  facultyAlert: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#1d4ed8',
  },
  adminAlert: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 13,
    color: '#475569',
  },
  uploadCard: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    marginBottom: 4,
  },
  uploadHelper: {
    fontSize: 14,
    color: '#64748b',
  },
  submitButton: {
    backgroundColor: '#1a237e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 15,
    color: '#64748b',
  },
  loginLink: {
    fontSize: 15,
    color: '#1a237e',
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    marginLeft: 12,
  },
  modalBody: {
    padding: 20,
  },
  modalIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  timerAlert: {
    backgroundColor: '#fffbeb',
    marginBottom: 20,
    padding: 12,
  },
  timerText: {
    fontSize: 14,
    color: '#92400e',
    flex: 1,
  },
  timerValue: {
    fontWeight: 'bold',
  },
  expiredAlert: {
    backgroundColor: '#fef2f2',
    marginBottom: 20,
    padding: 12,
  },
  expiredText: {
    fontSize: 14,
    color: '#dc2626',
    flex: 1,
  },
  otpLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  otpInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 10,
    marginBottom: 8,
  },
  otpHelper: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 10,
  },
  verifyButtonDisabled: {
    opacity: 0.6,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    gap: 8,
  },
  resendButtonDisabled: {
    opacity: 0.6,
  },
  resendButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    gap: 8,
  },
  modalFooterText: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
  },
});