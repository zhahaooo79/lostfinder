// backend/config/db.js

// 先載入 dotenv，確保 process.env 會拿到 .env 裡的變數
require('dotenv').config();

const mysql = require('mysql2/promise');

// 建立一個 Promise 版的連線池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
