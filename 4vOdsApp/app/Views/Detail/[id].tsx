import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router'; 
import { useInitiatives } from '../../Hooks/UseInitiatives'; 
import { Iniciativa } from '../../Models/Iniciativa';
import { Ionicons } from '@expo/vector-icons';

const InitiativeDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams();  
  const { initiatives, loading, error } = useInitiatives();  
  const [iniciativa, setIniciativa] = useState<Iniciativa | null>(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (iniciativa) {
        navigation.setOptions({ title: iniciativa.titulo });
      }
    }, [iniciativa])
  );

  useEffect(() => {
    if (id && initiatives.length > 0) {
      const foundIniciativa = initiatives.find((i) => i.iD_INICIATIVA === Number(id));
      setIniciativa(foundIniciativa || null); 
    }
  }, [id, initiatives]);

  if (loading) {
    return <ActivityIndicator size="large" color="#2980b9" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!iniciativa) {
    return <Text style={styles.errorText}>Iniciativa no encontrada</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{iniciativa.titulo}</Text>
        <Text style={styles.subtitle}>{iniciativa.descripcion}</Text>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#7f8c8d" />
          <Text style={styles.date}>
            {iniciativa.fecha_INICIO} - {iniciativa.fecha_FIN}
          </Text>
        </View>

        <DetailSection icon="pricetag-outline" title="Tipo">
          <Text style={styles.item}>{iniciativa.tipo}</Text>
        </DetailSection>

        <DetailSection icon="checkmark-circle-outline" title="Producto Final">
          <Text style={styles.item}>{iniciativa.productO_FINAL}</Text>
        </DetailSection>

        <DetailSection icon="megaphone-outline" title="Difusión">
          <Text style={styles.item}>{iniciativa.difusion}</Text>
        </DetailSection>

        <DetailSection icon="people-outline" title="Profesores">
          {iniciativa.iD_PROFESORs.map((p, idx) => (
            <Text key={idx} style={styles.item}>
              • {p.nombre} {p.apellidO1} {p.apellidO2}
            </Text>
          ))}
        </DetailSection>

        <DetailSection icon="book-outline" title="Asignaturas">
          {iniciativa.iD_ASIGNATURAs.map((a, idx) => (
            <Text key={idx} style={styles.item}>
              • {a.nombre} ({a.nombrE_CURSO})
            </Text>
          ))}
        </DetailSection>

        <DetailSection icon="business-outline" title="Entidades">
          {iniciativa.iD_ENTIDADs.map((e, idx) => (
            <Text key={idx} style={styles.item}>
              • {e.nombre}: {e.descripcion}
            </Text>
          ))}
        </DetailSection>

        <DetailSection icon="stats-chart-outline" title="Metas">
          {iniciativa.iD_METAs.map((m, idx) => (
            <Text key={idx} style={styles.item}>
              • {m.descripcioN_META} ({m.nombrE_ODS})
            </Text>
          ))}
        </DetailSection>
      </View>
    </ScrollView>
  );
};

const DetailSection: React.FC<{ title: string; icon: any; children: React.ReactNode }> = ({ title, icon, children }) => (
  <View style={styles.section}>
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color="#34495e" style={styles.icon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    borderColor: '#dce3eb',
    borderWidth: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 6,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  item: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#c0392b',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default InitiativeDetailsScreen;
