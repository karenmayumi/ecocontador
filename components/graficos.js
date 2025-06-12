import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function GraficoRelatoriosScreen() {
  const [materiais, setMateriais] = useState([]);
  const [evolucaoSemanal, setEvolucaoSemanal] = useState({
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
    datasets: [{ data: [0, 0, 0, 0] }],
  });

  const [totalReciclado, setTotalReciclado] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const dados = await AsyncStorage.getItem('registros');
      const registros = dados ? JSON.parse(dados) : [];

      const tipos = {};
      let total = 0;
      const semanas = [0, 0, 0, 0];

      registros.forEach((r) => {
        const quantidade = Number(r.quantidade);
        total += quantidade;

        if (!tipos[r.tipo]) tipos[r.tipo] = 0;
        tipos[r.tipo] += quantidade;

        const dia = new Date(r.data).getDate();
        const indiceSemana = Math.floor((dia - 1) / 7);
        semanas[indiceSemana] += quantidade;
      });

      const dadosPie = Object.keys(tipos).map((tipo, i) => ({
        name: tipo,
        amount: tipos[tipo],
        color: cores[i % cores.length],
        legendFontColor: '#333',
        legendFontSize: 14,
      }));

      setMateriais(dadosPie);
      setTotalReciclado(total);

      setEvolucaoSemanal({
        labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
        datasets: [{ data: semanas }],
      });
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  }

  const comparativoCidade = 30;
  const impactoPositivo = totalReciclado * 2;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráficos e Relatórios</Text>

      {/* PieChart */}
      <Text style={styles.subtitle}>Materiais mais reciclados</Text>
      {materiais.length > 0 ? (
        <PieChart
          data={materiais}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.text}>Nenhum dado registrado.</Text>
      )}

      {/* Porcentagem */}
      <Text style={styles.subtitle}>Porcentagem de recicláveis</Text>
      <View style={styles.percentContainer}>
        <Text style={styles.percentText}>
          {totalReciclado > 0 ? '100%' : '0%'}
        </Text>
      </View>

      {/* Evolução Semanal */}
      <Text style={styles.subtitle}>Evolução semanal</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={evolucaoSemanal}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
        />
      </View>

      {/* Comparativo */}
      <Text style={styles.subtitle}>Comparativo com a média da cidade</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Você reciclou <Text style={styles.bold}>{totalReciclado} kg</Text> este mês.
        </Text>
        <Text style={styles.text}>
          Média da cidade: <Text style={styles.bold}>{comparativoCidade} kg</Text>
        </Text>
      </View>

      {/* Impacto */}
      <Text style={styles.subtitle}>Impacto positivo estimado</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Você evitou que <Text style={styles.bold}>{impactoPositivo} kg</Text> de lixo chegassem ao meio ambiente.
        </Text>
      </View>
    </ScrollView>
  );
}

const cores = ['#f39c12', '#2980b9', '#27ae60', '#8e44ad', '#e74c3c'];

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
  labelColor: () => '#555',
  strokeWidth: 2,
  barPercentage: 0.6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 25,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  percentContainer: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  percentText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
});
