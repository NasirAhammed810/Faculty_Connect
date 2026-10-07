import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  // ❗ FUNCTION LOGIC UNCHANGED
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter all fields')
      return
    }

    try {
      const response = await login(username, password)

      const role = response.user.role.toLowerCase()

      if (role === 'faculty') {
        router.replace('/(tabs)/faculty/dashboard')
      } else if (role === 'admin') {
        router.replace('/(tabs)/admin/dashboard')
      } else {
        router.replace('/(tabs)/student/dashboard')
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error?.message || 'Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🎓</Text>
        <Text style={styles.title}>RKVALLEY University</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.link} onPress={() => router.push('/register')}>
            Create Account
          </Text>
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.secureText}>🔒 Secured Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f8fafc',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 14,
    color: '#475569',
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  secureText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#64748b',
    fontSize: 12,
  },
})
