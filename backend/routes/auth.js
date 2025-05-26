// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db.js'); // promise 池

// Signup（示例，只做简单用户名插入）
router.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO user (username, password, role, violation_count) VALUES (?, ?, "user", 0)',
      [username, password]
    );
    res.status(201).json({ message: '註冊成功' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: '使用者名稱已存在' });
    }
    console.error(err);
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT user_id, username, role FROM user WHERE username = ? AND password = ?',
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }
    // 只回傳最必要的欄位
    const user = {
      id: rows[0].user_id,
      username: rows[0].username,
      role: rows[0].role
    };
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
});

module.exports = router;
