#### \# STOCKSENSE - MASTER PROJECT GUIDE

#### 

#### \## 1. PROJECT OVERVIEW

#### 

#### Project Name: StockSense

#### 

#### Project Type: Modular Inventory Management System (IMS)

#### 

#### Goal:

#### Build a centralized inventory management application for Inventory Managers

#### and Warehouse Staff.

#### 

#### The system replaces manual registers, spreadsheets and scattered inventory

#### tracking with a centralized application.

#### 

#### \---

#### 

#### \# 2. TECHNOLOGY STACK

#### 

#### \## Frontend

#### \- React

#### \- Vite

#### \- JavaScript

#### \- CSS

#### \- Fetch API

#### 

#### \## Backend

#### \- Node.js

#### \- Express.js

#### \- JavaScript

#### \- REST API

#### 

#### \## Database

#### \- MySQL

#### \- mysql2

#### 

#### \## Authentication

#### \- JWT

#### \- bcrypt

#### 

#### \## Validation

#### \- express-validator

#### 

#### \## Version Control

#### \- Git

#### \- GitHub

#### 

#### DO NOT change the stack during the hackathon without Team Leader approval.

#### 

#### \---

#### 

#### \# 3. SYSTEM ARCHITECTURE

#### 

#### &#x20;                   ┌─────────────────────┐

#### &#x20;                   │        USER         │

#### &#x20;                   └──────────┬──────────┘

#### &#x20;                              │

#### &#x20;                              ▼

#### &#x20;                   ┌─────────────────────┐

#### &#x20;                   │   REACT FRONTEND    │

#### &#x20;                   │      + VITE         │

#### &#x20;                   └──────────┬──────────┘

#### &#x20;                              │

#### &#x20;                        REST / JSON

#### &#x20;                              │

#### &#x20;                              ▼

#### &#x20;                   ┌─────────────────────┐

#### &#x20;                   │  EXPRESS BACKEND    │

#### &#x20;                   │      NODE.JS        │

#### &#x20;                   └──────────┬──────────┘

#### &#x20;                              │

#### &#x20;             ┌────────────────┼────────────────┐

#### &#x20;             │                │                │

#### &#x20;             ▼                ▼                ▼

#### &#x20;       Auth Service      Inventory        Dashboard

#### &#x20;                          Services          Service

#### &#x20;             │                │

#### &#x20;             │        ┌───────┼────────┐

#### &#x20;             │        │       │        │

#### &#x20;             │        ▼       ▼        ▼

#### &#x20;             │     Receipt Delivery Transfer

#### &#x20;             │

#### &#x20;             │        ┌───────┴────────┐

#### &#x20;             │        ▼                ▼

#### &#x20;             │   Adjustment          Ledger

#### &#x20;             │

#### &#x20;             └──────────────┬───────────────

#### &#x20;                            ▼

#### &#x20;                   ┌─────────────────────┐

#### &#x20;                   │        MYSQL        │

#### &#x20;                   │      DATABASE       │

#### &#x20;                   └─────────────────────┘

#### 

#### IMPORTANT:

#### 

#### The backend is the authority for inventory calculations.

#### 

#### The frontend NEVER directly accesses MySQL.

#### 

#### The frontend NEVER directly modifies stock.

#### 

#### \---

#### 

#### \# 4. REPOSITORY STRUCTURE

#### 

#### odoo-hackathon-2026/

#### 

#### ├── frontend/

#### │   ├── src/

#### │   │   ├── components/

#### │   │   ├── pages/

#### │   │   ├── services/

#### │   │   ├── utils/

#### │   │   ├── App.jsx

#### │   │   └── main.jsx

#### │   ├── package.json

#### │   └── vite.config.js

#### │

#### ├── backend/

#### │   ├── src/

#### │   │   ├── config/

#### │   │   ├── controllers/

#### │   │   ├── middleware/

#### │   │   ├── routes/

#### │   │   ├── services/

#### │   │   ├── utils/

#### │   │   └── server.js

#### │   ├── package.json

#### │   └── .env

#### │

#### ├── database/

#### │   ├── schema.sql

#### │   ├── seed.sql

#### │   └── README.md

#### │

#### ├── tests/

#### │

#### ├── PROJECT\_GUIDE.md

#### ├── BACKEND\_GUIDE.md

#### ├── FRONTEND\_GUIDE.md

#### ├── DATABASE\_GUIDE.md

#### ├── AUTH\_SUPPORT\_GUIDE.md

#### └── PRESENTATION.md

#### 

#### \---

#### 

#### \# 5. CORE MODULES

#### 

#### \## Authentication

#### 

#### \- Signup

#### \- Login

#### \- Logout

#### \- JWT authentication

#### \- Password hashing

#### \- Profile

#### \- Password reset/OTP

#### 

#### \## Dashboard

#### 

#### Display:

#### 

#### \- Total Products in Stock

#### \- Low/Out of Stock

