# PROJECT_GUIDE.md

# StockSense - Master Project Guide

## 1. Project

StockSense is a modular Inventory Management System (IMS).

Goal:
Build a centralized, easy-to-use inventory system that replaces manual registers, Excel sheets and scattered inventory tracking.

Target users:
- Inventory Managers
- Warehouse Staff

## 2. Core Architecture

User
  ↓
Frontend
  ↓ REST API
Backend
  ↓
Inventory Services
  ├── Product Service
  ├── Receipt Service
  ├── Delivery Service
  ├── Transfer Service
  ├── Adjustment Service
  ├── Stock/Ledger Service
  └── Dashboard Service
  ↓
Database
  ↓
Stock Ledger

Authentication is handled through the backend.

The backend is the ONLY authority for stock calculations.

Frontend must NEVER directly modify stock values.

## 3. MVP Features

### Authentication
- Signup
- Login
- Logout
- Profile
- OTP/password reset flow

### Dashboard
Show:
- Total Products in Stock
- Low/Out of Stock
- Pending Receipts
- Pending Deliveries
- Internal Transfers Scheduled

### Products
- Create product
- Update product
- SKU/code
- Category
- Unit of Measure
- Initial stock
- Stock by location
- Reordering rule

### Receipts
Create receipt:
- Supplier
- Products
- Quantities
- Validate receipt

Validation increases stock.

Example:
Receive 50 units → stock increases by 50.

### Delivery Orders
Flow:
Pick → Pack → Validate

Validation decreases stock.

Example:
Deliver 10 units → stock decreases by 10.

### Internal Transfers
Move stock between company locations.

Example:
Warehouse → Production Rack

Total company stock remains unchanged.
Location stock changes.

Every transfer must be logged.

### Inventory Adjustments
- Select product
- Select location
- Enter physical counted quantity
- Calculate difference
- Update stock
- Record adjustment in ledger

### Stock Ledger
Record every stock movement:
- Receipt
- Delivery
- Transfer
- Adjustment

### Additional Features
- Low-stock alerts
- Multi-warehouse support
- SKU search
- Smart filters

## 4. Golden Demo

The complete demonstration should follow:

1. Login
2. Open Dashboard
3. Create Product
4. Receive 100 units
5. Verify stock = 100
6. Transfer stock to Production Rack
7. Verify location changed
8. Deliver 20 units
9. Verify remaining stock = 80
10. Adjust 3 damaged units
11. Verify remaining stock = 77
12. Open Stock Ledger
13. Show all movements

This mirrors the example flow in the problem statement.

## 5. Team Structure

### Member 1 - Backend + Integration
Branch:
feature/backend-integration

Responsible for:
- Backend structure
- REST APIs
- Business logic
- Inventory calculations
- Receipts
- Deliveries
- Transfers
- Adjustments
- Stock ledger
- Dashboard APIs
- Frontend/backend integration
- Final integration

### Member 2 - Frontend
Branch:
feature/frontend

Responsible for:
- Login UI
- Dashboard UI
- Products UI
- Receipts UI
- Delivery UI
- Transfer UI
- Adjustment UI
- Ledger UI
- Search/filter UI
- Profile/logout UI
- API integration

### Member 3 - Database
Branch:
feature/database

Responsible for:
- Database schema
- Tables
- Relationships
- Product/category data
- Warehouse/location data
- Stock data
- Receipt data
- Delivery data
- Transfer data
- Adjustment data
- Ledger data
- Seed/demo data

### Member 4 - Auth + Supporting Features
Branch:
feature/auth-support

Responsible for:
- Signup
- Login
- Logout
- Profile
- Password reset/OTP flow
- Low-stock alerts
- Search/filter support
- Validation
- Supporting tests

## 6. Git Rules

main = integrated/stable branch.

Do NOT randomly code directly on main.

Branches:
- feature/backend-integration
- feature/frontend
- feature/database
- feature/auth-support

