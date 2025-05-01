import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import Indicador1 from './Indicadores/Indicador1';
import Indicador2 from './Indicadores/Indicador2';
import Indicador3 from './Indicadores/Indicador3';

interface IndicatorCardProps {
    nombre: string;
    numero: number;
}

const IndicatorItem: React.FC<IndicatorCardProps> = ({ nombre, numero }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
                <View style={styles.card}>
                    <Text style={styles.name}>{nombre}</Text>
                </View>
            </TouchableOpacity>

            <Modal
                visible={isModalOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalOpen(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {numero === 1 && <Indicador1 />}
                        {numero === 2 && <Indicador2 />}
                        {numero === 3 && <Indicador3 />}
                        <Pressable onPress={() => setIsModalOpen(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
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
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0d47a1',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0d47a1',
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default IndicatorItem;
