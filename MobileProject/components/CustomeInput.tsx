import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
}

export default function CustomInput({ placeholder, ...props }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12, // Membuat sudut melengkung
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    // Efek bayangan (shadow) tipis seperti di desain
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
});