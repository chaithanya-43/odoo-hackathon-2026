USE stocksense;

INSERT INTO warehouses (name, code, address)
VALUES
('Main Warehouse', 'WH-001', 'Main Campus');

INSERT INTO locations (warehouse_id, name, code)
VALUES
(1, 'Main Storage', 'LOC-001'),
(1, 'Production Rack', 'LOC-002');

INSERT INTO categories (name)
VALUES
('Raw Materials'),
('Finished Goods'),
('Packaging');

INSERT INTO products (name, sku, category_id, uom, reorder_level)
VALUES
('Steel Rod', 'SKU-001', 1, 'Kg', 20),
('Aluminium Sheet', 'SKU-002', 1, 'Kg', 15),
('Cardboard Box', 'SKU-003', 3, 'Units', 50);

INSERT INTO stock (product_id, location_id, quantity)
VALUES
(1, 1, 15),
(2, 1, 30),
(3, 1, 100);
