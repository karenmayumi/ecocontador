import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Esquema de validação
const schema = Yup.object().shape({
  username: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .matches(/^\d{6}$/, 'Senha deve conter exatamente 6 dígitos numéricos')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirme sua senha'),
});

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ username: data.username, email: data.email, password: data.password })
      );
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar seus dados.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          //source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>ECOCONTADOR</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subtitle}>Crie sua conta para continuar</Text>

    
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#666"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha 6 digitos numéricos"
              placeholderTextColor="#666"
              secureTextEntry
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

     
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirme a Senha"
              placeholderTextColor="#666"
              secureTextEntry
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerLink}>Entre aqui!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 250,
    backgroundColor: '#D8E2DC',
    paddingVertical: 30,
    justifyContent: 'start',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 75,
    marginBottom: 10,
    height: 75,
    zIndex: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4C6F26',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#4C6F26',
    fontWeight: 'bold',
  },
});
