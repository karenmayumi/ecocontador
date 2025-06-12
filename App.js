import { Provider } from './LoginContexto';
import Drawer from './Drawer';
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider databaseName="app.db" onInit={startdb}>
      <Provider>
        <Drawer />
      </Provider>
    </SQLiteProvider>
  );
}

async function startdb(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      ativo bit default(1)
    );
  `);
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome_produto TEXT NOT NULL,
          material_reciclavel TEXT NOT NULL,
          peso_material REAL NOT NULL
      );
  `);
  //await db.execAsync('insert into usuarios (login, senha) VALUES ("admin","123")')
  //await db.execAsync('delete from usuarios')
}
