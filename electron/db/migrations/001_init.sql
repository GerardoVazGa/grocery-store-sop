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

INSERT OR IGNORE INTO brands (name, category_id)
SELECT 'Coca-Cola', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Pepsi', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Sprite', id FROM categories WHERE name = 'Refrescos'
UNION ALL SELECT 'Corona', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Tecate', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Victoria', id FROM categories WHERE name = 'Cerveza'
UNION ALL SELECT 'Marlboro', id FROM categories WHERE name = 'Cigarros'
UNION ALL SELECT 'Camel', id FROM categories WHERE name = 'Cigarros'
UNION ALL SELECT 'Pall Mall', id FROM categories WHERE name = 'Cigarros';

CREATE TABLE IF NOT EXISTS cash_cuts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    opened_at TEXT NOT NULL DEFAULT (datetime('now')),
    closed_at TEXT,
    opening_amount REAL NOT NULL DEFAULT 0,
    expected_cash REAL,
    counted_cash REAL,
    difference REAL,
    status TEXT NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total REAL NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cash',
    cash_cut_id INTEGER REFERENCES cash_cuts(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sale_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER NOT NULL REFERENCES sales(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    subtotal REAL NOT NULL
);

INSERT OR IGNORE INTO products (barcode, name, category_id, brand_id, price, cost, stock) VALUES
    ('7501055300131', 'Coca-Cola 600ml', 1, 1, 18, 12, 24),
    ('7501055300148', 'Pepsi 600ml', 1, 2, 17, 11, 20),
    ('7501055300155', 'Sprite 600ml', 1, 3, 17, 11, 18),
    ('7501055300162', 'Corona 355ml', 2, 4, 25, 18, 48),
    ('7501055300179', 'Tecate 355ml', 2, 5, 22, 15, 36),
    ('7501055300186', 'Victoria 355ml', 2, 6, 22, 15, 30),
    ('7501055300193', 'Marlboro Rojo', 3, 7, 75, 60, 30),
    ('7501055300209', 'Camel Azul', 3, 8, 70, 55, 15),
    ('7501055300216', 'Pall Mall Rojo', 3, 9, 65, 50, 20);