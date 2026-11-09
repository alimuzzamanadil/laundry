import { query } from '../../config/db.js';
import { ordersRepository } from '../orders/orders.repository.js';

export const adminService = {
  async getDashboardStats() {
    const revenueRes = await query(
      "SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM orders WHERE status != 'CANCELLED'"
    );
    const activeOrdersRes = await query(
      "SELECT COUNT(*) as active_count FROM orders WHERE status NOT IN ('DELIVERED', 'CANCELLED')"
    );
    const completedOrdersRes = await query(
      "SELECT COUNT(*) as completed_count FROM orders WHERE status = 'DELIVERED'"
    );
    const totalCustomersRes = await query(
      "SELECT COUNT(*) as customer_count FROM users WHERE role = 'CUSTOMER'"
    );
    const statusDistributionRes = await query(
      "SELECT status, COUNT(*) as count FROM orders GROUP BY status"
    );

    return {
      totalRevenue: parseFloat(revenueRes.rows[0].total_revenue),
      activeOrders: parseInt(activeOrdersRes.rows[0].active_count, 10),
      completedOrders: parseInt(completedOrdersRes.rows[0].completed_count, 10),
      totalCustomers: parseInt(totalCustomersRes.rows[0].customer_count, 10),
      statusBreakdown: statusDistributionRes.rows,
    };
  },

  async getAllOrders({ status, search } = {}) {
    let sql = `SELECT o.*, u.name as customer_name, u.email as customer_email, u.phone as customer_phone
               FROM orders o
               JOIN users u ON o.user_id = u.id`;
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`o.status = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(u.name ILIKE $${params.length} OR u.email ILIKE $${params.length} OR o.id::text ILIKE $${params.length})`);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY o.created_at DESC';
    const res = await query(sql, params);
    return res.rows;
  },

  async updateOrderStatus(orderId, status, notes, adminId) {
    return ordersRepository.updateStatus(orderId, status, notes, adminId);
  },

  async getStaffList() {
    const res = await query(
      "SELECT id, name, email, phone FROM users WHERE role = 'STAFF' ORDER BY name ASC"
    );
    return res.rows;
  },
};
