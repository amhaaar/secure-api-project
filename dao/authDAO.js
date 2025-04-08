const db = require('../config/database');

class AuthDAO {
  async create({ email, password }) {
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    return db.run(sql, [email, password]);
  }

  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = new AuthDAO();
