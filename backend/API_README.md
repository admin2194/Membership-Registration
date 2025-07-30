# EYEYA Organization API

This is the backend API for the EYEYA Organization membership system, implemented using NestJS and MongoDB.

## Base URL
```
https://api.eyeyamembership.org/v1
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the environment file:
```bash
cp env.example .env
```

3. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/eyea
JWT_SECRET=your-super-secret-jwt-key-here
API_KEY=your-api-key-here
PORT=3001
```

4. Start the development server:
```bash
npm run start:dev
```

## API Endpoints

### 1. Single Sign-On (SSO)
**Endpoint:** `POST /auth/sso`

**Headers:**
- Content-Type: application/json
- X-KEY: <Your Provided Key>

**Body:**
```json
{
  "fullName": "Jane Doe",
  "phoneNumber": "251742219814"
}
```

**Success Response:**
```json
{
  "status": "success",
  "token": "<JWT>",
  "user": {
    "id": 123,
    "fullName": "Jane Doe",
    "phoneNumber": "251742219814"
  }
}
```

### 2. Membership Registration
**Endpoint:** `POST /membership/register`

**Headers:**
- Authorization: Bearer <JWT Token>
- Content-Type: application/json

**Body:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "gender": "Female",
  "phoneNumber": "251742219814",
  "birthDate": "1996-06-26",
  "faydaId": "XYZ12345",
  "passportId": "EP123456",
  "kebeleId": "KB000789",
  "tinNumber": "1000123456",
  "membershipLevelId": 3,
  "jobTitle": "Founder & CEO",
  "sectors": ["Technology", "Agriculture"],
  "needs": ["Training & Mentorship", "Access to Finance"],
  "agreedToTerms": true
}
```

### 3. Get Membership Levels
**Endpoint:** `GET /membership/levels`

**Headers:**
- Authorization: Bearer <JWT Token>
- Content-Type: application/json

**Response:**
```json
[
  { "id": 1, "name": "Pre-revenue", "price": 120, "frequency": "Monthly" },
  { "id": 2, "name": "Growth", "price": 500, "frequency": "Monthly" },
  { "id": 3, "name": "Scaling", "price": 1000, "frequency": "Monthly" },
  { "id": 4, "name": "Exit", "price": 1500, "frequency": "Monthly" }
]
```

### 4. Submit Donation
**Endpoint:** `POST /donation`

**Headers:**
- Content-Type: application/json

**Body:**
```json
{
  "fullName": "Rediet Alemu",
  "phoneNumber": "251742219814",
  "amount": 500,
  "note": "Supporting youth programs"
}
```

### 5. Get Subscription Payments
**Endpoint:** `GET /payments/subscriptions`

**Headers:**
- Authorization: Bearer <JWT Token>

**Response:**
```json
[
  {
    "month": "June",
    "date": "2025-06-05",
    "amount": 500,
    "status": "Paid"
  },
  {
    "month": "May",
    "date": "2025-05-06",
    "amount": 500,
    "status": "Paid"
  }
]
```

### 6. Get Donation History
**Endpoint:** `GET /donation/history`

**Headers:**
- Authorization: Bearer <JWT Token>

**Response:**
```json
[
  {
    "date": "2025-06-01",
    "amount": 300,
    "note": "June campaign"
  },
  {
    "date": "2025-05-01",
    "amount": 500,
    "note": "May donation"
  }
]
```

## Additional Endpoints

### Admin Login
**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "email": "admin@eyea.com",
  "password": "admin123"
}
```

### Create Admin User
**Endpoint:** `POST /auth/seed-admin`

This endpoint creates the default admin user if it doesn't exist.

## Database Schemas

The API uses MongoDB with the following schemas:

1. **User** - User authentication and profile data
2. **Membership** - Membership registration data
3. **MembershipLevel** - Available membership tiers
4. **Donation** - Donation records
5. **Payment** - Subscription payment records

## Authentication

The API uses JWT tokens for authentication. Protected endpoints require the `Authorization: Bearer <JWT>` header.

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start:prod
```

## Security Notes

1. Always use HTTPS in production
2. Keep your JWT_SECRET and API_KEY secure
3. Implement rate limiting for production
4. Add input validation and sanitization
5. Consider implementing API rate limiting 