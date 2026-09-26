# AUTH_SUPPORT_GUIDE.md

# Authentication + Supporting Features Guide

## Owner

Member 4

Branch:
feature/auth-support

## Mission

Implement authentication and supporting functionality without interfering with the core inventory architecture.

## Authentication

Implement:

- Signup
- Login
- Logout
- Profile
- Password reset/OTP flow

After successful login:
redirect user to Inventory Dashboard.

## User Data

Support required user information and authentication state.

Passwords must not be stored as plain text.

## Supporting Features

### Low-stock Alerts

Identify products whose stock is at or below the configured reordering threshold.

Display the information clearly.

### Search

Support product/SKU search.

### Filters

Support practical filtering by:
- Document type
- Status
- Warehouse/location
- Product category

### Validation

Validate:
- Required fields
- Invalid quantities
- Invalid credentials
- Invalid operations
- Missing products
- Missing locations

## Testing

Test:

- Signup
- Login
- Invalid login
- Logout
- Profile
- Password reset flow
- Low-stock detection
- Search
- Filters
- Invalid input

## Important Boundary

Do not implement core stock calculations independently.

Do not create a second inventory service.

Backend inventory logic belongs to Member 1.

## Integration

Coordinate with:
- Member 1 for backend APIs
- Member 3 for user/database schema
- Member 2 for frontend authentication screens

## AI Instructions

Follow PROJECT_GUIDE.md.

Do not change the overall architecture.

Do not create duplicate authentication systems.

Do not add unnecessary external services.

## Definition of Done

Authentication works end-to-end and supporting features can be demonstrated without breaking inventory operations.
