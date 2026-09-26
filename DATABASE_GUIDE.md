#### \# DATABASE GUIDE

#### 

#### \## OWNER

#### 

#### Member 3

#### 

#### Branch:

#### feature/database

#### 

#### \---

#### 

#### \# 1. TECHNOLOGY

#### 

#### MySQL

#### 

#### Database name:

#### 

#### stocksense

#### 

#### \---

#### 

#### \# 2. DATABASE STRUCTURE

#### 

#### database/

#### 

#### ├── schema.sql

#### ├── seed.sql

#### └── README.md

#### 

#### \---

#### 

#### \# 3. TABLES

#### 

#### Create these tables:

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

#### \---

#### 

#### \# 4. USERS

#### 

#### users

#### 

#### Purpose:

#### Authentication and ownership.

#### 

#### Fields should include:

#### 

#### id

#### name

#### email

#### password\_hash

#### role

#### created\_at

#### 

#### Roles:

#### 

#### INVENTORY\_MANAGER

#### WAREHOUSE\_STAFF

#### 

#### \---

#### 

#### \# 5. CATEGORIES

#### 

#### categories

#### 

#### Fields:

#### 

#### id

#### name

#### created\_at

#### 

#### \---

#### 

#### \# 6. PRODUCTS

#### 

#### products

#### 

#### Fields:

#### 

#### id

#### name

#### sku

#### category\_id

#### unit\_of\_measure

#### reorder\_level

#### created\_at

#### updated\_at

#### 

#### SKU should be unique.

#### 

#### \---

#### 

#### \# 7. WAREHOUSES

#### 

#### warehouses

#### 

#### Fields:

#### 

#### id

#### name

#### address

#### created\_at

#### 

#### \---

#### 

#### \# 8. LOCATIONS

#### 

#### locations

#### 

#### Fields:

#### 

#### id

#### warehouse\_id

#### name

#### created\_at

#### 

#### Examples:

#### 

#### Main Warehouse

#### Production Rack

#### Storage Rack

#### 

#### \---

#### 

#### \# 9. STOCK

#### 

#### stock

#### 

#### Represents product quantity at a location.

#### 

#### Fields:

#### 

#### id

#### product\_id

#### location\_id

#### quantity

#### updated\_at

#### 

#### Important:

#### 

#### product\_id + location\_id should represent one stock record.

#### 

#### \---

#### 

#### \# 10. RECEIPTS

#### 

#### receipts

#### 

#### Fields:

#### 

#### id

#### supplier\_name

#### status

#### warehouse\_id

#### created\_by

#### created\_at

#### validated\_at

#### 

#### Statuses:

#### 

#### DRAFT

#### WAITING

#### READY

#### DONE

#### CANCELED

#### 

#### \---

#### 

#### \# 11. RECEIPT ITEMS

#### 

#### receipt\_items

#### 

#### Fields:

#### 

#### id

#### receipt\_id

#### product\_id

#### quantity

#### 

#### \---

#### 

#### \# 12. DELIVERIES

#### 

#### deliveries

#### 

#### Fields:

#### 

#### id

#### status

#### warehouse\_id

#### created\_by

#### created\_at

#### validated\_at

#### 

#### \---

#### 

#### \# 13. DELIVERY ITEMS

#### 

#### delivery\_items

#### 

#### Fields:

#### 

#### id

#### delivery\_id

#### product\_id

#### location\_id

#### quantity

#### 

#### \---

#### 

#### \# 14. TRANSFERS

#### 

#### transfers

#### 

#### Fields:

#### 

#### id

#### source\_location\_id

#### destination\_location\_id

#### status

#### created\_by

#### created\_at

#### validated\_at

#### 

#### \---

#### 

#### \# 15. TRANSFER ITEMS

#### 

#### transfer\_items

#### 

#### Fields:

#### 

#### id

#### transfer\_id

#### product\_id

#### quantity

#### 

#### \---

#### 

#### \# 16. ADJUSTMENTS

#### 

#### adjustments

#### 

#### Fields:

#### 

#### id

#### product\_id

#### location\_id

#### previous\_quantity

#### counted\_quantity

#### difference

#### reason

#### created\_by

#### created\_at

#### 

#### \---

#### 

#### \# 17. STOCK LEDGER

#### 

#### stock\_ledger

#### 

#### Fields:

#### 

#### id

#### product\_id

#### movement\_type

#### quantity

#### source\_location\_id

#### destination\_location\_id

#### reference\_type

#### reference\_id

#### created\_by

#### created\_at

#### 

#### Movement types:

#### 

#### RECEIPT

#### DELIVERY

#### TRANSFER

#### ADJUSTMENT

#### 

#### \---

#### 

#### \# 18. RELATIONSHIPS

#### 

#### categories

#### &#x20;   ↓

#### products

#### 

#### warehouses

#### &#x20;   ↓

#### locations

#### 

#### products + locations

#### &#x20;   ↓

#### stock

#### 

#### receipts

#### &#x20;   ↓

#### receipt\_items

#### &#x20;   ↓

#### products

#### 

#### deliveries

#### &#x20;   ↓

#### delivery\_items

#### &#x20;   ↓

#### products

#### 

#### transfers

#### &#x20;   ↓

#### transfer\_items

#### &#x20;   ↓

#### products

#### 

#### products

#### &#x20;   ↓

#### stock\_ledger

#### 

#### \---

#### 

#### \# 19. SEED DATA

#### 

#### Create demo data for:

#### 

#### Users

#### Categories

#### Products

#### Warehouse

#### Locations

#### Initial stock

#### 

#### At least one product should be low-stock for dashboard testing.

#### 

#### \---

#### 

#### \# 20. DATABASE RULES

#### 

#### Do not:

#### 

#### \- duplicate stock records

#### \- store plaintext passwords

#### \- delete required relationships

#### \- change schema silently

#### \- create tables outside this architecture

#### 

#### Any schema change must be communicated to Member 1.

#### 

#### \---

#### 

#### \# 21. DEMO DATA

#### 

#### Create enough data for:

#### 

#### 100 units received

#### Transfer to Production Rack

#### 20 units delivered

#### 3 units adjusted

#### 

#### Final demo quantity:

#### 

#### 77 units

#### 

#### \---

#### 

#### \# 22. DONE

#### 

#### Database is complete when the backend can execute the entire golden demo using persistent MySQL data.

