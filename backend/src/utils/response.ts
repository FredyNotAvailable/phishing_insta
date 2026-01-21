import { Response } from 'express';

/**
 * Standardized response helper
 * @param {Response} res - Express response object
 * @param {number} status - HTTP status code
 * @param {boolean} success - Success flag
 * @param {object|string|null} data - Data payload or message
 * @param {string} message - Optional message for success responses
 */
export const sendResponse = (
    res: Response,
    status: number,
    success: boolean,
    data: any = null,
    message: string = ''
) => {
    const response: any = {
        success,
        timestamp: new Date().toISOString()
    };

    if (success) {
        response.data = data;
        if (message) response.message = message;
    } else {
        response.error = data; // In error cases, 'data' is usually the error message or object
    }

    return res.status(status).json(response);
};
