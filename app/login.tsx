import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

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

// Configuração global do Axios
const api = axios.create({
  baseURL: 'https://meescale.com',
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Meescale-Mobile-App/1.0.0' // Adicione identificação do app
  }
});

// 1. Interface para resposta de erro padrão
interface ApiErrorResponse {
  error?: string;
  message?: string;
  statusCode?: number;
}

// 2. Tipo customizado para erros Axios
type CustomAxiosError = AxiosError<ApiErrorResponse>;


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
  
      if (!email.trim() || !password.trim()) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
  
      const response = await api.post('/login', {
        email: email.trim().toLowerCase(),
        password: password.trim()
      });
  
      if (response.data.success) {
        // 🟡🟡🟡 Aqui está a seção modificada 🟡🟡🟡
        try {
          // Validar token antes de armazenar
          if (!response.data.token || typeof response.data.token !== 'string') {
            throw new Error('Token inválido');
          }
  
          await AsyncStorage.multiSet([
            ['token', response.data.token],
            ['permissions', JSON.stringify(response.data.permissions)]
          ]);
  
          const decodedToken: any = jwtDecode(response.data.token);
          console.log('Token decodificado:', decodedToken);
  
          router.push('/chats');
        } catch (storageError) {
          console.log(storageError)
          // 🚨 Erro específico do armazenamento
          throw new Error('Falha ao salvar dados de autenticação');
        }
        // 🟡🟡🟡 Fim da seção modificada 🟡🟡🟡
      } else {
        setError('Falha no login');
      }
    } catch (err) {
      handleLoginError(err);
    } finally {
      setLoading(false);
    }
  };

  

  const handleLoginError = (error: unknown) => {
    let errorMessage = 'Erro desconhecido';
  
    if (isAxiosError(error)) {
      const axiosError = error as CustomAxiosError;
      const serverMessage = axiosError.response?.data?.error || 
                            axiosError.response?.data?.message;
  
      errorMessage = serverMessage || getStatusCodeMessage(axiosError);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    setError(translateErrorMessage(errorMessage));
  };
  
  // 4. Helper para mensagens baseadas em status
  const getStatusCodeMessage = (error: CustomAxiosError) => {
    const status = error.response?.status;
    const defaultMessages: Record<number, string> = {
      400: 'Requisição inválida',
      401: 'Não autorizado',
      403: 'Acesso negado',
      404: 'Recurso não encontrado',
      500: 'Erro interno',
    };
  
    return status 
      ? defaultMessages[status] || `Erro HTTP ${status}` 
      : 'Erro de conexão';
  };
  
  const translateErrorMessage = (message: string): string => {
    const translations: Record<string, string> = {
      'Invalid credentials': 'Credenciais inválidas',
      'Network Error': 'Sem conexão com o servidor',
      'Login failed: Invalid server response': 'Resposta inválida do servidor',
      'Invalid token structure': 'Problema na autenticação'
    };
    return translations[message] || message;
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

export default LoginScreen;