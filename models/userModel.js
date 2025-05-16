const db = require('../config/db');
const { hashPassword } = require('../config/auth');

module.exports = {
  /**
   * ຊອກຫາຜູ້ໃຊ້ຕາມ username
   * @param {string} username 
   * @returns {Promise<object>} ຂໍ້ມູນຜູ້ໃຊ້
   */
  findByUsername: async (username) => {
    const { rows } = await db.query(
      'SELECT id, username, password, role, district FROM users WHERE username = $1',
      [username]
    );
    return rows[0];
  },

  /**
   * ສ້າງຜູ້ໃຊ້ໃໝ່
   * @param {object} userData - ຂໍ້ມູນຜູ້ໃຊ້
   * @param {string} userData.username
   * @param {string} userData.password
   * @param {string} userData.role
   * @param {string} userData.district
   * @returns {Promise<object>} ຜູ້ໃຊ້ທີ່ສ້າງໃໝ່
   */
  create: async ({ username, password, role, district }) => {
    const hashedPassword = await hashPassword(password);
    const { rows } = await db.query(
      `INSERT INTO users (username, password, role, district) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, role, district`,
      [username, hashedPassword, role, district]
    );
    return rows[0];
  },

  /**
   * ຊອກຫາຜູ້ໃຊ້ຕາມ ID
   * @param {number} id - ID ຜູ້ໃຊ້
   * @returns {Promise<object>} ຂໍ້ມູນຜູ້ໃຊ້
   */
  findById: async (id) => {
    const { rows } = await db.query(
      'SELECT id, username, role, district FROM users WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  /**
   * ອັບເດດຂໍ້ມູນຜູ້ໃຊ້
   * @param {number} id - ID ຜູ້ໃຊ້
   * @param {object} updateData - ຂໍ້ມູນທີ່ຈະອັບເດດ
   * @returns {Promise<object>} ຜູ້ໃຊ້ທີ່ອັບເດດ
   */
  update: async (id, updateData) => {
    const { password, ...rest } = updateData;
    let query = 'UPDATE users SET ';
    const values = [];
    let paramCount = 1;

    // ຖ້າມີການປ່ຽນລະຫັດຜ່ານ
    if (password) {
      const hashedPassword = await hashPassword(password);
      rest.password = hashedPassword;
    }

    // ສ້າງ query ຕາມຂໍ້ມູນທີ່ຕ້ອງການອັບເດດ
    const setClauses = [];
    for (const [key, value] of Object.entries(rest)) {
      setClauses.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    query += setClauses.join(', ') + ` WHERE id = $${paramCount} RETURNING id, username, role, district`;
    values.push(id);

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  /**
   * ລຶບຜູ້ໃຊ້
   * @param {number} id - ID ຜູ້ໃຊ້
   * @returns {Promise<boolean>} ຜົນລັບການລຶບ
   */
  delete: async (id) => {
    const { rowCount } = await db.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return rowCount > 0;
  },

  /**
   * ຊອກຫາຜູ້ໃຊ້ຕາມເມືອງ
   * @param {string} district - ຊື່ເມືອງ
   * @returns {Promise<array>} ລາຍຊື່ຜູ້ໃຊ້
   */
  findByDistrict: async (district) => {
    const { rows } = await db.query(
      'SELECT id, username, role, district FROM users WHERE district = $1',
      [district]
    );
    return rows;
  }
};