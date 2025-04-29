import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Iniciativa } from '../Models/Iniciativa';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface InitiativeCardProps {
  iniciativa: Iniciativa;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ iniciativa }) => {
  return (
    <Link href={`/Views/Detail/${iniciativa.iD_INICIATIVA}`} style={styles.card}>
      <View style={styles.section}>
        <Text style={styles.title}>{iniciativa.titulo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.description}>{iniciativa.descripcion}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color="#607d8b" style={styles.icon} />
          <Text style={styles.dateText}>Inicio: {iniciativa.fecha_INICIO}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color="#607d8b" style={styles.icon} />
          <Text style={styles.dateText}>Fin: {iniciativa.fecha_FIN}</Text>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e3f2fd',
    padding: 24,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 16, 
    elevation: 5,
    shadowColor: '#1e88e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderColor: '#90caf9',
    borderWidth: 1,
  },
  
  section: {
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  description: {
    fontSize: 16,
    color: '#1a237e',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#607d8b',
  },
});

export default InitiativeCard;
