type Dialect = 'mysql' | 'postgres' | 'sqlite'; // Define valid dialect values

interface DatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  dialect?: Dialect;
}

const database: {
  Development: DatabaseConfig;
  Production: DatabaseConfig;
  Testing: DatabaseConfig;
} = {
  Development: {
    username: process.env.DB_SQL_USERNAME,
    password: process.env.DB_SQL_PASSWORD,
    database: process.env.DB_SQL_DATABASE,
    host: process.env.DB_SQL_HOST,
    dialect: 'mysql', // Make sure this matches one of the valid dialect values
  },
  Production: {
    username: process.env.DB_SQL_USERNAME,
    password: process.env.DB_SQL_PASSWORD,
    database: process.env.DB_SQL_DATABASE,
    host: process.env.DB_SQL_HOST,
    dialect: 'mysql', // Make sure this matches one of the valid dialect values
  },
  Testing: {
    username: process.env.DB_SQL_USERNAME,
    password: process.env.DB_SQL_PASSWORD,
    database: process.env.DB_SQL_DATABASE,
    host: process.env.DB_SQL_HOST,
    dialect: 'mysql', // Make sure this matches one of the valid dialect values
  },
};

export default database;
