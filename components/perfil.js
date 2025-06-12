import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function PerfilScreen() {
  // Dados fixos para exemplo
  const [nome, setNome] = useState('Luísa Silva');
  const [cidade, setCidade] = useState('São Paulo');
  const [preferencias, setPreferencias] = useState('Reciclagem, Redução de plástico');

  // Estatísticas simples de exemplo
  const [estatisticas, setEstatisticas] = useState({
    totalRecicladoKg: 12.4,
    metasReduzidas: 3,
  });

  // Simula reset de metas
  const redefinirMetas = () => {
    Alert.alert(
      'Redefinir Metas',
      'Tem certeza que deseja redefinir suas metas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            Alert.alert('Metas redefinidas com sucesso!');
            // Aqui você pode resetar o estado das metas
          },
        },
      ]
    );
  };

  // Simula exportar relatório
  const exportarRelatorio = () => {
    Alert.alert(
      'Exportar Relatório',
      'Função de exportação não implementada neste exemplo.'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{nome}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.value}>{cidade}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Preferências:</Text>
        <Text style={styles.value}>{preferencias}</Text>
      </View>

      <Text style={styles.title}>Estatísticas Pessoais</Text>

      <View style={styles.section}>
        <Text style={styles.statLabel}>Total reciclado:</Text>
        <Text style={styles.statValue}>{estatisticas.totalRecicladoKg} kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.statLabel}>Metas reduzidas:</Text>
        <Text style={styles.statValue}>{estatisticas.metasReduzidas}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={redefinirMetas}>
        <Text style={styles.buttonText}>Redefinir Metas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.exportButton]} onPress={exportarRelatorio}>
        <Text style={styles.buttonText}>Exportar Relatório</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#eaf4f4',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#2c3e50',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 16,
    color: '#16a085',
    fontWeight: '700',
  },
  statValue: {
    fontSize: 18,
    color: '#1abc9c',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
