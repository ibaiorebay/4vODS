import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useInitiatives } from '../Hooks/UseInitiatives';
import InitiativeCard from '../Components/InitiativeItem';
import { Iniciativa } from '../Models/Iniciativa';
import { router, useNavigation } from 'expo-router';

interface InitiativeListScreenProps {
}

const InitiativeListScreen: React.FC<InitiativeListScreenProps> = () => {
  const { initiatives, error } = useInitiatives();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Lista de Iniciativas', 
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {initiatives.map((iniciativa: Iniciativa) => (
          <InitiativeCard key={iniciativa.iD_INICIATIVA} iniciativa={iniciativa} />
        ))}
      </ScrollView>
    </View>
  );
};

export default InitiativeListScreen;