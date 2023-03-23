module.exports = {
  type: 'postgres',
  host: 'manny.db.elephantsql.com',
  port: +process.env.DB_PORT,
  username: 'rcfsssvi',
  password: 'G_bb8MvPbT79qTqSnbk6vjVrSx7JEqWy',
  database: 'rcfsssvi',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: 'true',
};
