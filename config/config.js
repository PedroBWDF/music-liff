module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'music_liff_db',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  // production: {
  //   username: process.env.MYSQL_USER || 'root',
  //   password: process.env.MYSQL_ROOT_PASSWORD || 'password',
  //   database: process.env.MYSQL_DATABASE || 'music_forum',
  //   host: process.env.DB_HOST || 'mysql-e8vy:3306',
  //   port: process.env.DB_PORT || 3306,
  //   dialect: 'mysql'
  // }
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
  }
}