#### \- Pending Receipts

#### \- Pending Deliveries

#### \- Internal Transfers Scheduled

#### 

#### \## Products

#### 

#### \- Create

#### \- Update

#### \- View

#### \- Search

#### \- Category

#### \- SKU

#### \- Unit of Measure

#### \- Initial stock

#### \- Reorder level

#### 

#### \## Receipts

#### 

#### Flow:

#### 

#### Create Receipt

#### &#x20;   ↓

#### Select Supplier

#### &#x20;   ↓

#### Select Products

#### &#x20;   ↓

#### Enter Quantity

#### &#x20;   ↓

#### Validate

#### &#x20;   ↓

#### Increase Stock

#### &#x20;   ↓

#### Create Ledger Entry

#### 

#### \## Deliveries

#### 

#### Flow:

#### 

#### Create Delivery

#### &#x20;   ↓

#### Pick

#### &#x20;   ↓

#### Pack

#### &#x20;   ↓

#### Validate

#### &#x20;   ↓

#### Decrease Stock

#### &#x20;   ↓

#### Create Ledger Entry

#### 

#### \## Internal Transfers

#### 

#### Flow:

#### 

#### Select Product

#### &#x20;   ↓

#### Source Location

#### &#x20;   ↓

#### Destination Location

#### &#x20;   ↓

#### Quantity

#### &#x20;   ↓

#### Validate

#### &#x20;   ↓

#### Move Stock

#### &#x20;   ↓

#### Create Ledger Entry

#### 

#### Total company stock remains unchanged.

#### 

#### \## Adjustments

#### 

#### Flow:

#### 

#### Select Product

#### &#x20;   ↓

#### Select Location

#### &#x20;   ↓

#### Enter Physical Count

#### &#x20;   ↓

#### Calculate Difference

#### &#x20;   ↓

#### Update Stock

#### &#x20;   ↓

#### Create Ledger Entry

#### 

#### \## Ledger

#### 

#### Every stock movement must be recorded.

#### 

#### Movement types:

#### 

#### \- RECEIPT

#### \- DELIVERY

#### \- TRANSFER

#### \- ADJUSTMENT

#### 

#### \---

#### 

#### \# 6. DATABASE ENTITIES

#### 

#### Required entities:

#### 

#### users

#### categories

#### products

#### warehouses

#### locations

#### stock

#### receipts

#### receipt\_items

#### deliveries

#### delivery\_items

#### transfers

#### transfer\_items

#### adjustments

#### stock\_ledger

#### 

#### Relationships must be defined by Member 3 in DATABASE\_GUIDE.md.

#### 

#### \---

#### 

#### \# 7. STOCK RULES

#### 

#### Receipt:

#### 

#### new\_stock = old\_stock + received\_quantity

#### 

#### Delivery:

#### 

#### new\_stock = old\_stock - delivered\_quantity

#### 

#### Transfer:

#### 

#### source\_stock = source\_stock - quantity

#### 

#### destination\_stock = destination\_stock + quantity

#### 

#### Adjustment:

#### 

#### new\_stock = physical\_count

#### 

#### Every stock change creates a ledger record.

#### 

#### \---

#### 

#### \# 8. API STRUCTURE

#### 

#### Base URL:

#### 

#### /api

#### 

#### Authentication:

#### 

#### POST /api/auth/signup

#### POST /api/auth/login

#### GET  /api/auth/profile

#### 

#### Dashboard:

#### 

#### GET /api/dashboard

#### 

#### Products:

#### 

#### GET    /api/products

#### GET    /api/products/:id

#### POST   /api/products

#### PUT    /api/products/:id

#### 

#### Receipts:

#### 

#### GET  /api/receipts

#### POST /api/receipts

#### GET  /api/receipts/:id

#### POST /api/receipts/:id/validate

#### 

#### Deliveries:

#### 

#### GET  /api/deliveries

#### POST /api/deliveries

#### GET  /api/deliveries/:id

#### POST /api/deliveries/:id/validate

#### 

#### Transfers:

#### 

#### GET  /api/transfers

#### POST /api/transfers

#### GET  /api/transfers/:id

#### POST /api/transfers/:id/validate

#### 

#### Adjustments:

#### 

#### GET  /api/adjustments

#### POST /api/adjustments

#### POST /api/adjustments/:id/validate

#### 

#### Ledger:

#### 

#### GET /api/ledger

#### 

#### Search/filter parameters may be added without changing the core endpoint

#### responsibility.

#### 

#### \---

#### 

#### \# 9. API RESPONSE FORMAT

#### 

#### Successful response:

#### 

#### {

#### &#x20; "success": true,

#### &#x20; "message": "Operation successful",

#### &#x20; "data": {}

#### }

#### 

#### Error response:

#### 

#### {

#### &#x20; "success": false,

#### &#x20; "message": "Error description"

#### }

#### 

#### Do not create completely different response structures for different modules.

