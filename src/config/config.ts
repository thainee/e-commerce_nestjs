export const config = {
  envName: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret-key-one',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  db: {
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};
