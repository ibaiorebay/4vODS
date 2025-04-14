import React from 'react';
import { useInitiatives } from '../Hooks/UseInitiatives';
import { Iniciativa } from '../Models/Iniciativa';
import { View, Text } from 'react-native';

interface InitiativeCardProps {
  iniciativa: Iniciativa;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ iniciativa }) => {
  return (
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{iniciativa.titulo}</Text>
      <Text style={{ fontSize: 16, color: '#666' }}>{iniciativa.descripcion}</Text>
      <Text style={{ fontSize: 14, color: '#999' }}>Fecha de inicio: {iniciativa.fecha_INICIO}</Text>
      <Text style={{ fontSize: 14, color: '#999' }}>Fecha de fin: {iniciativa.fecha_FIN}</Text>
    </View>
  );
};

export default InitiativeCard;