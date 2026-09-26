# FRONTEND_GUIDE.md

# Frontend Guide

## Owner

Member 2

Branch:
feature/frontend

## Mission

Build the user interface for the StockSense inventory system.

## Pages

### Authentication
- Login
- Signup
- Password reset/OTP
- Profile
- Logout

### Dashboard
Display:
- Total Products in Stock
- Low/Out of Stock
- Pending Receipts
- Pending Deliveries
- Internal Transfers Scheduled

### Products
- Product list
- Create product
- Edit product
- SKU
- Category
- Unit of Measure
- Stock/location information

### Operations

Receipts:
- Create receipt
- Supplier
- Products
- Quantities
- Validate

Deliveries:
- Pick
- Pack
- Validate

Internal Transfers:
- Source location
- Destination location
- Quantity
- Validate

Adjustments:
- Product
- Location
- Counted quantity
- Submit adjustment

### Ledger

Show:
- Movement type
- Product
- Quantity
- Source/destination where applicable
- Date/time
- Reference/status

## Navigation

Products
Operations
  - Receipts
  - Delivery Orders
  - Inventory Adjustment
  - Move History
Dashboard
Settings/Warehouse
Profile
Logout

## API Rule

Frontend must communicate only through backend APIs.

Never directly connect to the database.

Never directly modify stock.

## UI Priority

Priority order:

1. Functional
2. Clear
3. Easy to demonstrate
4. Good visual appearance

Do not spend hackathon time on advanced animations.

## Golden Demo UI

Make sure this flow is easy:

Login
→ Dashboard
→ Product
→ Receipt
→ Transfer
→ Delivery
→ Adjustment
→ Ledger

## Search and Filters

Support where practical:
- Document type
- Status
- Warehouse/location
- Product category
- SKU/product search

## AI Instructions

Do not change:
- API contract
- backend architecture
- database architecture

If an API is missing, ask the Team Leader rather than inventing a new architecture.

## Definition of Done

Every important screen:
- loads
- displays real data
- sends correct API requests
- handles errors
- can be demonstrated
