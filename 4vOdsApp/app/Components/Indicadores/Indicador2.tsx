import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';

import InitiativeCard from '../InitiativeItem';

const Indicador2 = () => {
  const { initiatives, loading } = useInitiatives();
  const [ numIniciativas, setNumInciativas] = useState(0)

  useEffect(() => {
    setNumInciativas(initiatives.length)
  })

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (initiatives.length === 0) {
    return (
      <View>
        <Text>No hay iniciativas actualmente.</Text>
      </View>
    );
  }

  return (
    <View style={{ maxHeight: 650 }}>
        <Text>Actualmente hay {numIniciativas} iniciativas</Text>
    </View>
  );
};

export default Indicador2;


