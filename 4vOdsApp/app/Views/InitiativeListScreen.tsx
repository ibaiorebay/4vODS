import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { useInitiatives } from '../Hooks/UseInitiatives';
import InitiativeCard from '../Components/InitiativeItem';
import { Iniciativa } from '../Models/Iniciativa';
import { useNavigation } from 'expo-router';
import { useMetas } from '../Hooks/UseMetas';

interface InitiativeListScreenProps { }

const InitiativeListScreen: React.FC<InitiativeListScreenProps> = () => {
  const { initiatives, error } = useInitiatives();
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitiatives, setIsInitiatives] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Lista de Iniciativas',
    });
  }, []);

  const filteredInitiatives = initiatives.filter((iniciativa) =>
    iniciativa.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Button title="Iniciativas" onPress={() => setIsInitiatives(true)}/>
            </View>
            <View style={styles.buttons}>
              <Button title="Indicadores" onPress={() => setIsInitiatives(false)}/>
            </View>
          </View>
      {isInitiatives ? (
        <ScrollView>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar iniciativa"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {filteredInitiatives.map((iniciativa: Iniciativa) => (
            <InitiativeCard key={iniciativa.iD_INICIATIVA} iniciativa={iniciativa} />
          ))}
        </ScrollView>
      ):
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>No hay indicadores disponibles</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 16,
    margin: 16,
  },
  buttons: {
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default InitiativeListScreen;


