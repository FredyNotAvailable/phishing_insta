import db from '../../config/database';

export interface Usuario {
    id?: number;
    email: string;
    password?: string;
    pagina: string;
    created_at?: string;
}

class UsuariosRepository {

    // Create a new user
    create(usuario: Usuario): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            const { email, password, pagina } = usuario;
            const query = `INSERT INTO usuarios (email, password, pagina) VALUES (?, ?, ?)`;

            db.run(query, [email, password, pagina], function (this: any, err: Error | null) {
                if (err) {
                    reject(err);
                } else {
                    // 'this.lastID' contains the id of the inserted row
                    resolve({ id: this.lastID, ...usuario });
                }
            });
        });
    }

    // Get all users ordered by created_at DESC
    findAll(): Promise<Usuario[]> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM usuarios ORDER BY created_at DESC`;

            db.all(query, [], (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Count total users
    countTotal(): Promise<number> {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) as total FROM usuarios`, [], (err: Error | null, row: any) => {
                if (err) reject(err);
                else resolve(row.total);
            });
        });
    }

    // Count users per page
    countByPage(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const query = `SELECT pagina, COUNT(*) as count FROM usuarios GROUP BY pagina`;
            db.all(query, [], (err: Error | null, rows: any[]) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // Delete a user by ID
    delete(id: number): Promise<boolean> {
        console.log(`[UsuariosRepository] Executing DELETE query for ID: ${id}`);
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM usuarios WHERE id = ?`;
            db.run(query, [id], function (this: any, err: Error | null) {
                if (err) {
                    console.error(`[UsuariosRepository] Database error during delete:`, err);
                    reject(err);
                } else {
                    console.log(`[UsuariosRepository] Delete changes: ${this.changes}`);
                    resolve(this.changes > 0);
                }
            });
        });
    }
}

export default new UsuariosRepository();
