import { Request, Response, NextFunction } from 'express';
import usuariosService from './usuarios.service';
import { sendResponse } from '../../utils/response';

class UsuariosController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await usuariosService.registerUser(req.body);
            return sendResponse(res, 201, true, user, 'Usuario registrado correctamente');
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await usuariosService.getAllUsers();
            return sendResponse(res, 200, true, users);
        } catch (error) {
            next(error);
        }
    }

    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await usuariosService.getStats();
            return sendResponse(res, 200, true, stats);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const finalId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const id = parseInt(finalId);
            console.log(`[UsuariosController] Request to delete user with ID: ${id}`);
            await usuariosService.deleteUser(id);
            console.log(`[UsuariosController] User with ID: ${id} deleted successfully`);
            return sendResponse(res, 200, true, null, 'Usuario eliminado correctamente');
        } catch (error) {
            console.error(`[UsuariosController] Error deleting user:`, error);
            next(error);
        }
    }
}

export default new UsuariosController();
