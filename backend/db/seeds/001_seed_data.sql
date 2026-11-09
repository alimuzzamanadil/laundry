-- 001_seed_data.sql
-- Default seed users (Password: Admin@123 / Customer@123 / Staff@123 bcrypt-hashed)
INSERT INTO users (id, name, email, password_hash, phone, role)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'System Admin', 'admin@laundry.com', '$2a$10$wT5a0sT6R/7a6v7zZ7b/Q.12tF7kH3q3tY4nE5pI6eR.G6yG3oV6.', '+1-800-555-0100', 'ADMIN'),
  ('a0000000-0000-0000-0000-000000000002', 'Alex Rider', 'staff@laundry.com', '$2a$10$wT5a0sT6R/7a6v7zZ7b/Q.12tF7kH3q3tY4nE5pI6eR.G6yG3oV6.', '+1-800-555-0101', 'STAFF'),
  ('a0000000-0000-0000-0000-000000000003', 'Jane Doe', 'jane@example.com', '$2a$10$wT5a0sT6R/7a6v7zZ7b/Q.12tF7kH3q3tY4nE5pI6eR.G6yG3oV6.', '+1-800-555-0102', 'CUSTOMER')
ON CONFLICT (email) DO NOTHING;

-- Default laundry services
INSERT INTO services (id, name, description, price_per_unit, unit_type, category)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Wash & Fold', 'Everyday laundry washed, dried, and neatly folded.', 2.50, 'KG', 'WASH'),
  ('b0000000-0000-0000-0000-000000000002', 'Wash & Iron', 'Washed, dried, and crisply steam pressed.', 3.75, 'KG', 'WASH_IRON'),
  ('b0000000-0000-0000-0000-000000000003', 'Dry Cleaning - Suit', 'Professional dry cleaning for 2-piece suits.', 14.00, 'PIECE', 'DRY_CLEAN'),
  ('b0000000-0000-0000-0000-000000000004', 'Dry Cleaning - Dress', 'Delicate dry cleaning for silk, evening, and formal dresses.', 16.50, 'PIECE', 'DRY_CLEAN'),
  ('b0000000-0000-0000-0000-000000000005', 'Steam Ironing Only', 'Expert hand steam ironing on hangers.', 1.25, 'PIECE', 'IRON'),
  ('b0000000-0000-0000-0000-000000000006', 'Bedding & Comforter', 'Deep wash and sanitization for heavy blankets and comforters.', 18.00, 'PIECE', 'SPECIALTY')
ON CONFLICT DO NOTHING;
