// backend/app.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

// ======== 偵錯輸出（可選，確認路徑 & .env 有效性） ========
console.log('__dirname:', __dirname);
console.log('靜態目錄 ➜', path.join(__dirname, '../frontend/public'));
console.log('dotenv 讀到的 PORT ➜', process.env.PORT);

const app = express();

// 1. 開啟 CORS
app.use(cors());

// 2. 解析 JSON body
app.use(express.json());

// 3. 解析 x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 4. 把 ../frontend/public 當作靜態目錄一次註冊
//    只要放 index.html，打 http://localhost:PORT/ 就會自動載入
app.use(express.static(path.join(__dirname, '../frontend/public')));

// 5. 掛載 API 路由到 /api
app.use('/api', authRoutes);

// 6. 健康檢查（方便測試，可保留或刪除）
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// 7. 啟動服務
const PORT = process.env.PORT || 3000;
console.log('最終會監聽的埠號 ➜', PORT);

(async () => {
  try {
    // 資料庫連線測試
    const pool = require('./config/db.js');
    const conn = await pool.getConnection();
    conn.release();
    console.log('資料庫連線成功！');

    // 啟動 Express
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('資料庫連線失敗：', err);
  }
})();
