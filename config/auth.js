const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secure_secret_key';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

module.exports = {
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
        district: user.district
      },
      SECRET_KEY,
      { expiresIn: '8h' }
    );
  },
  verifyToken: (token) => {
    return jwt.verify(token, SECRET_KEY);
  },
  hashPassword: async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  },
  SALT_ROUNDS
};