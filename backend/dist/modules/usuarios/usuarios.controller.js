"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_service_1 = __importDefault(require("./usuarios.service"));
const response_1 = require("../../utils/response");
class UsuariosController {
    async create(req, res, next) {
        try {
            const user = await usuarios_service_1.default.registerUser(req.body);
            return (0, response_1.sendResponse)(res, 201, true, user, 'Usuario registrado correctamente');
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await usuarios_service_1.default.getAllUsers();
            return (0, response_1.sendResponse)(res, 200, true, users);
        }
        catch (error) {
            next(error);
        }
    }
    async getStats(req, res, next) {
        try {
            const stats = await usuarios_service_1.default.getStats();
            return (0, response_1.sendResponse)(res, 200, true, stats);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const finalId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const id = parseInt(finalId);
            console.log(`[UsuariosController] Request to delete user with ID: ${id}`);
            await usuarios_service_1.default.deleteUser(id);
            console.log(`[UsuariosController] User with ID: ${id} deleted successfully`);
            return (0, response_1.sendResponse)(res, 200, true, null, 'Usuario eliminado correctamente');
        }
        catch (error) {
            console.error(`[UsuariosController] Error deleting user:`, error);
            next(error);
        }
    }
}
exports.default = new UsuariosController();
