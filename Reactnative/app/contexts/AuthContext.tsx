import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import ApiService, { User } from '../services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<any>
  register: (userData: any) => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    console.log('🔄 AuthContext Initializing...')

    try {
      const storedToken = await AsyncStorage.getItem('token')
      const storedUser = await AsyncStorage.getItem('user')

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser)

        console.log('✅ User restored from storage:', {
          name: parsedUser.name,
          role: parsedUser.role,
        })

        setUser(parsedUser)
        setToken(storedToken)
        ApiService.setToken(storedToken)
      }
    } catch (error) {
      console.error('❌ Auth restore failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    console.log('🔑 AuthContext login:', username)

    const response = await ApiService.login(username, password)

    setUser(response.user)
    setToken(response.token)
    ApiService.setToken(response.token)

    await AsyncStorage.setItem('token', response.token)
    await AsyncStorage.setItem('user', JSON.stringify(response.user))

    return response
  }

  const register = async (userData: any) => {
    return await ApiService.register(userData)
  }

  const logout = async () => {
    setUser(null)
    setToken(null)
    ApiService.setToken('')

    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
