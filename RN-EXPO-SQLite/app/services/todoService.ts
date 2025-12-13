import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('databaseNameV2');
  }
  return db;
}

export type Todo = {
  id?: number;
  text: string;
  done: number;
  created_at?: string;
  finished_at?: string | null;
};

/** Create table */
export async function initDB(): Promise<void> {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT (datetime('now')),
      finished_at DATETIME
    );
  `);
}

/** Get all todos */
export async function getTodos(): Promise<Todo[]> {
  const db = await getDB();
  const rows = await db.getAllAsync<Todo>('SELECT * FROM todos ORDER BY id DESC;');
  return rows;
}

/** Insert todo */
export async function addTodo(text: string): Promise<number> {
  const db = await getDB();

  const result = await db.runAsync('INSERT INTO todos (text, done) VALUES (?, 0);', [text]);

  return result.lastInsertRowId ?? 0;
}

/** Update todo */
export async function updateTodo(id: number, fields: { text?: string; done?: number; finished_at?: string | null | number }): Promise<void> {
  const db = await getDB();

  const sets: string[] = [];
  const params: any[] = [];

  if (fields.text !== undefined) {
    sets.push('text = ?');
    params.push(fields.text);
  }

  if (fields.done !== undefined) {
    sets.push('done = ?');
    params.push(fields.done);
  }

  if (sets.length === 0) return;

  if (fields.finished_at !== undefined) {
    sets.push('finished_at = ?');
    params.push(fields.finished_at);
  }

  params.push(id);

  await db.runAsync(`UPDATE todos SET ${sets.join(', ')} WHERE id = ?;`, params);
}

/** Delete todo */
export async function deleteTodo(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync('DELETE FROM todos WHERE id = ?;', [id]);
}

export default {
  initDB,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
