import { pool, query } from '../../config/db.js';

export const ordersRepository = {
  async createWithItems({ userId, pickupAddress, deliveryAddress, pickupDate, notes, items, totalAmount }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const orderRes = await client.query(
        `INSERT INTO orders (user_id, status, total_amount, pickup_address, delivery_address, pickup_date, notes)
         VALUES ($1, 'PLACED', $2, $3, $4, $5, $6)
         RETURNING *`,
        [userId, totalAmount, pickupAddress, deliveryAddress, pickupDate, notes]
      );
      const order = orderRes.rows[0];

      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, service_id, quantity, unit_price, subtotal)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.service_id, item.quantity, item.unit_price, item.subtotal]
        );
      }

      await client.query(
        `INSERT INTO order_status_history (order_id, status, notes, changed_by)
         VALUES ($1, 'PLACED', 'Order placed by customer', $2)`,
        [order.id, userId]
      );

      await client.query('COMMIT');
      return order;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async findByUserId(userId) {
    const res = await query(
      `SELECT o.*, 
        COUNT(oi.id) as item_count
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return res.rows;
  },

  async findById(orderId) {
    const orderRes = await query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email, u.phone as customer_phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [orderId]
    );
    if (!orderRes.rows[0]) return null;

    const itemsRes = await query(
      `SELECT oi.*, s.name as service_name, s.unit_type
       FROM order_items oi
       JOIN services s ON oi.service_id = s.id
       WHERE oi.order_id = $1`,
      [orderId]
    );

    const historyRes = await query(
      `SELECT h.*, u.name as changed_by_name
       FROM order_status_history h
       LEFT JOIN users u ON h.changed_by = u.id
       WHERE h.order_id = $1
       ORDER BY h.created_at ASC`,
      [orderId]
    );

    return {
      ...orderRes.rows[0],
      items: itemsRes.rows,
      timeline: historyRes.rows,
    };
  },

  async updateStatus(orderId, status, notes, changedBy) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const res = await client.query(
        `UPDATE orders 
         SET status = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *`,
        [status, orderId]
      );

      await client.query(
        `INSERT INTO order_status_history (order_id, status, notes, changed_by)
         VALUES ($1, $2, $3, $4)`,
        [orderId, status, notes || `Status updated to ${status}`, changedBy]
      );

      await client.query('COMMIT');
      return res.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};
