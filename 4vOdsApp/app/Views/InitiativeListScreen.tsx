import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useInitiatives } from '../Hooks/UseInitiatives';
import InitiativeCard from '../Components/InitiativeItem';
import { Iniciativa } from '../Models/Iniciativa';

interface InitiativeListScreenProps {
}

const InitiativeListScreen: React.FC<InitiativeListScreenProps> = () => {
  const { initiatives, error } = useInitiatives();

  return (
    <View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {initiatives.map((iniciativa: Iniciativa) => (
        <InitiativeCard key={iniciativa.iD_INICIATIVA} iniciativa={iniciativa} />
      ))}
    </View>
  );
};

export default InitiativeListScreen;