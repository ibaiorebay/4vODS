import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';

import InitiativeCard from '../InitiativeItem';

const Indicador2 = () => {
  const { initiatives, loading } = useInitiatives();

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
    </View>
  );
};

export default Indicador2;


