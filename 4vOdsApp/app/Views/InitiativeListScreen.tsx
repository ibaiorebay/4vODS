import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { useInitiatives } from '../Hooks/UseInitiatives';
import InitiativeCard from '../Components/InitiativeItem';
import { Iniciativa } from '../Models/Iniciativa';
import { useNavigation } from 'expo-router';
import { useMetas } from '../Hooks/UseMetas';
import IndicatorItem from '../Components/IndicatorItem';

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
          <Button title="Iniciativas" onPress={() => setIsInitiatives(true)} disabled = {isInitiatives}/>
        </View>
        <View style={styles.buttons}>
          <Button title="Indicadores" onPress={() => setIsInitiatives(false)} disabled = {!isInitiatives} />
        </View>
      </View>
      {isInitiatives ? (
        // Vista de lista de iniciativas
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
      ) :
        // Vista de lista de indicadores (hardcodeados porque a dos días de la presentación no se sabía a ciencia cierta
        // si la api podía recibir peticiones desde ip o solo desde localhost)
        // TODO barra de busqueda de indicadores funcional
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar indicador"
            onChangeText={(text) => setSearchTerm(text)}
            value={searchTerm}
          />
          <ScrollView>
            <IndicatorItem nombre="Iniciativas de curso" numero={1} />
            <IndicatorItem nombre="Número de iniciativas" numero={2} />
            <IndicatorItem nombre="Ciclo de iniciativas, modulos involucrados" numero={3} />
          </ScrollView>
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


