import crypto from 'node:crypto'

export const accessSecretKey = process.env.JWT_ACCESS_SECRET_KEY
    ?? crypto.randomBytes(32).toString('base64');

export const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
    ?? crypto.randomBytes(32).toString('base64');