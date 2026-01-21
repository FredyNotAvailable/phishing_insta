"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
class UsuariosRepository {
    // Create a new user
    create(usuario) {
        return new Promise((resolve, reject) => {
            const { email, password, pagina } = usuario;
            const query = `INSERT INTO usuarios (email, password, pagina) VALUES (?, ?, ?)`;
            database_1.default.run(query, [email, password, pagina], function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    // 'this.lastID' contains the id of the inserted row
                    resolve({ id: this.lastID, ...usuario });
                }
            });
        });
    }
    // Get all users ordered by created_at DESC
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM usuarios ORDER BY created_at DESC`;
            database_1.default.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    // Count total users
    countTotal() {
        return new Promise((resolve, reject) => {
            database_1.default.get(`SELECT COUNT(*) as total FROM usuarios`, [], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row.total);
            });
        });
    }
    // Count users per page
    countByPage() {
        return new Promise((resolve, reject) => {
            const query = `SELECT pagina, COUNT(*) as count FROM usuarios GROUP BY pagina`;
            database_1.default.all(query, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
        // Delete a user by ID
        delete (id);
        number;
        Promise < boolean > {
            console, : .log(`[UsuariosRepository] Executing DELETE query for ID: ${id}`),
            return: new Promise((resolve, reject) => {
                const query = `DELETE FROM usuarios WHERE id = ?`;
                database_1.default.run(query, [id], function (err) {
                    if (err) {
                        console.error(`[UsuariosRepository] Database error during delete:`, err);
                        reject(err);
                    }
                    else {
                        console.log(`[UsuariosRepository] Delete changes: ${this.changes}`);
                        resolve(this.changes > 0);
                    }
                });
            })
        };
        export default new UsuariosRepository();
    }
}
