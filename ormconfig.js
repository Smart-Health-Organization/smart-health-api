module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: 'postgres',
  password: '1234567',
  database: 'smart_health',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: 'true',
};
