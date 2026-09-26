#### \# STOCKSENSE PRESENTATION GUIDE

#### 

#### \## VIDEO TARGET

#### 

#### Target:

#### 5-6 minutes

#### 

#### Only demonstrate working functionality.

#### 

#### \---

#### 

#### \# 1. INTRODUCTION

#### 

#### "Good morning. We are presenting StockSense, a modular Inventory Management System designed for inventory managers and warehouse staff."

#### 

#### \---

#### 

#### \# 2. PROBLEM

#### 

#### "Inventory is often managed through manual registers, spreadsheets and scattered records. This makes it difficult to maintain real-time stock visibility and track inventory movements."

#### 

#### \---

#### 

#### \# 3. SOLUTION

#### 

#### "StockSense centralizes products, stock, receipts, deliveries, internal transfers, adjustments and movement history in one system."

#### 

#### \---

#### 

#### \# 4. DEMO

#### 

#### \## Step 1

#### 

#### Login.

#### 

#### \## Step 2

#### 

#### Open Dashboard.

#### 

#### Show:

#### 

#### \- Total stock

#### \- Low stock

#### \- Pending receipts

#### \- Pending deliveries

#### \- Transfers

#### 

#### \## Step 3

#### 

#### Open Products.

#### 

#### Create/select product.

#### 

#### \## Step 4

#### 

#### Create Receipt.

#### 

#### Receive:

#### 

#### 100 units

#### 

#### Validate.

#### 

#### Show:

#### 

#### Stock = 100

#### 

#### \## Step 5

#### 

#### Create Internal Transfer.

#### 

#### Move stock:

#### 

#### Warehouse

#### →

#### Production Rack

#### 

#### Show location change.

#### 

#### \## Step 6

#### 

#### Create Delivery.

#### 

#### Deliver:

#### 

#### 20 units

#### 

#### Validate.

#### 

#### Show:

#### 

#### Stock = 80

#### 

#### \## Step 7

#### 

#### Create Adjustment.

#### 

#### Damaged:

#### 

#### 3 units

#### 

#### Show:

#### 

#### Stock = 77

#### 

#### \## Step 8

#### 

#### Open Ledger.

#### 

#### Show:

#### 

#### Receipt

#### Transfer

#### Delivery

#### Adjustment

#### 

#### \---

#### 

#### \# 5. ARCHITECTURE EXPLANATION

#### 

#### "The React frontend communicates with the Node.js and Express backend through REST APIs. The backend contains the inventory business logic and communicates with MySQL. Stock changes are handled by the backend and every movement is recorded in the stock ledger."

#### 

#### \---

#### 

#### \# 6. ADDITIONAL FEATURES

#### 

#### If working:

#### 

#### \- Search

#### \- Filters

#### \- Low-stock alerts

#### \- Multiple warehouses/locations

#### \- Profile

#### 

#### Only demonstrate working features.

#### 

#### \---

#### 

#### \# 7. REVIEW QUESTIONS

#### 

#### \## Why use a backend for stock?

#### 

#### Because the backend provides one authoritative place for inventory calculations.

#### 

#### \## What happens when receiving stock?

#### 

#### The validated receipt increases the product quantity and creates a ledger record.

#### 

#### \## What happens during delivery?

#### 

#### The backend verifies available stock, decreases the quantity and creates a ledger record.

#### 

#### \## What happens during transfer?

#### 

#### The quantity moves from the source location to the destination location while total company stock remains unchanged.

#### 

#### \## What is an adjustment?

#### 

#### It reconciles recorded stock with the physical counted quantity.

#### 

#### \## Why maintain a ledger?

#### 

#### For traceability of inventory movements.

#### 

#### \## How do you prevent invalid delivery?

#### 

#### The backend checks available stock before validating the delivery.

#### 

#### \## How does multi-location inventory work?

#### 

#### Stock is associated with product and location, allowing inventory to be tracked separately by location.

#### 

#### \---

#### 

#### \# 8. FINAL CHECKLIST

#### 

#### \[ ] Login works

#### \[ ] Dashboard works

#### \[ ] Product works

#### \[ ] Receipt works

#### \[ ] Transfer works

#### \[ ] Delivery works

#### \[ ] Adjustment works

#### \[ ] Ledger works

#### \[ ] Search works

#### \[ ] Filters work

#### \[ ] Low-stock works

#### \[ ] Main contains latest code

#### \[ ] Each member has commits

#### \[ ] Repository accessible

#### \[ ] Video accessible

#### \[ ] Demo completed within required duration

#### 

#### \---

#### 

#### \# 9. GOLDEN DEMO NUMBERS

#### 

#### Receipt:

#### +100

#### 

#### Transfer:

#### 0 total change

#### 

#### Delivery:

#### \-20

#### 

#### Adjustment:

#### \-3

#### 

#### Final:

#### 77

#### 

#### \---

#### 

#### \# 10. PRESENTATION RULE

#### 

#### Do not explain features that are not implemented.

#### 

#### Do not open unnecessary files.

#### 

#### Do not demonstrate broken functionality.

#### 

#### Keep the flow simple and continuous.

