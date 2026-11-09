-- 002_create_services.sql
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    description TEXT,
    price_per_unit NUMERIC(10, 2) NOT NULL CHECK (price_per_unit >= 0),
    unit_type VARCHAR(30) NOT NULL DEFAULT 'KG' CHECK (unit_type IN ('KG', 'PIECE', 'PAIR', 'ITEM')),
    category VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
