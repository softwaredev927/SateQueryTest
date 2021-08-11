const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || '127.0.0.1',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    database: env.DB_NAME || 'satedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
};
  
module.exports = config;