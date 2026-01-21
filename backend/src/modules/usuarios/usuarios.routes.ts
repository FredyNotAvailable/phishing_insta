import { Router } from 'express';
import usuariosController from './usuarios.controller';

const router = Router();

// Define routes
router.post('/', (req, res, next) => { usuariosController.create(req, res, next); });
router.get('/', (req, res, next) => { usuariosController.getAll(req, res, next); });
router.get('/stats', (req, res, next) => { usuariosController.getStats(req, res, next); });
router.delete('/:id', (req, res, next) => { usuariosController.delete(req, res, next); });

export default router;
