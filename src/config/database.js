// require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: '157.245.215.207',
  // host: '192.168.99.100',
  username: 'postgres',
  password: '301159',
  database: 'methodusldm',
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
