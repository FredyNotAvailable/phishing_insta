import usuariosRepository, { Usuario } from './usuarios.repository';

class UsuariosService {

    async registerUser(data: Usuario) {
        // Basic validation
        if (!data.email || !data.password || !data.pagina) {
            throw { statusCode: 400, message: 'Faltan campos obligatorios' };
        }

        try {
            return await usuariosRepository.create(data);
        } catch (error: any) {
            // Check for unique constraint violation (SQLITE_CONSTRAINT)
            if (error.message && error.message.includes('UNIQUE constraint failed')) {
                throw { statusCode: 409, message: 'El email ya está registrado' };
            }
            throw error;
        }
    }

    async getAllUsers() {
        return await usuariosRepository.findAll();
    }

    async getStats() {
        const total = await usuariosRepository.countTotal();
        const byPage = await usuariosRepository.countByPage();

        return {
            total,
            byPage
        };
    }

    async deleteUser(id: number) {
        console.log(`[UsuariosService] Calling repository to delete user: ${id}`);
        const deleted = await usuariosRepository.delete(id);
        if (!deleted) {
            console.warn(`[UsuariosService] Repository returned false (user not found) for ID: ${id}`);
            throw { statusCode: 404, message: 'Usuario no encontrado' };
        }
        console.log(`[UsuariosService] Deletion successful for ID: ${id}`);
        return true;
    }
}

export default new UsuariosService();