Each member must:
1. Work only in assigned branch.
2. Commit their own work.
3. Push frequently.
4. Push at least once every hour as required by the event.
5. Pull/rebase or merge latest main before integration when instructed.
6. Never overwrite another member's work.
7. Never change another member's module without coordination.

Commit format:

feat: add receipt API
feat: add dashboard UI
feat: add inventory schema
fix: correct stock adjustment
test: add delivery validation

## 7. Architecture Rules

DO NOT:
- Change the framework without Team Leader approval.
- Create duplicate modules.
- Create duplicate APIs.
- Create duplicate database tables.
- Change API contracts independently.
- Change database structure without coordination.
- Add microservices.
- Add unnecessary AI features.
- Add unnecessary libraries.
- Redesign the project because an AI tool suggested another architecture.

The problem does not require AI.

AI may be used as a coding assistant, but the architecture is fixed by this document.

## 8. API Rule

Frontend communicates with backend through REST APIs.

Example:

POST /api/auth/login
POST /api/auth/signup
GET  /api/dashboard
GET  /api/products
POST /api/products
PUT  /api/products/:id

POST /api/receipts
POST /api/receipts/:id/validate

POST /api/deliveries
POST /api/deliveries/:id/validate

POST /api/transfers
POST /api/transfers/:id/validate

POST /api/adjustments
GET  /api/ledger

Exact implementation may vary, but endpoint responsibility must remain consistent.

## 9. Stock Rules

Receipt:
stock = stock + received_quantity

Delivery:
stock = stock - delivered_quantity

Adjustment:
stock = counted_quantity

Transfer:
source_location_stock -= quantity
destination_location_stock += quantity

Company total stock does not change during an internal transfer.

Every stock-changing operation must create a ledger entry.

## 10. Database Authority

Database is the persistent source of inventory state.

Backend validates all operations before changing stock.

Do not calculate final stock only in frontend.

## 11. Integration Rule

Golden path must work before extra features:

Login
→ Dashboard
→ Product
→ Receipt
→ Transfer
→ Delivery
→ Adjustment
→ Ledger

If integration breaks:
STOP new features.
Fix integration first.

## 12. Definition of Done

A feature is complete only when:

- Code works
- API works
- Database interaction works
- Validation exists
- Error handling exists
- Frontend can use it when applicable
- Changes are committed
- Changes are pushed
- Feature can be demonstrated

## 13. AI Coding Rule

Every member may use any AI coding assistant.

Before asking AI to code, provide:
- PROJECT_GUIDE.md
- Their dedicated GUIDE
- Their exact task

Prompt:

"Read PROJECT_GUIDE.md and my assigned GUIDE first.
Follow the existing architecture exactly.
Do not redesign the architecture.
Do not change API contracts.
Do not change database contracts.
Do not create duplicate functionality.
Inspect existing files before modifying them.
Only modify files allowed by my assigned task.
Explain dependencies before implementation.
Keep the implementation MVP-focused."

## 14. Time Strategy

10:00 - 11:00
Foundation + skeleton

11:00 - 12:00
Core features

12:00 - 1:00
Operations

1:00 - 2:00
Integration

2:00 - 2:30
Testing

2:30 - 3:00
Bug fixing

3:00 - 3:30
Final integration + freeze

No major new feature after final freeze.

## 15. Kill List

Do NOT waste hackathon time on:
- Complex AI
- Microservices
- Advanced analytics
- Fancy animations
- Complex notification infrastructure
- Over-engineering
- Unnecessary authentication complexity
- Features outside the problem statement

Working MVP > extra features.

## 16. Final Acceptance

Before submission verify:

[ ] Login works
[ ] Dashboard works
[ ] Product creation works
[ ] Receipt increases stock
[ ] Transfer changes location
[ ] Delivery decreases stock
[ ] Adjustment changes stock
[ ] Ledger records movements
[ ] Search/filter works
[ ] Low-stock information works
[ ] Main contains latest working code
[ ] All members have individual commits
[ ] Repository is accessible
[ ] Demo flow works from beginning to end
