export const config = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/twa-ficha09',
  env: process.env.NODE_ENV ?? 'development',
}