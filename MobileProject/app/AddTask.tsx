import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTaskScreen() {
  const router = useRouter();
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Design");

  const categories = ["Design", "Development", "Coding", "Meeting", "Office Time", "User Experience"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
             <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>New Tasks</Text>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          {/* Task Title */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor="#999" />
          </View>

          {/* Date Picker (Dummy) */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Date" placeholderTextColor="#999" editable={false} />
            <Ionicons name="caret-down" size={20} color="#333" style={styles.inputIcon} />
          </View>

          {/* Assignee */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Assignee" placeholderTextColor="#999" />
            <Ionicons name="search-outline" size={20} color="#333" style={styles.inputIcon} />
          </View>

          {/* Description */}
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Add your task details" 
              placeholderTextColor="#999" 
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Action Icons (Grid, Text, Attach) */}
        <View style={styles.actionIconsRow}>
           <MaterialIcons name="grid-view" size={24} color="#333" style={{ marginRight: 20 }} />
           <MaterialIcons name="text-fields" size={24} color="#333" style={{ marginRight: 20 }} />
           <Ionicons name="attach" size={24} color="#333" />
        </View>

        {/* Category Section */}
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.chip, selectedCategory === cat && styles.chipSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Alert Switch */}
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Get alert for this task</Text>
          <Switch 
            trackColor={{ false: "#ddd", true: "#FF6F43" }}
            thumbColor={alertEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={() => setAlertEnabled(!alertEnabled)}
            value={alertEnabled}
          />
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={() => router.back()}>
          <Text style={styles.createButtonText}>Create Task</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { padding: 24 },
  
  header: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24
  },
  iconBtn: {
    padding: 8, backgroundColor: '#fff', borderRadius: 50,
  },
  pageTitle: {
    fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 24
  },

  // Form Styles
  formContainer: { marginBottom: 16 },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    // Shadow style mirip desain
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative' // Untuk icon absolute
  },
  input: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
  },
  textAreaContainer: {
    height: 120, // Lebih tinggi untuk deskripsi
    justifyContent: 'flex-start'
  },
  textArea: {
    height: '100%',
    textAlignVertical: 'top', // Agar text mulai dari atas
  },

  // Action Icons
  actionIconsRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 24
  },

  // Categories
  sectionLabel: {
    fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 12
  },
  categoryContainer: {
    flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24
  },
  chip: {
    backgroundColor: '#fff',
    paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 12, marginRight: 10, marginBottom: 10,
    borderWidth: 1, borderColor: '#eee'
  },
  chipSelected: {
    backgroundColor: '#333', borderColor: '#333'
  },
  chipText: {
    color: '#666', fontWeight: '500'
  },
  chipTextSelected: {
    color: '#fff'
  },

  // Alert
  alertContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32
  },
  alertText: {
    fontSize: 16, fontWeight: 'bold', color: '#111'
  },

  // Button
  createButton: {
    backgroundColor: '#FF6F43',
    paddingVertical: 18, borderRadius: 16, alignItems: 'center',
    shadowColor: '#FF6F43', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8
  },
  createButtonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
});