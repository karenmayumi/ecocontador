import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const tiposDisponiveis = ['Metal', 'Plástico', 'Vidro', 'Papel', 'Orgânico'];

export default function RegistroConsumo({ navigation, adicionarRegistro }) {
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [item, setItem] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [showTipoLista, setShowTipoLista] = useState(false);

  const salvarConsumo = () => {
    if (!item || !tipo || !quantidade) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    const novoRegistro = {
      id: Date.now().toString(),
      item,
      marca,
      tipo,
      quantidade,
      data: data.toLocaleDateString(),
    };

    adicionarRegistro(novoRegistro);
    Alert.alert('Sucesso', 'Consumo salvo com sucesso!');

    setItem('');
    setMarca('');
    setTipo('');
    setQuantidade('');

    navigation.navigate('HistoricoConsumo');
  };

  const selecionarTipo = (tipoSelecionado) => {
    setTipo(tipoSelecionado);
    setShowTipoLista(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Consumo</Text>

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Item consumido *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Lata de Coca-Cola"
        value={item}
        onChangeText={setItem}
      />

      <Text style={styles.label}>Marca / Nome (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Coca-Cola"
        value={marca}
        onChangeText={setMarca}
      />

      <Text style={styles.label}>Tipo de material *</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTipoLista(!showTipoLista)}
      >
        <Text style={{ color: tipo ? '#000' : '#999' }}>
          {tipo || 'Selecione o tipo de material'}
        </Text>
      </TouchableOpacity>

      {showTipoLista && (
        <View style={styles.listaTipoContainer}>
          <FlatList
            data={tiposDisponiveis}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tipoItem}
                onPress={() => selecionarTipo(item)}
              >
                <Text style={styles.tipoItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Text style={styles.label}>Quantidade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 1"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvarConsumo}>
        <Text style={styles.saveButtonText}>Salvar consumo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2E7D32',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#fff',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  listaTipoContainer: {
    backgroundColor: '#fff',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 4,
  },
  tipoItem: {
    padding: 12,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  tipoItemText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: '#34A853',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
