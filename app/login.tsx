import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const api = axios.create({
  baseURL: 'https://meescale.com',
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verificarToken = async () => {

      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          await api.post('/logout', null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        } finally {
          await AsyncStorage.multiRemove(['token', 'permissions']);
        }
      }
    };
    verificarToken();
  }, []);

  const handleLogin = async () => {

    setLoading(true);
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/login', {
        email: email.trim().toLowerCase(),
        password: password.trim()
      });


      if (response.data.success) {

        await AsyncStorage.multiSet([
          ['token', response.data.token],
          ['permissions', JSON.stringify(response.data.permissions)]
        ]);


        const decodedToken: any = jwtDecode(response.data.token);
        console.log('Token decodificado:', decodedToken);

        router.replace('/chats');
        // if (typeof document !== 'undefined')
        // document.title = 'Chats';
      }

    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        setError('Email ou senha incorretos');
      } else {
        setError('Erro ao realizar login. Tente novamente mais tarde.');
      }
    }

    setLoading(false);

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            editable={!loading}
            placeholderTextColor="#999"
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.forgotPassword,
              pressed && styles.forgotPasswordPressed
            ]}
            onPress={() => !loading && router.push('/')}// /forgot-password
          >
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  forgotPassword: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  forgotPasswordPressed: {
    opacity: 0.6,
  },
});

export default Login;