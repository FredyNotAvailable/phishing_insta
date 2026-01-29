import express, { Request, Response } from 'express';
import cors from 'cors';
import usuariosRoutes from './modules/usuarios/usuarios.routes';
import errorHandler from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/usuarios', usuariosRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error handling - MUST be the last middleware
app.use(errorHandler);

export default app;
