import sqlite3 from 'sqlite3';
import path from 'path';

// Determine the path for the database file
const dbPath = path.resolve(__dirname, '../../feria.sqlite');

const verboseSqlite = sqlite3.verbose();
const db = new verboseSqlite.Database(dbPath, (err: Error | null) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize database schema
db.serialize(() => {
    // Create 'usuarios' table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        pagina TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err: Error | null) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Users table ready.');
        }
    });
});

export default db;
