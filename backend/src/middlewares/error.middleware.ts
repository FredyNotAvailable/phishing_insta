import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';

interface CustomError extends Error {
    statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    // Default error status and message
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return sendResponse(res, status, false, message);
};

export default errorHandler;
