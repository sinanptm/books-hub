import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT,
    MONGODB_URL,
    CLIENT_URL,
    NODE_ENV
} = process.env;
