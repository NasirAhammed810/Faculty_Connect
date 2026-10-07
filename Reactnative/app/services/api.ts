import axios from 'axios'
import { Platform } from 'react-native'

export interface User {
  id?: string
  name: string
  username: string
  email: string
  role: 'admin' | 'faculty' | 'student'
  className?: string
  profilePic?: string
}

/**
 * 🌐 API BASE URL HANDLING
 * Expo Go (Android physical device) → use your PC IP
 * Android Emulator → 10.0.2.2
 * Web / iOS → localhost
 */
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // 👉 CHANGE THIS to your laptop IP when using Expo Go
   return 'http://10.236.99.1:5000/api'

    // Emulator alternative:
    // return 'http://10.0.2.2:5000/api'
  }

  return 'http://localhost:5000/api'
}

const API_BASE_URL = getBaseUrl()

// 🔐 Axios default config
axios.defaults.baseURL = API_BASE_URL

const ApiService = {
  // ===============================
  // ✅ LOGIN (PUBLIC)
  // ===============================
  async login(username: string, password: string) {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  // ===============================
  // ✅ REGISTER (SEND OTP)
  // ===============================
  async register(formData: FormData) {
    try {
      const response = await axios.post('/auth/register', formData)

      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  // ===============================
  // ✅ VERIFY OTP
  // ===============================
  async verifyOtp(email: string, otp: string) {
    try {
      const response = await axios.post('/auth/verify-otp', {
        email,
        otp,
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed')
    }
  },

  // ===============================
  // ✅ RESEND OTP
  // ===============================
  async resendOtp(email: string) {
    try {
      const response = await axios.post('/auth/resend-otp', { email })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP')
    }
  },

  // ===============================
  // ✅ LOGOUT (CLIENT SIDE)
  // ===============================
  async logout() {
    delete axios.defaults.headers.common.Authorization
  },

  // ===============================
  // ✅ SET JWT TOKEN
  // ===============================
  setToken(token: string) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  },
}

export default ApiService
