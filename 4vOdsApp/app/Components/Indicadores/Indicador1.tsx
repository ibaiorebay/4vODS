import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';

import InitiativeCard from '../InitiativeItem';

const Indicador1 = () => {
  const [nombreCurso, setNombreCurso] = useState('');

  const { initiatives, loading } = useInitiatives(nombreCurso);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (initiatives.length === 0) {
    return (
      <View>
        <TextInput
          style={{ borderWidth: 1, padding: 8, margin: 10 }}
          placeholder="Ingrese el nombre del curso"
          value={nombreCurso}
          onChangeText={(text) => setNombreCurso(text)}
        />
        <Text>No se encontraron iniciativas para el curso "{nombreCurso}".</Text>
      </View>
    );
  }

  return (
    <View style={{ maxHeight: 650 }}>
      <TextInput
        style={{ borderWidth: 1, padding: 8, margin: 10 }}
        placeholder="Ingrese el nombre del curso"
        value={nombreCurso}
        onChangeText={(text) => setNombreCurso(text)}
      />
      <FlatList
        data={initiatives}
        keyExtractor={(item) => item.iD_INICIATIVA.toString()}
        renderItem={({ item }) => <InitiativeCard iniciativa={item} />}
      />
    </View>
  );
};

export default Indicador1;


