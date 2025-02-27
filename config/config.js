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
    username: 'root',  // 替換成 Render 提供的 MySQL 用戶名
    password: 'password',  // 替換成 Render 提供的 MySQL 密碼
    database: 'music_liff_db',  // 替換成你的 Render MySQL 資料庫名稱
    host: '100.20.92.101',  // 使用 Render 提供的其中一個 IP
    port: 3306,  // MySQL 預設 Port
    dialect: 'mysql'
  }
}
