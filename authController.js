const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // MySQL DB 연결 파일

// 로그인
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: '비밀번호가 틀립니다.' });
      }

      const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: '로그인 성공', token });
    });
  });
};

// 회원가입
exports.signup = (req, res) => {
  const { name, username, password, phone, account_number, instagram_id, referral_code } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: '비밀번호 암호화 실패' });

    const query = `INSERT INTO users (name, username, password, phone, account_number, instagram_id, referral_code)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, username, hashedPassword, phone, account_number, instagram_id, referral_code], (err, result) => {
      if (err) return res.status(500).json({ message: '회원가입 실패', error: err });
      res.status(201).json({ message: '회원가입 성공' });
    });
  });
};
