import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Pastikan path import ini sesuai lokasi file kamu (cek folder ui atau components)
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CustomInput from '../components/CustomeInput';
import { auth } from './firebaseConfig';

export default function SignUpScreen() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  // 1. State Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [loading, setLoading] = useState(false);

  // 2. Fungsi Register
  const handleSignUp = async () => {
    // Validasi sederhana
    if(email === '' || password === '') {
       Alert.alert("Error", "Email dan Password wajib diisi!");
       return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      Alert.alert("Sukses", "Akun berhasil dibuat!");
      // Ganti '/home' sesuai nama file kamu (disarankan huruf kecil)
      router.replace('/Home'); 
    } catch (error: any) {
      Alert.alert("Gagal Register", error.message);
    } finally {
      setLoading(false);
    }
  }; // <--- PERBAIKAN 1: Menambahkan penutup fungsi handleSignUp di sini!

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Create Account 📝</Text>
        <Text style={styles.subtitle}>
          Please register on our Streamline, where you can continue using our service.
        </Text>

        {/* PERBAIKAN 2: Menghubungkan Input dengan State (value & onChangeText) */}
        <CustomInput 
            placeholder="Name" 
            value={name}
            onChangeText={setName}
        />
        <CustomInput 
            placeholder="Email Address" 
            keyboardType="email-address" 
            autoCapitalize="none" // Agar email tidak otomatis huruf besar
            value={email}
            onChangeText={setEmail}
        />
        <CustomInput 
            placeholder="Password" 
            secureTextEntry={true} 
            value={password}
            onChangeText={setPassword}
        />

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I agree to <Text style={styles.link}>privacy policy & terms</Text>
          </Text>
        </View>

        {/* PERBAIKAN 3: Memanggil fungsi handleSignUp di tombol */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} disabled={loading}>
          {loading ? (
             <ActivityIndicator color="#fff" />
          ) : (
             <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <SocialButton icon={<FontAwesome name="google" size={20} color="#EA4335" />} />
          <SocialButton icon={<FontAwesome name="apple" size={22} color="#000" />} />
          <SocialButton icon={<FontAwesome name="facebook" size={20} color="#1877F2" />} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}> 
            <Text style={styles.link}>Sign in instead</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ... Bagian SocialButton dan Styles biarkan sama seperti kodemu ...
function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <TouchableOpacity style={styles.socialBtn}>
      {icon}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { padding: 24 },
  backButton: {
    width: 40, height: 40, backgroundColor: '#fff', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
    borderWidth: 1, borderColor: '#f0f0f0'
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 15, textAlign: 'center', },
  subtitle: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 32 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkbox: {
    width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#ccc',
    justifyContent: 'center', alignItems: 'center', marginRight: 10
  },
  checkboxChecked: { backgroundColor: '#FF6F43', borderColor: '#FF6F43' },
  checkboxLabel: { fontSize: 14, color: '#666' },
  link: { color: '#FF6F43', fontWeight: 'bold' },
  primaryButton: {
    backgroundColor: '#FF6F43', 
    paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 32,
    shadowColor: '#FF6F43', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 16, color: '#999' },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  socialBtn: {
    flex: 1, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 12,
    alignItems: 'center', borderWidth: 1, borderColor: '#eee', marginHorizontal: 6
  },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#666' },
});