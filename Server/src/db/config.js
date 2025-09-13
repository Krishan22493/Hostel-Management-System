import { createPool } from 'mysql';

export const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("MySQL connection error:", err);
                reject(err);
                return;
            }
            console.log(`MySQL connected! DB HOST: ${pool.config.connectionConfig.host}`);
            connection.release();
            resolve(pool);
        });
    });
};
