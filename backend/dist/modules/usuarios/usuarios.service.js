"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_repository_1 = __importDefault(require("./usuarios.repository"));
class UsuariosService {
    async registerUser(data) {
        // Basic validation
        if (!data.email || !data.password || !data.pagina) {
            throw { statusCode: 400, message: 'Faltan campos obligatorios' };
        }
        try {
            return await usuarios_repository_1.default.create(data);
        }
        catch (error) {
            // Check for unique constraint violation (SQLITE_CONSTRAINT)
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                throw { statusCode: 409, message: 'El email ya está registrado' };
            }
            throw error;
        }
    }
    async getAllUsers() {
        return await usuarios_repository_1.default.findAll();
    }
    async getStats() {
        const total = await usuarios_repository_1.default.countTotal();
        const byPage = await usuarios_repository_1.default.countByPage();
        return {
            total,
            byPage
        };
    }
    async deleteUser(id) {
        console.log(`[UsuariosService] Calling repository to delete user: ${id}`);
        const deleted = await usuarios_repository_1.default.delete(id);
        if (!deleted) {
            console.warn(`[UsuariosService] Repository returned false (user not found) for ID: ${id}`);
            throw { statusCode: 404, message: 'Usuario no encontrado' };
        }
        console.log(`[UsuariosService] Deletion successful for ID: ${id}`);
        return true;
    }
}
exports.default = new UsuariosService();
