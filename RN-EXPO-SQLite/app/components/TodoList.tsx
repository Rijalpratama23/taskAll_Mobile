import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Todo, addTodo, deleteTodo, getTodos, initDB, updateTodo } from '../services/todoService';

// komponen Checkbox
const Checkbox = ({ label, value, onChange }: { label: string; value: boolean; onChange: (val: boolean) => void }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={() => onChange(!value)}>
    <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>{value && <Text style={styles.checkboxCheckmark}>✓</Text>}</View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // state untuk filter
  // PERBAIKAN 1: Konsisten penamaan variabel (pakai 'd' kecil semua biar aman)
  const [showDone, setShowDone] = useState(true);
  const [showUndone, setShowUndone] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await reload();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  async function reload() {
    const data = await getTodos();
    setTodos(data);
  }

  async function handleAddOrUpdate() {
    if (!text.trim()) return;
    try {
      if (editingId) {
        await updateTodo(editingId, { text: text.trim() });
        setEditingId(null);
      } else {
        await addTodo(text.trim());
      }
      setText('');
      await reload();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleToggle(item: Todo) {
    try {
      const isFinishing = !item.done;
      await updateTodo(item.id!, {
        done: isFinishing ? 1 : 0,
        finished_at: isFinishing ? Date.now() : null,
      });
      await reload();
    } catch (e) {
      console.error(e);
    }
  }

  function startEdit(item: Todo) {
    setEditingId(item.id ?? null);
    setText(item.text);
  }

  function confirmDelete(item: Todo) {
    Alert.alert('Hapus Todo', 'Yakin ingin menghapus?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTodo(item.id!);
            await reload();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  }

  // format tanggal tugas 1
  const formatFinishedDate = (timestamp: string | number | null | undefined) => {
    if (!timestamp) return '';
    const date = new Date(Number(timestamp));
    // format string local IDN
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // filter data tugas 2
  const filteredTodos = todos.filter((item) => {
    if (item.done && showDone) return true;
    // PERBAIKAN 1: Sesuaikan nama variabel state di sini juga
    if (!item.done && showUndone) return true;
    return false;
  });

  function renderItem({ item }: { item: Todo }) {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => handleToggle(item)} style={{ flex: 1 }}>
          <Text style={[styles.itemText, item.done ? styles.doneText : null]}>{item.text}</Text>

          {/* Tugas 1: menampilkan waktu selesai */}
          {/* PERBAIKAN 2: 'styles.dateText' bukan 'styles.dataText' */}
          {item.done && item.finished_at ? <Text style={styles.dateText}>Selesai: {formatFinishedDate(item.finished_at)}</Text> : null}
        </TouchableOpacity>

        <Button title="Edit" onPress={() => startEdit(item)} />
        <View style={{ width: 8 }} />
        <Button color="#d9534f" title="Del" onPress={() => confirmDelete(item)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo (SQLite)</Text>
      <View style={styles.inputRow}>
        <TextInput placeholder="Tulis todo..." value={text} onChangeText={setText} style={styles.input} />
        <Button title={editingId ? 'Simpan' : 'Tambah'} onPress={handleAddOrUpdate} />
      </View>

      {/* tampilan checkbox filter */}
      <View style={styles.filterContainer}>
        <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Filter:</Text>
        <Checkbox label="Selesai" value={showDone} onChange={setShowDone} />
        <View style={{ width: 15 }} />
        {/* PERBAIKAN 1: value={showUndone} (sesuaikan nama variabel) */}
        <Checkbox label="Belum Selesai" value={showUndone} onChange={setShowUndone} />
      </View>

      {/* PERBAIKAN 3: Gunakan 'filteredTodos' agar filternya berfungsi */}
      <FlatList data={filteredTodos} keyExtractor={(i) => String(i.id)} renderItem={renderItem} ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>Belum ada todo sesuai filter.</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 10, marginRight: 8, borderRadius: 6, backgroundColor: '#f9f9f9' },

  // Style untuk Item List
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: { fontSize: 16, color: '#333' },
  doneText: { textDecorationLine: 'line-through', color: '#aaa' },
  dateText: { fontSize: 12, color: 'green', marginTop: 4 }, // Ini nama yang benar (dateText)

  // Style untuk Filter Checkbox
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  checkboxChecked: { backgroundColor: '#007AFF' },
  checkboxCheckmark: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 14 },
});
