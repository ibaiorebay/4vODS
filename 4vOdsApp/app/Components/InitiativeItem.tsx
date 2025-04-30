import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Iniciativa } from '../Models/Iniciativa';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMetas } from '../Hooks/UseMetas';

interface InitiativeCardProps {
  iniciativa: Iniciativa;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ iniciativa }) => {
  const { findMetaById } = useMetas();

  const metas = iniciativa.iD_METAs.map(id => findMetaById(iniciativa.iD_INICIATIVA));

  let odsNames = '';
  if (metas) {
    odsNames = metas.map(meta => Array.isArray(meta?.iD_ODS) ? meta.iD_ODS.map(ods => ods.toString()).join(', ') : '').join(', ');
  }

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

      <View style={styles.odsContainer}>
        <View style={styles.odsList}>
          {metas.map(meta => (
            <Image key={meta?.iD_META} source={{ uri: `assets/images/ods/${meta?.iD_ODS}.png` }} style={styles.odsImage} />
          ))}
        </View>
      </View>
    </Link>
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
  odsContainer: {
    backgroundColor: '#e3f2fd',
    borderTopWidth: 1,
    borderTopColor: '#90caf9',
    paddingVertical: 8,
  },
  odsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  odsListItem: {
    fontSize: 14,
    color: '#607d8b',
    marginRight: 8,
  },
  odsImage: {
    width: 50,
    height: 50,
    margin: 4,
  },
});

export default InitiativeCard;

