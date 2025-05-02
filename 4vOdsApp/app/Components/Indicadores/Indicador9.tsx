import { useInitiatives } from '@/app/Hooks/UseInitiatives';
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Meta } from '@/app/Models/Meta';

const Indicador9 = () => {
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
            <FlatList
                data={initiatives}
                keyExtractor={(item) => item.iD_INICIATIVA.toString()}
                renderItem={({ item }) => {
                    // Verificar si iD_METAs contiene objetos completos o solo IDs
                    const dimensiones = item.iD_METAs
                        .map((meta: Meta | number) => {
                            // Si es un objeto, devolver la dimensión directamente
                            if (typeof meta === 'object' && meta.dimensioN_ODS) {
                                return meta.dimensioN_ODS;
                            }
                            // Si es un ID, manejarlo adecuadamente (aquí puedes buscar la meta por ID si es necesario)
                            return 'Desconocido'; // Cambia esto si tienes un método para buscar metas por ID
                        })
                        .join(', ');

                    return (
                        <View
                            style={{
                                backgroundColor: '#e3f2fd',
                                padding: 12,
                                borderRadius: 12,
                                marginBottom: 20,
                                marginHorizontal: 16,
                                elevation: 5,
                                shadowColor: '#1e88e5',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.15,
                                shadowRadius: 6,
                                borderColor: '#90caf9',
                                borderWidth: 1,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Iniciativa: {item.titulo}</Text>
                            <Text style={{ fontSize: 12 }}>Dimension/es: {dimensiones}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default Indicador9;