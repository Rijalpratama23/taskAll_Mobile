import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

const BREAKPOINTS = {
  tablet: 768,
  largeTablet: 1024,
};

const featureCards = [
  {
    title: 'Dashboard',
    description: 'Ringkasan singkat performa bisnis Anda.',
    icon: 'grid-outline',
  },
  {
    title: 'Calendar',
    description: 'Atur jadwal meeting dan to-do secara terstruktur.',
    icon: 'calendar-outline',
  },
  {
    title: 'Tasks',
    description: 'Lacak progres tugas tim secara real-time.',
    icon: 'checkmark-done-outline',
  },
  {
    title: 'Messages',
    description: 'Komunikasi cepat antar anggota tim.',
    icon: 'chatbubble-ellipses-outline',
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.largeTablet;
  const isLargeTablet = width >= BREAKPOINTS.largeTablet;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, isLargeTablet ? styles.containerLargeTablet : isTablet ? styles.containerTablet : styles.containerMobile]}>
        {/* HERO SECTION */}
        <View style={[styles.hero, isLargeTablet ? styles.heroLargeTablet : isTablet ? styles.heroTablet : styles.heroMobile]}>
          <Text style={styles.overline}>{isLargeTablet ? 'Large Tablet' : isTablet ? 'Tablet' : 'Mobile'} View</Text>

          <Text style={styles.title}>Dashboard Responsive</Text>

          <Text style={styles.subtitle}>Contoh layout yang otomatis menyesuaikan tampilan mobile, tablet & large tablet.</Text>
        </View>

        {/* GRID CARD */}
        <View style={[styles.cardGrid, isLargeTablet ? styles.cardGridLargeTablet : isTablet ? styles.cardGridTablet : styles.cardGridMobile]}>
          {featureCards.map((card) => (
            <View key={card.title} style={[styles.card, isLargeTablet ? styles.cardLargeTablet : isTablet ? styles.cardTablet : styles.cardMobile]}>
              <Ionicons name={card.icon} size={28} color="#8AB4FF" style={{ marginBottom: 12 }} />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDesc}>{card.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1120',
  },

  container: {
    flexGrow: 1,
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  containerMobile: {
    alignItems: 'stretch',
  },

  containerTablet: {
    maxWidth: 960,
    alignSelf: 'center',
  },

  containerLargeTablet: {
    maxWidth: 1200,
    alignSelf: 'center',
  },

  hero: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#111C33',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },

  heroMobile: {
    alignItems: 'flex-start',
  },

  heroTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },

  heroLargeTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 48,
  },

  overline: {
    color: '#8AB4FF',
    letterSpacing: 1,
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    color: '#B8C6E3',
    fontSize: 16,
    marginTop: 8,
  },

  cardGrid: {
    flexWrap: 'wrap',
  },

  cardGridMobile: {
    flexDirection: 'column',
    gap: 12,
  },

  cardGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },

  cardGridLargeTablet: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },

  card: {
    flexGrow: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#162544',
  },

  cardMobile: {
    width: '100%',
  },

  cardTablet: {
    width: '48%',
  },

  cardLargeTablet: {
    width: '23%', // 3 kolom untuk layar besar
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  cardDesc: {
    color: '#B8C6E3',
    fontSize: 14,
    lineHeight: 20,
  },
});
