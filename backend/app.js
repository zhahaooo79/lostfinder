// ※ 把所有 import … from 改成 require()
const express = require('express');
const cors = require('cors');
require('dotenv').config();            // dotenv 一般直接這樣載入並執行
const pool = require('./config/db.js');
const authRoutes = require('./routes/auth.js');

const app = express();
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LostFinder backend is running.');
});

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// 用 IIFE 包起來，才能用 await
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('資料庫連線成功！');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('資料庫連線失敗：', error);
  }
})();