#### 

#### \---

#### 

#### \# 10. AUTHENTICATION

#### 

#### JWT is used for authenticated requests.

#### 

#### Frontend sends:

#### 

#### Authorization: Bearer <token>

#### 

#### Backend middleware verifies token.

#### 

#### Passwords are hashed with bcrypt.

#### 

#### Passwords must NEVER be stored as plain text.

#### 

#### \---

#### 

#### \# 11. GIT STRATEGY

#### 

#### main

#### │

#### ├── feature/backend-integration

#### ├── feature/frontend

#### ├── feature/database

#### └── feature/auth-support

#### 

#### main = stable integrated version.

#### 

#### Each member works primarily on their assigned branch.

#### 

#### Each member must make their own commits.

#### 

#### The event requires members to push at least once every hour.

#### 

#### Commit examples:

#### 

#### feat: add receipt API

#### feat: add dashboard page

#### feat: add inventory schema

#### feat: add authentication

#### fix: correct stock calculation

#### test: add delivery validation

#### 

#### \---

#### 

#### \# 12. INTEGRATION RULE

#### 

#### Before merging:

#### 

#### 1\. Pull latest main.

#### 2\. Resolve conflicts locally.

#### 3\. Test your feature.

#### 4\. Commit.

#### 5\. Push.

#### 6\. Team Leader integrates.

#### 7\. Test main again.

#### 

#### If main breaks:

#### 

#### STOP adding new features.

#### 

#### Fix main first.

#### 

#### \---

#### 

#### \# 13. TEAM OWNERSHIP

#### 

#### Member 1:

#### Backend + Integration

#### 

#### Member 2:

#### Frontend

#### 

#### Member 3:

#### Database

#### 

#### Member 4:

#### Authentication + Supporting Features

#### 

#### No member should independently redesign another member's module.

#### 

#### \---

#### 

#### \# 14. GOLDEN DEMO

#### 

#### The application must support:

#### 

#### Login

#### ↓

#### Dashboard

#### ↓

#### Create Product

#### ↓

#### Receive 100 units

#### ↓

#### Stock = 100

#### ↓

#### Transfer to Production Rack

#### ↓

#### Location changes

#### ↓

#### Deliver 20

#### ↓

#### Stock = 80

#### ↓

#### Adjust 3 damaged

#### ↓

#### Stock = 77

#### ↓

#### Open Ledger

#### ↓

#### Show all movements

#### 

#### This is the primary acceptance flow.

#### 

#### \---

#### 

#### \# 15. DEVELOPMENT PRIORITY

#### 

#### Priority 1:

#### Authentication

#### 

#### Priority 2:

#### Products

#### 

#### Priority 3:

#### Stock

#### 

#### Priority 4:

#### Receipt

#### 

#### Priority 5:

#### Delivery

#### 

#### Priority 6:

#### Transfer

#### 

#### Priority 7:

#### Adjustment

#### 

#### Priority 8:

#### Ledger

#### 

#### Priority 9:

#### Dashboard

#### 

#### Priority 10:

#### Search / Filters / Low-stock

#### 

#### Do not build advanced features before the golden demo works.

#### 

#### \---

#### 

#### \# 16. AI DEVELOPMENT RULE

#### 

#### AI is a coding assistant, NOT the project architect.

#### 

#### Every AI tool must receive:

#### 

#### 1\. PROJECT\_GUIDE.md

#### 2\. Relevant member guide

#### 3\. Exact assigned task

#### 

#### AI must:

#### 

#### \- inspect existing files

#### \- follow existing architecture

#### \- follow existing API contracts

#### \- follow existing database contracts

#### \- avoid duplicate functionality

#### \- avoid changing technologies

#### \- avoid unnecessary dependencies

#### 

#### AI must NOT redesign the project.

#### 

#### If AI suggests an architectural change:

#### DO NOT implement it automatically.

#### 

#### Ask Team Leader first.

#### 

#### \---

#### 

#### \# 17. DEFINITION OF DONE

#### 

#### A feature is DONE only when:

#### 

#### \[ ] Code exists

#### \[ ] Code runs

#### \[ ] Database integration works

#### \[ ] API works where applicable

#### \[ ] Validation exists

#### \[ ] Error handling exists

#### \[ ] Frontend integration works where applicable

#### \[ ] Feature is tested

#### \[ ] Git commit exists

#### \[ ] Code is pushed

#### \[ ] Feature can be demonstrated

#### 

#### \---

#### 

#### \# 18. FINAL FREEZE

#### 

#### At final freeze:

#### 

#### NO new architecture.

#### 

#### NO new frameworks.

#### 

#### NO major new features.

#### 

#### NO database redesign.

#### 

#### NO API redesign.

#### 

#### Only:

#### 

#### \- Bug fixes

#### \- Integration

#### \- Testing

#### \- Demo preparation

#### 

#### Working system > additional features.

