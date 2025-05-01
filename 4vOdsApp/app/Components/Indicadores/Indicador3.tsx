import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';

import InitiativeCard from '../InitiativeItem';
import { useAsignaturas } from '@/app/Hooks/UseAsignaturas';

const Indicador3 = () => {
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
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Iniciativa: {item.titulo}</Text>
                        {item.iD_ASIGNATURAs.map(asignatura =>
                            <Text key={asignatura.toString()} style={{ fontSize: 12 }}>Ciclo: {asignaturas.find(a => a.iD_ASIGNATURA === asignatura.iD_ASIGNATURA)?.nombrE_CURSO}</Text>
                        )}
                        {item.iD_ASIGNATURAs.map(asignatura =>
                            <Text key={asignatura.toString()} style={{ fontSize: 12, marginLeft : 10}}>Módulos: {asignaturas.find(a => a.iD_ASIGNATURA === asignatura.iD_ASIGNATURA)?.nombre}</Text>
                        )}
                    </View>
                }
            />
        </View>
    );
};

export default Indicador3;


