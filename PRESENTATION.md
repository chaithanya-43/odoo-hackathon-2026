# PRESENTATION.md

# StockSense - Final Presentation & Demo Guide

## Video Requirement

The event email specifies an open-access solution video covering the functional flow, with a maximum duration of approximately 5-6 minutes.

Keep the demonstration focused on working functionality.

## Presentation Structure

### 0:00 - 0:30
Introduction

Say:

"Good morning. We are presenting StockSense, a modular Inventory Management System designed to centralize inventory operations for inventory managers and warehouse staff."

## 0:30 - 1:00
Problem

Explain:

"Inventory is often tracked using manual registers, Excel sheets and scattered records. This makes stock visibility and movement tracking difficult."

## 1:00 - 1:30
Solution

Explain:

"StockSense centralizes products, stock, receipts, deliveries, internal transfers, adjustments and the stock ledger in one system."

## 1:30 - 4:30
Functional Demo

Follow exactly:

1. Login
2. Dashboard
3. Create/open product
4. Receive 100 units
5. Show stock = 100
6. Transfer stock to another location
7. Show location change
8. Deliver 20 units
9. Show stock = 80
10. Adjust 3 damaged units
11. Show stock = 77
12. Open ledger
13. Show receipt, transfer, delivery and adjustment history

## 4:30 - 5:00
Additional Features

Show:
- Low-stock alerts
- Search
- Filters
- Multi-location/warehouse support
- Profile

Only demonstrate features that actually work.

## 5:00 - 5:30
Architecture

Explain:

"The frontend communicates with the backend through REST APIs. The backend contains the inventory business logic and communicates with the database. All stock movements are recorded in the stock ledger."

## 5:30 - 6:00
Closing

Say:

"StockSense provides a centralized workflow for tracking inventory from receipt to delivery, while maintaining location-level stock and a complete movement history."

## Demo Rules

DO:
- Use prepared demo data.
- Follow one clean flow.
- Keep screens ready.
- Explain only working features.
- Keep the video within the required duration.

DO NOT:
- Demonstrate broken features.
- Start coding during the video.
- Explain unnecessary implementation details.
- Spend time on features outside the problem statement.

## Reviewer Questions

### Why is backend responsible for stock?
Because stock must remain consistent regardless of which frontend screen performs an operation.

### What happens when stock is received?
The receipt is validated and the backend increases stock and records the movement.

### What happens during a transfer?
Stock decreases at the source location and increases at the destination location. Total company stock remains unchanged.

### What happens during delivery?
Validated delivery decreases available stock and creates a ledger entry.

### What is an adjustment?
An adjustment reconciles recorded stock with the physical counted quantity and records the change.

### Why maintain a ledger?
It provides traceability for inventory movements.

### How does the dashboard get its values?
The backend calculates dashboard information from the stored inventory and operation data.

### How does the system support multiple warehouses?
Stock is associated with warehouse/location information so inventory can be viewed and moved by location.

### What happens if someone tries to deliver more stock than available?
The backend validates available stock and should reject invalid operations.

## Final Checklist

[ ] Login works
[ ] Dashboard works
[ ] Product works
[ ] Receipt works
[ ] Transfer works
[ ] Delivery works
[ ] Adjustment works
[ ] Ledger works
[ ] Search works
[ ] Filters work
[ ] Low-stock information works
[ ] Repository is public/accessibly shared as required
[ ] Latest working code is in main
[ ] Every member has own commits
[ ] Video link is accessible
[ ] Video follows required duration
