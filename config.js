import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT | 3001
export const EMAIL = process.env.EMAIL
export const PASSWORD = process.env.PASSWORD