import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TaskCardProps {
  title: string;
  subtitle: string;
  progress: string; // Contoh: "40%"
  color: string;    // Warna lingkaran progress
}

export default function TaskCard({ title, subtitle, progress, color }: TaskCardProps) {
  return (
    <View style={styles.card}>
      {/* Bagian Kiri: Teks Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        <View style={styles.metaContainer}>
          <Ionicons name="checkmark-circle-outline" size={16} color="#666" />
          <Text style={styles.metaText}>12 Tasks</Text>
        </View>
      </View>

      {/* Bagian Kanan: Indikator Progress Sederhana */}
      <View style={[styles.progressCircle, { borderColor: color }]}>
        <Text style={styles.progressText}>{progress}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow tipis
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2, 
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  // Style Lingkaran Progress
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  }
});