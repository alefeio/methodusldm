// require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '301159',
  database: 'methodusldm2',
  // host: process.env.BD_HOST,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
