import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente ChallengeCard
const ChallengeCard = ({ imageSource, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.challengeCard}>
    {imageSource && <Image source={imageSource} style={styles.challengeImage} />}
    <Text style={styles.challengeText}>{text}</Text>
  </TouchableOpacity>
);

const DesafiosScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>

        {/* Dicas e Metas */}
        <View style={styles.tipsGoalsContainer}>
          <Text style={styles.tipsGoalsTitle}>🌱 Dicas e Metas</Text>
          <Text style={styles.tipsGoalsText}>
            Aqui vão algumas ideias para te inspirar na sua jornada sustentável!
          </Text>

          {/* Exemplo de dicas */}
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>• Leve sua própria sacola reutilizável</Text>
            <Text style={styles.tipText}>• Planeje refeições para evitar desperdício</Text>
            <Text style={styles.tipText}>• Doe roupas que você não usa mais</Text>
          </View>
        </View>

        {/* Desafios Section */}
        <ChallengeCard 
          text="Desafio: Semana Sem Plástico"
          onPress={() => navigation.navigate('Desafios1')} 
        />
        <ChallengeCard 
          text="Desafio: Consumo Consciente "
          onPress={() => navigation.navigate('Desafios2')} 
        />
        <ChallengeCard 
          text="Desafio: Moda Sustentável"
          onPress={() => navigation.navigate('Desafios3')} 
        />
        <ChallengeCard 
          text="Desafio: Sustentabilidade"
          onPress={() => navigation.navigate('Desafios4')} 
        />

        {/* Botão no rodapé */}
        <TouchableOpacity 
          style={styles.bottomButton}
          onPress={() => navigation.navigate('criardesafio')}
        >
          <Text style={styles.bottomButtonText}>Criar seu próprio desafio</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  tipsGoalsContainer: {
    width: '90%',
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  tipsGoalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 8,
  },
  tipsGoalsText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  tipBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  challengeCard: {
    width: '90%',
    height: 100,
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  challengeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  challengeText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b4d9',
    padding: 15,
    width: '90%',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomButtonText: {
    color: '#FFF',
    fontSize: 18,
    marginRight: 10,
  },
});

export default DesafiosScreen;
