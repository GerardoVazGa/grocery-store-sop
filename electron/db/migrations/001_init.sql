CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    UNIQUE(name, category_id)
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    brand_id INTEGER REFERENCES brands(id),
    price REAL NOT NULL,
    cost REAL NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category_id);

INSERT OR IGNORE INTO categories (name) VALUES
    ('Refrescos'), ('Cerveza'), ('Cigarros'), ('Abarrotes'), ('Otros');

INSERT INTO brands (name, category_id)
SELECT 'Coca-Cola', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Pepsi', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Sprite', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Corona', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Tecate', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Victoria', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Marlboro', id FROM categories WHERE name = 'Cigarros'
UNION ALL SELECT 'Camel', id FROM categories WHERE name = 'Cigarros'
UNION ALL SELECT 'Pall Mall', id FROM categories WHERE name = 'Cigarros';