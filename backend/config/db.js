import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" }); // 載入 .env 檔案的變數

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // localhost
  user: process.env.DB_USER,       // root
  password: process.env.DB_PASSWORD, // 你設的密碼
  database: process.env.DB_NAME,   // lostfinder
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
