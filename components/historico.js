import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const getStartDate = (filtro) => {
  const hoje = new Date();
  switch (filtro) {
    case 'Dia':
      return new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    case 'Semana': {
      const novaData = new Date(hoje);
      novaData.setDate(novaData.getDate() - 7);
      return novaData;
    }
    case 'Mês': {
      const novaData = new Date(hoje);
      novaData.setMonth(novaData.getMonth() - 1);
      return novaData;
    }
    case 'Ano': {
      const novaData = new Date(hoje);
      novaData.setFullYear(novaData.getFullYear() - 1);
      return novaData;
    }
    default:
      return new Date(0); // tudo
  }
};

export default function HistoricoConsumo({ registros = [] }) {
  const [filtro, setFiltro] = useState('Mês');

  const dataInicio = getStartDate(filtro);
  const registrosFiltrados = [];

  for (let i = 0; i < registros.length; i++) {
    const r = registros[i];
    // converte "dd/mm/yyyy" para "yyyy-mm-dd" para Date funcionar
    const parts = r.data.split('/');
    const dataRegistro = new Date(parts[2], parts[1] - 1, parts[0]);
    if (dataRegistro >= dataInicio) {
      registrosFiltrados.push(r);
    }
  }

  const totalPorTipo = {};
  for (let i = 0; i < registrosFiltrados.length; i++) {
    const reg = registrosFiltrados[i];
    const tipo = reg.tipo;
    const qtd = parseInt(reg.quantidade, 10);
    if (!totalPorTipo[tipo]) {
      totalPorTipo[tipo] = 0;
    }
    totalPorTipo[tipo] += qtd;
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.item}</Text>
      <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
      <Text style={styles.cardText}>Data: {item.data}</Text>
      <Text style={styles.cardText}>Quantidade: {item.quantidade}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Histórico de Consumo</Text>

        <View style={styles.filtroContainer}>
          {['Dia', 'Semana', 'Mês', 'Ano'].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              onPress={() => setFiltro(opcao)}
              style={[
                styles.filtroBotao,
                filtro === opcao && styles.filtroBotaoAtivo,
              ]}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtro === opcao && styles.filtroTextoAtivo,
                ]}
              >
                {opcao}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitulo}>Total reciclado</Text>
          {Object.keys(totalPorTipo).length === 0 ? (
            <Text style={styles.vazioTexto}>Nenhum item nesse período.</Text>
          ) : (
            Object.entries(totalPorTipo).map(([tipo, total]) => (
              <Text key={tipo} style={styles.totalItem}>
                {tipo}: <Text style={styles.totalQuantidade}>{total}</Text> item(ns)
              </Text>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitulo}>Registros</Text>
          <FlatList
            data={registrosFiltrados}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 10,
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  filtroBotao: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#34A853',
    borderRadius: 20,
    alignItems: 'center',
  },
  filtroBotaoAtivo: {
    backgroundColor: '#34A853',
  },
  filtroTexto: {
    color: '#34A853',
    fontWeight: 'bold',
  },
  filtroTextoAtivo: {
    color: '#fff',
  },
  section: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#34A853',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  totalItem: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  totalQuantidade: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  vazioTexto: {
    fontStyle: 'italic',
    color: '#999',
    marginTop: 4,
  },
});
