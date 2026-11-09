import { query } from '../../config/db.js';

export const catalogRepository = {
  async getAll(activeOnly = true) {
    const sql = activeOnly
      ? 'SELECT * FROM services WHERE is_active = true ORDER BY name ASC'
      : 'SELECT * FROM services ORDER BY created_at DESC';
    const res = await query(sql);
    return res.rows;
  },

  async getById(id) {
    const res = await query('SELECT * FROM services WHERE id = $1', [id]);
    return res.rows[0];
  },

  async create(data) {
    const { name, description, price_per_unit, unit_type, category, is_active } = data;
    const res = await query(
      `INSERT INTO services (name, description, price_per_unit, unit_type, category, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price_per_unit, unit_type, category, is_active]
    );
    return res.rows[0];
  },

  async update(id, data) {
    const { name, description, price_per_unit, unit_type, category, is_active } = data;
    const res = await query(
      `UPDATE services 
       SET name = $1, description = $2, price_per_unit = $3, unit_type = $4, category = $5, is_active = $6
       WHERE id = $7
       RETURNING *`,
      [name, description, price_per_unit, unit_type, category, is_active, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await query('UPDATE services SET is_active = false WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
  },
};
