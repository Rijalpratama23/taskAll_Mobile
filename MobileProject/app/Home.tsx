import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskCard from '../components/TaskCard';



export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Bruce 👋</Text>
            <Text style={styles.subGreeting}>Your daily adventure starts now</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
             <Ionicons name="grid-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Status Grid (4 Kotak Warna) */}
        <View style={styles.gridContainer}>
          {/* Baris 1 */}
          <View style={styles.row}>
            <StatusCard 
              color="#E3F2FF" iconColor="#2F80ED" 
              title="On going" count="24 Tasks" icon="sync" 
            />
            <StatusCard 
              color="#FFF4D8" iconColor="#F2C94C" 
              title="In Process" count="12 Tasks" icon="time-outline" 
            />
          </View>
          {/* Baris 2 */}
          <View style={styles.row}>
             <StatusCard 
              color="#D9F3F0" iconColor="#27AE60" 
              title="Completed" count="42 Tasks" icon="document-text-outline" 
            />
            <StatusCard 
              color="#FFE2DD" iconColor="#EB5757" 
              title="Canceled" count="8 Tasks" icon="close-circle-outline" 
            />
          </View>
        </View>

        {/* Bagian Recent Task */}
        <Text style={styles.sectionTitle}>Recent Task</Text>

        <TaskCard 
          title="Website for Rune.io" 
          subtitle="Digital Product Design" 
          progress="40%" color="#EB5757" 
        />
        <TaskCard 
          title="Dashboard for ProSavvy" 
          subtitle="Digital Product Design" 
          progress="75%" color="#27AE60" 
        />
        <TaskCard 
          title="Mobile Apps for Track.id" 
          subtitle="Digital Product Design" 
          progress="50%" color="#F2C94C" 
        />
         <TaskCard 
          title="Website for CourierGo.com" 
          subtitle="Digital Product Design" 
          progress="40%" color="#2F80ED" 
        />

        {/* Ruang kosong di bawah agar tidak tertutup menu (jika ada) */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Floating Action Button (+) di Bawah Tengah (Hiasan Navigasi) */}
      <View style={styles.bottomNavPlaceholder}>
         <TouchableOpacity style={styles.fab} onPress={() => router.push('/AddTask')}>
            <Ionicons name="add" size={32} color="#fff"/>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Komponen Kecil untuk Kotak Status Warna-Warni
function StatusCard({ color, iconColor, title, count, icon }: any) {
  return (
    <View style={[styles.statusCard, { backgroundColor: color }]}>
       <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.5)' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
       </View>
       <View>
         <Text style={styles.statusTitle}>{title}</Text>
         <Text style={styles.statusCount}>{count}</Text>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { padding: 24 },
  
  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, marginTop: 10
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  subGreeting: { fontSize: 14, color: '#888', marginTop: 4 },
  profileBtn: {
    padding: 10, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee'
  },

  // Grid Status
  gridContainer: { marginBottom: 32 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statusCard: {
    width: '48%', padding: 16, borderRadius: 16,
    justifyContent: 'space-between', height: 110
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    alignSelf: 'flex-start' // Agar ikon di kiri
  },
  statusTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  statusCount: { fontSize: 12, color: '#666' },

  // Recent Task
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 16 },

  // Fake Bottom Nav (Hanya visual tombol +)
  bottomNavPlaceholder: {
    position: 'absolute', bottom: 30, width: '100%', alignItems: 'center'
  },
  fab: {
    width: 60, height: 60, backgroundColor: '#FF6F43', borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#FF6F43', shadowOpacity: 0.4, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8,
    elevation: 5
  }
});