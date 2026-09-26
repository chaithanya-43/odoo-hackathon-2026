# FRONTEND GUIDE

## OWNER

Member 2

Branch:
feature/frontend

---

# 1. MISSION

Build the complete StockSense user interface using:

- React
- Vite
- JavaScript
- CSS
- Fetch API

The frontend communicates ONLY with the Node.js + Express backend.

The frontend NEVER connects directly to MySQL.

The frontend NEVER calculates or directly modifies authoritative stock.

---

# 2. FRONTEND STRUCTURE

frontend/

├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── DataTable.jsx
│   │   └── Modal.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductForm.jsx
│   │   ├── Receipts.jsx
│   │   ├── Deliveries.jsx
│   │   ├── Transfers.jsx
│   │   ├── Adjustments.jsx
│   │   ├── Ledger.jsx
│   │   └── Profile.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js

---

# 3. APPLICATION FLOW

Login
  ↓
Dashboard
  ↓
Products
  ↓
Operations
  ├── Receipts
  ├── Deliveries
  ├── Internal Transfers
  └── Adjustments
  ↓
Stock Ledger

Additional:
Profile
Logout

---

# 4. LOGIN PAGE

File:

src/pages/Login.jsx

Fields:

- Email
- Password

Action:

Login

API:

POST /api/auth/login

Successful login:

1. Receive JWT.
2. Store authentication state.
3. Redirect to Dashboard.

Failed login:

Display backend error message.

---

# 5. SIGNUP PAGE

File:

src/pages/Signup.jsx

Fields:

- Name
- Email
- Password

API:

POST /api/auth/signup

After successful signup:

Redirect to Login.

---

# 6. DASHBOARD

File:

src/pages/Dashboard.jsx

Display these KPI cards:

1. Total Products in Stock
2. Low/Out of Stock
3. Pending Receipts
4. Pending Deliveries
5. Internal Transfers Scheduled

API:

GET /api/dashboard

The frontend displays backend values.

Do NOT independently calculate conflicting stock values.

---

# 7. PRODUCTS

Files:

src/pages/Products.jsx
src/pages/ProductForm.jsx

Display:

- Product Name
- SKU
- Category
- Unit of Measure
- Stock
- Location
- Reorder Level

Actions:

- Add Product
- Edit Product
- Search Product

APIs:

GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id

---

# 8. PRODUCT FORM

Fields:

- Name
- SKU
- Category
- Unit of Measure
- Initial Stock
- Reorder Level

Validation:

- Required name
- Required SKU
- Valid quantity
- Valid category

Submit to backend.

Do not directly update stock from the frontend.

---

# 9. RECEIPTS

File:

src/pages/Receipts.jsx

Create Receipt fields:

- Supplier
- Product
- Quantity
- Location

API:

POST /api/receipts

Validation:

POST /api/receipts/:id/validate

Expected behavior:

Receipt validation causes backend to increase stock.

Example:

100 received

Stock:

100

The frontend should refresh the product/dashboard data after successful validation.

---

# 10. DELIVERIES

File:

src/pages/Deliveries.jsx

Delivery flow:

Create
  ↓
Pick
  ↓
Pack
  ↓
Validate

Fields:

- Product
- Quantity
- Location

APIs:

GET /api/deliveries
POST /api/deliveries
GET /api/deliveries/:id
POST /api/deliveries/:id/validate

If backend returns:

Insufficient stock

Display the error clearly.

The frontend must NOT bypass backend stock validation.

---

# 11. INTERNAL TRANSFERS

File:

src/pages/Transfers.jsx

Fields:

- Product
- Quantity
- Source Location
- Destination Location

API:

POST /api/transfers

Validation:

POST /api/transfers/:id/validate

Expected behavior:

Source:

-100

Destination:

+100

Total company stock:

UNCHANGED

After success, refresh location stock.

---

# 12. INVENTORY ADJUSTMENTS

File:

src/pages/Adjustments.jsx

Fields:

- Product
- Location
- Physical Count
- Reason

API:

POST /api/adjustments

Validation:

POST /api/adjustments/:id/validate

Display:

Current Quantity
Physical Quantity
Difference

The backend determines the final stock.

---

# 13. STOCK LEDGER

File:

src/pages/Ledger.jsx

API:

GET /api/ledger

Display:

- Date
- Product
- Movement Type
- Quantity
- Source
- Destination
- Reference

Movement types:

RECEIPT
DELIVERY
TRANSFER
ADJUSTMENT

The ledger should clearly show the golden demo operations.

---

# 14. SEARCH

Search products by:

- Product name
- SKU

Example:

GET /api/products?search=steel

Search requests go through:

src/services/api.js

---

# 15. FILTERS

Where applicable support:

- Document Type
- Status
- Warehouse
- Location
- Category

