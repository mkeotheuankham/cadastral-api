const { generateToken, hashPassword, comparePassword } = require('../config/auth');
const db = require('../config/db');
const { apiResponse } = require('../utils/apiResponse');
const { validationResult } = require('express-validator');

module.exports = {
  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse(res, 400, { errors: errors.array() });
      }

      const { username, password } = req.body;

      // ກວດສອບຜູ້ໃຊ້
      const { rows } = await db.query(
        'SELECT id, username, password, role, district FROM users WHERE username = $1',
        [username]
      );

      if (rows.length === 0) {
        return apiResponse(res, 401, { error: 'Invalid credentials' });
      }

      const user = rows[0];

      // ກວດສອບລະຫັດຜ່ານ
      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return apiResponse(res, 401, { error: 'Invalid credentials' });
      }

      // ສ້າງ token
      const token = generateToken(user);

      // ສົ່ງຂໍ້ມູນຜູ້ໃຊ້ໂດຍບໍ່ລວມ password
      const userData = {
        id: user.id,
        username: user.username,
        role: user.role,
        district: user.district,
        token
      };

      apiResponse(res, 200, userData);
    } catch (err) {
      console.error(err);
      apiResponse(res, 500, { error: 'Internal server error' });
    }
  },

  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse(res, 400, { errors: errors.array() });
      }

      const { username, password, role, district } = req.body;

      // ກວດສອບວ່າມີຜູ້ໃຊ້ນີ້ແລ້ວບໍ່
      const { rows } = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
      );

      if (rows.length > 0) {
        return apiResponse(res, 400, { error: 'Username already exists' });
      }

      // ເຂົ້າລະຫັດຜ່ານ
      const hashedPassword = await hashPassword(password);

      // ບັນທຶກຜູ້ໃຊ້ໃໝ່
      const newUser = await db.query(
        'INSERT INTO users (username, password, role, district) VALUES ($1, $2, $3, $4) RETURNING id, username, role, district',
        [username, hashedPassword, role, district]
      );

      apiResponse(res, 201, newUser.rows[0]);
    } catch (err) {
      console.error(err);
      apiResponse(res, 500, { error: 'Internal server error' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { rows } = await db.query(
        'SELECT id, username, role, district FROM users WHERE id = $1',
        [req.user.id]
      );

      if (rows.length === 0) {
        return apiResponse(res, 404, { error: 'User not found' });
      }

      apiResponse(res, 200, rows[0]);
    } catch (err) {
      console.error(err);
      apiResponse(res, 500, { error: 'Internal server error' });
    }
  }
};