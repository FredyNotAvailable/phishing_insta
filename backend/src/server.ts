import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './config/database'; // Import to ensure DB connection is initialized

const PORT = process.env.PORT || 3000;

const server = app.listen(Number(PORT), 'localhost', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

// Basic keep-alive (should not be necessary but helps debug)
setInterval(() => { }, 10000);
