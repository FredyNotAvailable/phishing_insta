"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
// Determine the path for the database file
const dbPath = path_1.default.resolve(__dirname, '../../feria.sqlite');
const verboseSqlite = sqlite3_1.default.verbose();
const db = new verboseSqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    }
    else {
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
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
        else {
            console.log('Users table ready.');
        }
    });
});
exports.default = db;
