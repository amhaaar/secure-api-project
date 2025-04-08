const { v4: uuidv4 } = require('uuid');
const apiKeyDAO = require('../dao/apiKeyDAO');

class ApiKeyService {
  async generate(userId) {
    const existing = await apiKeyDAO.findByUserId(userId);
    if (existing) return existing;

    const key = uuidv4();
    await apiKeyDAO.create({ userId, key });
    return key;
  }

  async getUserApiKey(userId) {
    return await apiKeyDAO.findByUserId(userId);
  }
}

module.exports = new ApiKeyService();
