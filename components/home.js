import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [materiaisHoje, setMateriaisHoje] = useState(0);
  const [progressoSemana, setProgressoSemana] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const dados = await AsyncStorage.getItem('registros');
      const registros = dados ? JSON.parse(dados) : [];

      const hoje = new Date();
      let totalHoje = 0;
      const dias = [0, 0, 0, 0, 0, 0, 0]; // Domingo a Sábado

      registros.forEach((r) => {
        const data = new Date(r.data);
        const quantidade = Number(r.quantidade);

        // Verifica se é hoje
        if (
          data.getDate() === hoje.getDate() &&
          data.getMonth() === hoje.getMonth() &&
          data.getFullYear() === hoje.getFullYear()
        ) {
          totalHoje += quantidade;
        }

        // Contabiliza por dia da semana
        const diaSemana = data.getDay(); // 0 (Domingo) a 6 (Sábado)
        dias[diaSemana] += quantidade;
      });

      setMateriaisHoje(totalHoje);
      setProgressoSemana(dias);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/Wherenaturebecomeart.png')}
          style={styles.bannerImage}
        />
      </View>

      {/* Dashboard */}
      <View style={styles.dashboard}>
        <Text style={styles.dashboardTitle}>Resumo do Dia</Text>
        <Text style={styles.materialText}>
          {materiaisHoje} materiais registrados hoje
        </Text>

        {/* Gráfico de barras */}
        <View style={styles.chartContainer}>
          {progressoSemana.map((val, index) => (
            <View key={index} style={styles.chartBarWrapper}>
              <View style={[styles.chartBar, { height: val * 10 }]} />
              <Text style={styles.chartLabel}>
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
              </Text>
            </View>
          ))}
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>Registrar novo consumo</Text>
        </TouchableOpacity>
      </View>

      {/* Materiais Sustentáveis - Carrossel */}
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoryTitle}>Materiais Sustentáveis</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {[
          { title: 'Plástico Reciclado', color: '#D1FAE5' },
          { title: 'Vidro Reutilizável', color: '#DBEAFE' },
          { title: 'Bioplástico', color: '#FEF3C7' },
          { title: 'Papelão Reciclado', color: '#FCE7F3' },
          { title: 'Madeira Certificada', color: '#E0E7FF' },
          { title: 'Tecido Orgânico', color: '#FFF7ED' },
        ].map((item, index) => (
          <View
            key={index}
            style={[styles.carouselCard, { backgroundColor: item.color }]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>Saiba mais</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  banner: {
    backgroundColor: '#E0F2F1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  bannerImage: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    marginTop: 8,
  },
  dashboard: {
    backgroundColor: '#E0F2FE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  materialText: {
    fontSize: 14,
    color: '#1E3A8A',
    marginBottom: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    marginBottom: 16,
  },
  chartBarWrapper: {
    alignItems: 'center',
    width: 28,
  },
  chartBar: {
    width: 16,
    backgroundColor: '#38BDF8',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  carousel: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 8,
  },
  carouselCard: {
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
