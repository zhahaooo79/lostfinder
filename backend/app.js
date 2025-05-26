// backend/app.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

const app = express();

// 1. 開啟 CORS
app.use(cors());

// 2. 解析 JSON body
app.use(express.json());

// 3. （可選）解析 x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 4. 静态页面路由（選擇頁、登录、註冊）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/select.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/register.html'));
});
app.get('/user_dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/user_dashboard.html'));
});
app.get('/admin_dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/admin_dashboard.html'));
});

// 5. 健康檢查
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// 6. 把 authRoutes 掛到 /api
app.use('/api', authRoutes);

// 7. 啟動資料庫連線並啟動 HTTP 服務
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    const pool = require('./config/db.js');
    const conn = await pool.getConnection();
    conn.release();
    console.log('資料庫連線成功！');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('資料庫連線失敗：', err);
  }
})();
