import { query } from '../../config/db.js';

export const deliveryRepository = {
  async assign({ orderId, staffId, taskType, notes }) {
    const res = await query(
      `INSERT INTO delivery_assignments (order_id, staff_id, task_type, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [orderId, staffId, taskType, notes]
    );
    return res.rows[0];
  },

  async findByStaffId(staffId) {
    const res = await query(
      `SELECT da.*, o.pickup_address, o.delivery_address, o.status as order_status, u.name as customer_name, u.phone as customer_phone
       FROM delivery_assignments da
       JOIN orders o ON da.order_id = o.id
       JOIN users u ON o.user_id = u.id
       WHERE da.staff_id = $1
       ORDER BY da.created_at DESC`,
      [staffId]
    );
    return res.rows;
  },

  async updateStatus(assignmentId, status, notes) {
    const res = await query(
      `UPDATE delivery_assignments
       SET status = $1, notes = COALESCE($2, notes), updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, notes, assignmentId]
    );
    return res.rows[0];
  },
};
