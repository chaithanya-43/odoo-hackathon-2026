#### \# BACKEND GUIDE

#### 

#### \## OWNER

#### 

#### Member 1 - Team Leader

#### 

#### Branch:

#### feature/backend-integration

#### 

#### \---

#### 

#### \# 1. RESPONSIBILITY

#### 

#### Build and integrate the Node.js + Express backend.

#### 

#### The backend is the central authority for:

#### 

#### \- Authentication APIs

#### \- Product APIs

#### \- Dashboard APIs

#### \- Receipt processing

#### \- Delivery processing

#### \- Transfer processing

#### \- Adjustment processing

#### \- Stock calculations

#### \- Ledger creation

#### \- Frontend integration

#### 

#### \---

#### 

#### \# 2. BACKEND STRUCTURE

#### 

#### backend/

#### 

#### ├── src/

#### │   ├── config/

#### │   │   └── db.js

#### │   │

#### │   ├── controllers/

#### │   │   ├── authController.js

#### │   │   ├── productController.js

#### │   │   ├── dashboardController.js

#### │   │   ├── receiptController.js

#### │   │   ├── deliveryController.js

#### │   │   ├── transferController.js

#### │   │   ├── adjustmentController.js

#### │   │   └── ledgerController.js

#### │   │

#### │   ├── middleware/

#### │   │   ├── authMiddleware.js

#### │   │   └── errorMiddleware.js

#### │   │

#### │   ├── routes/

#### │   │   ├── authRoutes.js

#### │   │   ├── productRoutes.js

#### │   │   ├── dashboardRoutes.js

#### │   │   ├── receiptRoutes.js

#### │   │   ├── deliveryRoutes.js

#### │   │   ├── transferRoutes.js

#### │   │   ├── adjustmentRoutes.js

#### │   │   └── ledgerRoutes.js

#### │   │

#### │   ├── services/

#### │   │   ├── stockService.js

#### │   │   ├── receiptService.js

#### │   │   ├── deliveryService.js

#### │   │   ├── transferService.js

#### │   │   ├── adjustmentService.js

#### │   │   └── dashboardService.js

#### │   │

#### │   ├── utils/

#### │   │

#### │   └── server.js

#### │

#### ├── package.json

#### └── .env

#### 

#### \---

#### 

#### \# 3. CORE RULE

#### 

#### Controllers receive requests.

#### 

#### Services contain business logic.

#### 

#### Database queries access MySQL.

#### 

#### Stock calculations belong in services.

#### 

#### Do NOT put complex stock calculations directly inside routes.

#### 

#### \---

#### 

#### \# 4. STOCK SERVICE

#### 

#### stockService.js is the central stock authority.

#### 

#### Responsibilities:

#### 

#### \- get stock

#### \- increase stock

#### \- decrease stock

#### \- transfer stock

#### \- adjust stock

#### \- create ledger entry

#### 

#### Concept:

#### 

#### receipt:

#### increaseStock()

#### 

#### delivery:

#### decreaseStock()

#### 

#### transfer:

#### moveStock()

#### 

#### adjustment:

#### adjustStock()

#### 

#### \---

#### 

#### \# 5. RECEIPT FLOW

#### 

#### POST /api/receipts

#### 

#### Create receipt.

#### 

#### POST /api/receipts/:id/validate

#### 

#### Validation must:

#### 

#### 1\. Confirm receipt exists.

#### 2\. Confirm items exist.

#### 3\. Validate quantities.

#### 4\. Increase stock.

#### 5\. Mark receipt Done.

#### 6\. Create ledger entries.

#### 

#### \---

#### 

#### \# 6. DELIVERY FLOW

#### 

#### Create delivery.

#### 

#### Validation must:

#### 

#### 1\. Confirm delivery exists.

#### 2\. Check available stock.

#### 3\. Reject insufficient stock.

#### 4\. Decrease stock.

#### 5\. Mark delivery Done.

#### 6\. Create ledger entry.

#### 

#### \---

#### 

#### \# 7. TRANSFER FLOW

#### 

#### Validation must:

#### 

#### 1\. Verify source location.

#### 2\. Verify destination location.

#### 3\. Verify available source stock.

#### 4\. Decrease source stock.

#### 5\. Increase destination stock.

#### 6\. Create ledger entry.

#### 

#### Company total stock must remain unchanged.

#### 

#### \---

#### 

#### \# 8. ADJUSTMENT FLOW

#### 

#### Validation must:

#### 

#### 1\. Get current stock.

#### 2\. Receive physical count.

#### 3\. Calculate difference.

#### 4\. Set stock to physical count.

#### 5\. Create ledger entry.

#### 6\. Mark adjustment complete.

#### 

#### \---

#### 

#### \# 9. DASHBOARD

#### 

#### GET /api/dashboard

#### 

#### Return:

#### 

#### \- total stock

#### \- low/out of stock count

#### \- pending receipts

#### \- pending deliveries

#### \- scheduled transfers

#### 

#### Keep calculations on backend.

#### 

#### \---

#### 

#### \# 10. ERROR HANDLING

#### 

#### Return consistent JSON:

#### 

#### {

#### &#x20; "success": false,

#### &#x20; "message": "Insufficient stock"

#### }

#### 

#### HTTP status codes should be meaningful.

#### 

#### Examples:

#### 

#### 400 = invalid input

#### 401 = unauthenticated

#### 403 = unauthorized

#### 404 = not found

#### 500 = server error

#### 

#### \---

#### 

#### \# 11. ENVIRONMENT

#### 

#### Use .env.

#### 

#### Example:

#### 

#### PORT=5000

#### DB\_HOST=localhost

#### DB\_PORT=3306

#### DB\_USER=root

#### DB\_PASSWORD=

#### DB\_NAME=stocksense

#### JWT\_SECRET=

#### 

#### Never commit real secrets.

#### 

#### \---

#### 

#### \# 12. TEST ORDER

#### 

#### Test in this order:

#### 

#### 1\. Server starts

#### 2\. Database connects

#### 3\. Login

#### 4\. Product creation

#### 5\. Receipt

#### 6\. Stock increase

#### 7\. Transfer

#### 8\. Location change

#### 9\. Delivery

#### 10\. Stock decrease

#### 11\. Adjustment

#### 12\. Ledger

#### 13\. Dashboard

#### 

#### \---

#### 

#### \# 13. DO NOT

#### 

#### Do not:

#### 

#### \- access database from frontend

#### \- create duplicate inventory logic

#### \- change database schema independently

#### \- introduce another backend framework

#### \- introduce microservices

#### \- add AI to stock calculations

#### \- redesign API contracts without Team Leader approval

#### 

#### \---

#### 

#### \# 14. DONE

#### 

#### Backend is complete when the golden demo works entirely through real APIs.

