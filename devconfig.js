module.exports = {
  type: 'postgres',
  host: 'manny.db.elephantsql.com',
  port: +process.env.DB_PORT,
  username: 'scidcrbi',
  password: 'zkzXOqnlK2SJgYeauL5dDQaHWcYnt2lf',
  database: 'scidcrbi',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: 'true',
};
