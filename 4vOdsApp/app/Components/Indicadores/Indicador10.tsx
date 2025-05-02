import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';

import InitiativeCard from '../InitiativeItem';
import { useAsignaturas } from '@/app/Hooks/UseAsignaturas';

const Indicador10 = () => {
    const { initiatives, loading } = useInitiatives();
    const { asignaturas } = useAsignaturas();

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
            <FlatList
                data={initiatives}
                keyExtractor={(item) => item.iD_INICIATIVA.toString()}
                renderItem={({ item }) =>
                    <View style={{ backgroundColor: '#e3f2fd', padding: 12, borderRadius: 12, marginBottom: 20, marginHorizontal: 16, elevation: 5, shadowColor: '#1e88e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 6, borderColor: '#90caf9', borderWidth: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Iniciativa: {item.titulo}</Text>
                        <Text style={{ fontSize: 12 }}>Profesores: {item.iD_PROFESORs.map(profesor => (
                            <Text key={profesor.iD_PROFESOR}>
                                <Text style={{ fontWeight: 'bold' }}>Nombre: </Text><Text>{profesor.nombre}</Text>
                                <Text style={{ fontWeight: 'bold' }}>Apellidos: </Text><Text>{profesor.apellidO1} {profesor.apellidO2}</Text>
                            </Text>
                        ))}</Text>
                        <Text style={{ fontSize: 12 }}>Número de profesores involucrados: {item.iD_PROFESORs.length}</Text>
                    </View>
                }
            />
        </View>
    );
};

export default Indicador10;


