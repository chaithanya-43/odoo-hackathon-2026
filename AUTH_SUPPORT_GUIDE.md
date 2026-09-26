#### \# AUTH + SUPPORT GUIDE

#### 

#### \## OWNER

#### 

#### Member 4

#### 

#### Branch:

#### feature/auth-support

#### 

#### \---

#### 

#### \# 1. RESPONSIBILITY

#### 

#### Implement:

#### 

#### \- Signup

#### \- Login

#### \- Logout

#### \- JWT authentication

#### \- Password hashing

#### \- Profile

#### \- Password reset/OTP support

#### \- Low-stock support

#### \- Search support

#### \- Filter support

#### \- Validation support

#### 

#### \---

#### 

#### \# 2. AUTH ARCHITECTURE

#### 

#### React

#### &#x20;↓

#### POST /api/auth/login

#### &#x20;↓

#### Express

#### &#x20;↓

#### Auth Controller

#### &#x20;↓

#### bcrypt password verification

#### &#x20;↓

#### JWT generation

#### &#x20;↓

#### React receives token

#### 

#### Authenticated request:

#### 

#### React

#### &#x20;↓

#### Authorization: Bearer TOKEN

#### &#x20;↓

#### authMiddleware

#### &#x20;↓

#### Protected API

#### 

#### \---

#### 

#### \# 3. FILE STRUCTURE

#### 

#### Backend authentication:

#### 

#### backend/src/controllers/authController.js

#### backend/src/routes/authRoutes.js

#### backend/src/middleware/authMiddleware.js

#### 

#### Supporting:

#### 

#### backend/src/services/

#### 

#### Frontend authentication:

#### 

#### frontend/src/pages/Login.jsx

#### frontend/src/pages/Signup.jsx

#### frontend/src/pages/Profile.jsx

#### frontend/src/services/api.js

#### 

#### \---

#### 

#### \# 4. SIGNUP

#### 

#### Input:

#### 

#### name

#### email

#### password

#### 

#### Validate:

#### 

#### \- required

#### \- valid email

#### \- password length

#### \- duplicate email

#### 

#### Hash password using bcrypt.

#### 

#### Never store plaintext passwords.

#### 

#### \---

#### 

#### \# 5. LOGIN

#### 

#### Input:

#### 

#### email

#### password

#### 

#### Process:

#### 

#### Find user

#### ↓

#### Compare password

#### ↓

#### Generate JWT

#### ↓

#### Return token + basic user information

#### 

#### \---

#### 

#### \# 6. AUTH MIDDLEWARE

#### 

#### Verify JWT.

#### 

#### If invalid:

#### 

#### 401 Unauthorized

#### 

#### If valid:

#### 

#### continue request.

#### 

#### \---

#### 

#### \# 7. PROFILE

#### 

#### GET:

#### 

#### /api/auth/profile

#### 

#### Return safe user information.

#### 

#### Never return password\_hash.

#### 

#### \---

#### 

#### \# 8. PASSWORD RESET / OTP

#### 

#### Implement a practical MVP flow.

#### 

#### Possible flow:

#### 

#### Request reset

#### ↓

#### Generate OTP

#### ↓

#### Verify OTP

#### ↓

#### Allow new password

#### 

#### For hackathon demonstration, a controlled/mock OTP mechanism may be used if real email/SMS infrastructure is unavailable.

#### 

#### Do not spend excessive time integrating external OTP providers.

#### 

#### \---

#### 

#### \# 9. LOW STOCK

#### 

#### A product is low-stock when:

#### 

#### current\_stock <= reorder\_level

#### 

#### Dashboard should receive low-stock information from backend.

#### 

#### Do not independently calculate conflicting stock values in frontend.

#### 

#### \---

#### 

#### \# 10. SEARCH

#### 

#### Support:

#### 

#### Product name

#### SKU

#### 

#### Example:

#### 

#### GET /api/products?search=steel

#### 

#### \---

#### 

#### \# 11. FILTERS

#### 

#### Support where applicable:

#### 

#### status

#### document type

#### warehouse

#### location

#### category

#### 

#### \---

#### 

#### \# 12. VALIDATION

#### 

#### Validate:

#### 

#### \- missing fields

#### \- invalid email

#### \- invalid password

#### \- invalid product

#### \- invalid quantity

#### \- invalid location

#### 

#### Return clear messages.

#### 

#### \---

#### 

#### \# 13. TEAM BOUNDARY

#### 

#### Do NOT implement:

#### 

#### \- receipt stock calculation

#### \- delivery stock calculation

#### \- transfer stock calculation

#### \- adjustment stock calculation

#### 

#### Those belong to Member 1.

#### 

#### You provide authentication and supporting functionality.

#### 

#### \---

#### 

#### \# 14. COORDINATION

#### 

#### Member 2:

#### Frontend authentication screens

#### 

#### Member 3:

#### users table

#### 

#### Member 1:

#### Backend integration

#### 

#### \---

#### 

#### \# 15. DONE

#### 

#### Authentication works end-to-end and supporting features do not interfere with inventory operations.

