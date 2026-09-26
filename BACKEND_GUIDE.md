# BACKEND_GUIDE.md

# Backend + Integration Guide

## Owner

Member 1 - Team Leader

Branch:
feature/backend-integration

## Mission

Build the backend that controls all inventory operations and integrate frontend, backend and database.

## Responsibilities

1. Backend project structure
2. REST APIs
3. Business logic
4. Product APIs
5. Dashboard APIs
6. Receipt APIs
7. Delivery APIs
8. Transfer APIs
9. Adjustment APIs
10. Ledger APIs
11. Stock calculations
12. Validation
13. Error handling
14. Frontend integration
15. Final integration

## Critical Rule

Backend is the authority for stock.

Frontend must never directly modify stock.

## Stock Logic

Receipt:
increase stock.

Delivery:
decrease stock.

Transfer:
move quantity between locations.

Adjustment:
set stock according to physical count and record the difference.

Every stock movement creates a ledger record.

## Required API Areas

/auth
/products
/dashboard
/receipts
/deliveries
/transfers
/adjustments
/ledger

## Integration Order

1. Connect backend to database.
2. Verify product creation.
3. Verify receipt.
4. Verify stock increase.
5. Verify transfer.
6. Verify location change.
7. Verify delivery.
8. Verify stock decrease.
9. Verify adjustment.
10. Verify ledger.
11. Connect frontend.
12. Run golden demo.

## Allowed Changes

Primary backend files and integration files.

Do not modify frontend design unnecessarily.

Do not redesign database independently.

## Testing

Test at minimum:

- Valid receipt
- Invalid quantity
- Delivery greater than available stock
- Transfer between locations
- Adjustment
- Ledger creation
- Dashboard calculations

## AI Instructions

AI must follow PROJECT_GUIDE.md.

AI must not:
- redesign backend
- create duplicate APIs
- change database schema without coordination
- add unnecessary frameworks

## Definition of Done

Backend is done when the complete golden demo works through real APIs and real database data.
