import { query } from '../../config/db.js';

export const authRepository = {
  async findByEmail(email) {
    const res = await query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },

  async findById(id) {
    const res = await query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return res.rows[0];
  },

  async create({ name, email, passwordHash, phone, role = 'CUSTOMER' }) {
    const res = await query(
      `INSERT INTO users (name, email, password_hash, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, phone, role, created_at`,
      [name, email, passwordHash, phone, role]
    );
    return res.rows[0];
  },
};