Do not create separate backend endpoints unnecessarily.

Use existing API query parameters where possible.

---

# 16. API SERVICE

All API communication should be centralized.

File:

src/services/api.js

Create reusable functions such as:

login()
signup()
getProfile()

getDashboard()

getProducts()
getProduct()
createProduct()
updateProduct()

getReceipts()
createReceipt()
validateReceipt()

getDeliveries()
createDelivery()
validateDelivery()

getTransfers()
createTransfer()
validateTransfer()

getAdjustments()
createAdjustment()
validateAdjustment()

getLedger()

Do NOT scatter fetch URLs throughout every component.

---

# 17. AUTHENTICATION

Authenticated API requests use:

Authorization: Bearer <JWT>

The frontend should maintain authentication state.

If the user is not authenticated:

Redirect to Login.

If the user logs out:

Clear authentication state
→
Redirect to Login.

---

# 18. NAVIGATION

Main navigation:

Dashboard

Products

Operations
  ├── Receipts
  ├── Delivery Orders
  ├── Internal Transfers
  ├── Inventory Adjustments
  └── Move History / Ledger

Settings / Warehouse

Profile

Logout

---

# 19. UI COMPONENTS

Reusable components may include:

Navbar
Sidebar
StatCard
DataTable
Modal
FormField
LoadingState
ErrorMessage
ConfirmDialog

Do not over-engineer components.

Create reusable components only when they actually reduce duplication.

---

# 20. UI PRIORITY

Priority:

1. Functional
2. Clear
3. Reliable
4. Easy to demonstrate
5. Good appearance

Do NOT spend significant hackathon time on:

- Complex animations
- 3D effects
- Excessive styling
- Unnecessary libraries
- Complex state-management frameworks

---

# 21. ERROR HANDLING

Every important API request should handle:

Loading
Success
Failure

Examples:

"Product created successfully."

"Unable to load products."

"Insufficient stock."

"Invalid quantity."

"Authentication failed."

---

# 22. GOLDEN DEMO

The frontend must support this exact demonstration:

1. Login
2. Dashboard
3. Open Products
4. Create/select product
5. Create Receipt
6. Receive 100 units
7. Validate
8. Show stock = 100
9. Create Internal Transfer
10. Move stock to Production Rack
11. Show location changed
12. Create Delivery
13. Deliver 20 units
14. Show stock = 80
15. Create Adjustment
16. Adjust 3 damaged units
17. Show stock = 77
18. Open Ledger
19. Show all movements

This is the primary frontend acceptance flow.

---

# 23. TEAM BOUNDARY

Member 2 owns the frontend.

Do NOT:

- Modify database directly
- Create database queries
- Implement stock calculation
- Create a second backend
- Change API contracts without coordination
- Change the overall architecture

If an API is missing:

ASK MEMBER 1.

Do not invent a different API.

---

# 24. AI CODING RULE

When using an AI coding assistant, provide:

PROJECT_GUIDE.md
+
FRONTEND_GUIDE.md
+
Exact task

Prompt:

"Read PROJECT_GUIDE.md and FRONTEND_GUIDE.md first.

Follow the existing architecture exactly.

Do not change the technology stack.

Do not change API contracts.

Do not access the database directly.

Do not create duplicate functionality.

Inspect the existing frontend before making changes.

Only modify files related to my assigned task.

Keep the implementation MVP-focused."

---

# 25. TESTING CHECKLIST

[ ] Login works
[ ] Signup works
[ ] Dashboard loads
[ ] Product list loads
[ ] Product creation works
[ ] Product editing works
[ ] Receipt creation works
[ ] Receipt validation works
[ ] Delivery creation works
[ ] Delivery validation works
[ ] Transfer works
[ ] Adjustment works
[ ] Ledger loads
[ ] Search works
[ ] Filters work
[ ] Logout works
[ ] API errors are displayed
[ ] Golden demo works

---

# 26. GIT RULES

Work only on:

feature/frontend

Before starting:

git pull origin main

Commit meaningful work:

feat: add dashboard UI
feat: add product management UI
feat: add receipt screen
feat: add delivery screen
feat: add transfer screen
feat: add ledger screen
fix: handle API error

Push frequently.

The event requires every member to push at least once every hour.

Do not push broken code to main.

---

# 27. DEFINITION OF DONE

Frontend is DONE when:

[ ] React application starts
[ ] Login works
[ ] Dashboard works
[ ] Product management works
[ ] Receipts work
[ ] Deliveries work
[ ] Transfers work
[ ] Adjustments work
[ ] Ledger works
[ ] Search/filter works
[ ] Backend APIs are integrated
[ ] Error handling exists
[ ] Golden demo works
[ ] Changes are committed
[ ] Changes are pushed
