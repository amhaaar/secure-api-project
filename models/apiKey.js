const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = require('../config/database'); // <-- uses your config file

class ApiKey {
  static async validate(key) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM api_keys WHERE key = ? AND is_active = 1',
        [key],
        (err, row) => {
          if (err) return reject(err);
          if (row) {
            db.run(
              'UPDATE api_keys SET last_used = CURRENT_TIMESTAMP, usage_count = usage_count + 1 WHERE key = ?',
              [key]
            );
          }
          resolve(row);
        }
      );
    });
  }
}

module.exports = ApiKey;
