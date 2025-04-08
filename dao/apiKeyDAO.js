const db = require('../config/database');

class ApiKeyDAO {
  async create({ userId, key }) {
    const stmt = `INSERT INTO api_keys (user_id, key) VALUES (?, ?)`;
    return db.run(stmt, [userId, key]);
  }

  async findByUserId(userId) {
    const stmt = `SELECT * FROM api_keys WHERE user_id = ? AND is_active = 1`;
    return new Promise((resolve, reject) => {
      db.get(stmt, [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  async findByKey(key) {
    const stmt = `SELECT * FROM api_keys WHERE key = ?`;
    return new Promise((resolve, reject) => {
      db.get(stmt, [key], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  
  async updateLastUsed(key) {
    const stmt = `UPDATE api_keys SET last_used = CURRENT_TIMESTAMP WHERE key = ?`;
    return db.run(stmt, [key]);
  }
  
}

module.exports = new ApiKeyDAO();
