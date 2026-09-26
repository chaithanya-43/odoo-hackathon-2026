# DATABASE_GUIDE.md

# Database Guide

## Owner

Member 3

Branch:
feature/database

## Mission

Create the database structure required by StockSense and provide reliable demo data.

## Core Data

The database must support:

- Users
- Products
- Categories
- Warehouses
- Locations
- Stock
- Receipts
- Receipt items
- Deliveries
- Delivery items
- Internal transfers
- Transfer items
- Inventory adjustments
- Stock ledger
- Reordering/low-stock information

## Suggested Relationships

User
→ owns/creates operations

Category
→ Products

Warehouse
→ Locations

Product + Location
→ Stock

Receipt
→ Receipt Items
→ Product

Delivery
→ Delivery Items
→ Product

Transfer
→ Transfer Items
→ Product

Adjustment
→ Product + Location

All stock movements
→ Stock Ledger

## Important Rule

Do not store multiple conflicting sources of truth for stock.

The database structure must allow backend services to determine:

Product
+
Location
+
Current quantity

## Ledger

Each stock-changing operation should record:

- Product
- Movement type
- Quantity
- Source location where applicable
- Destination location where applicable
- Reference document
- Timestamp
- User where applicable

Movement types:

RECEIPT
DELIVERY
TRANSFER
ADJUSTMENT

## Demo Data

Create enough seed data to demonstrate:

- Products
- Categories
- At least one warehouse
- Multiple locations
- Initial stock
- Example low-stock product
- Data usable by dashboard

## Database Safety

Do not delete another member's data.

Do not change tables randomly after backend integration begins.

Any schema change must be communicated to Member 1.

## Integration Order

1. Create schema.
2. Create relationships.
3. Create seed data.
4. Verify database connection.
5. Tell Member 1 exact connection/setup instructions.
6. Test backend queries.
7. Freeze schema as early as possible.

## AI Instructions

AI must follow PROJECT_GUIDE.md.

Do not allow AI to invent a completely different schema.

Do not create duplicate stock tables without approval.

## Definition of Done

Database is done when backend can perform:

Product creation
→ Receipt
→ Transfer
→ Delivery
→ Adjustment
→ Ledger

using real persistent data.
