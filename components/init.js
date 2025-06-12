import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {
  const navigation = useNavigation(); // <- Adicionado aqui

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
           source={require('../assets/logo.png')} // Descomente e ajuste o caminho se necessário
          style={styles.icon}
        />
        <Text style={styles.title}>ECOCONTADOR</Text>
        <Text style={styles.subtitle}>Seu consumo, sua consciência</Text>
        <Text style={styles.description}>
          O EcoContador ajuda você a acompanhar o quanto do seu consumo pode ser reciclado em casa.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
  },
  icon: {
    width: 150, // Aumentado de 100 para 150
    height: 150, // Aumentado de 100 para 150
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E4D2E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4C6F26',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

