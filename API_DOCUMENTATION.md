# EYEA Membership API Documentation

## 🌐 **Base URL**
```
https://apieyeamembership.eyea.et/v1
```

## 🔑 **Authentication**
All API requests require the API key in the header:
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

## 📋 **API Endpoints**

---

## 🔐 **Authentication Endpoints**

### 1. **Admin Login**
**POST** `/auth/login`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "email": "admin@eyea.org",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "688a79e3d7cea79ddaa48855",
    "email": "admin@eyea.org",
    "fullName": "EYEA Admin",
    "role": "admin",
    "phone": "+251911234567"
  }
}
```

---

### 2. **SSO Login (Mobile App)**
**POST** `/auth/sso`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "+251912345678"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "688ccc426a359137dbac787c",
    "fullName": "John Doe",
    "phoneNumber": "+251912345678"
  }
}
```

---

### 3. **Get User Profile**
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "id": "688ccc426a359137dbac787c",
  "fullName": "John Doe",
  "email": "+251912345678@eyea.org",
  "phoneNumber": "+251912345678",
  "role": "user"
}
```

---

### 4. **Change Password**
**POST** `/auth/change-password`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

---

## 👥 **Membership Endpoints**

### 5. **Get Membership Levels**
**GET** `/membership/levels`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
[
  {
    "id": "level1",
    "name": "Basic Member",
    "description": "Basic membership level",
    "price": 100,
    "duration": "1 year",
    "benefits": ["Access to events", "Newsletter"]
  },
  {
    "id": "level2", 
    "name": "Premium Member",
    "description": "Premium membership with additional benefits",
    "price": 250,
    "duration": "1 year",
    "benefits": ["All Basic benefits", "Priority support", "Exclusive events"]
  }
]
```

---

### 6. **Register New Member**
**POST** `/membership/register`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+251912345678",
  "faydaId": "123456789",
  "membershipLevel": "level1",
  "address": {
    "street": "123 Main St",
    "city": "Addis Ababa",
    "state": "Addis Ababa",
    "zipCode": "1000",
    "country": "Ethiopia"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+251987654321",
    "relationship": "Spouse"
  }
}
```

**Response:**
```json
{
  "id": "688ccc426a359137dbac787c",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+251912345678",
  "faydaId": "123456789",
  "membershipLevel": "level1",
  "status": "active",
  "createdAt": "2025-08-01T22:00:00.000Z"
}
```

---

### 7. **Get All Members (with Pagination)**
**GET** `/membership?page=1&limit=10&search=john&sortBy=createdAt&sortOrder=desc`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search in name, email, phone, faydaId
- `sortBy` (optional): Field to sort by (default: createdAt)
- `sortOrder` (optional): asc or desc (default: desc)

**Response:**
```json
{
  "data": [
    {
      "id": "688ccc426a359137dbac787c",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phoneNumber": "+251912345678",
      "faydaId": "123456789",
      "membershipLevel": "level1",
      "status": "active",
      "createdAt": "2025-08-01T22:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "success": true
}
```

---

### 8. **Get Member by ID**
**GET** `/membership/{id}`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "id": "688ccc426a359137dbac787c",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+251912345678",
  "faydaId": "123456789",
  "membershipLevel": "level1",
  "status": "active",
  "address": {
    "street": "123 Main St",
    "city": "Addis Ababa",
    "state": "Addis Ababa",
    "zipCode": "1000",
    "country": "Ethiopia"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+251987654321",
    "relationship": "Spouse"
  },
  "createdAt": "2025-08-01T22:00:00.000Z",
  "updatedAt": "2025-08-01T22:00:00.000Z"
}
```

---

### 9. **Update Member**
**PUT** `/membership/{id}`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "email": "john.updated@example.com",
  "phoneNumber": "+251912345679",
  "membershipLevel": "level2",
  "address": {
    "street": "456 New St",
    "city": "Addis Ababa",
    "state": "Addis Ababa",
    "zipCode": "1001",
    "country": "Ethiopia"
  }
}
```

**Response:**
```json
{
  "id": "688ccc426a359137dbac787c",
  "fullName": "John Doe Updated",
  "email": "john.updated@example.com",
  "phoneNumber": "+251912345679",
  "membershipLevel": "level2",
  "status": "active",
  "updatedAt": "2025-08-01T22:30:00.000Z"
}
```

---

### 10. **Delete Member**
**DELETE** `/membership/{id}`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "message": "Member deleted successfully"
}
```

---

## 💰 **Payment Endpoints**

### 11. **Get Subscription Payments**
**GET** `/payments/subscriptions?page=1&limit=10&status=completed`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Payment status (pending, completed, failed)

**Response:**
```json
{
  "data": [
    {
      "id": "payment123",
      "memberId": "688ccc426a359137dbac787c",
      "amount": 100,
      "currency": "ETB",
      "status": "completed",
      "paymentMethod": "mobile_money",
      "transactionId": "txn_123456",
      "createdAt": "2025-08-01T22:00:00.000Z"
    }
  ],
  "totalAmount": 100,
  "count": 1,
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

### 12. **Create Payment**
**POST** `/payments`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "memberId": "688ccc426a359137dbac787c",
  "amount": 100,
  "currency": "ETB",
  "paymentMethod": "mobile_money",
  "membershipLevel": "level1",
  "description": "Annual membership payment"
}
```

**Response:**
```json
{
  "id": "payment123",
  "memberId": "688ccc426a359137dbac787c",
  "amount": 100,
  "currency": "ETB",
  "status": "pending",
  "paymentMethod": "mobile_money",
  "transactionId": "txn_123456",
  "createdAt": "2025-08-01T22:00:00.000Z"
}
```

---

## 🎁 **Donation Endpoints**

### 13. **Get Donation History**
**GET** `/donation/history?page=1&limit=10&donor=john`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `donor` (optional): Search by donor name

**Response:**
```json
{
  "data": [
    {
      "id": "donation123",
      "donorName": "John Doe",
      "amount": 50,
      "currency": "ETB",
      "message": "Supporting the cause",
      "anonymous": false,
      "createdAt": "2025-08-01T22:00:00.000Z"
    }
  ],
  "totalAmount": 50,
  "count": 1,
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

### 14. **Create Donation**
**POST** `/donation`

**Headers:**
```
Content-Type: application/json
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Request Body:**
```json
{
  "donorName": "John Doe",
  "amount": 50,
  "currency": "ETB",
  "message": "Supporting the cause",
  "anonymous": false,
  "email": "john.doe@example.com",
  "phone": "+251912345678"
}
```

**Response:**
```json
{
  "id": "donation123",
  "donorName": "John Doe",
  "amount": 50,
  "currency": "ETB",
  "message": "Supporting the cause",
  "anonymous": false,
  "status": "pending",
  "createdAt": "2025-08-01T22:00:00.000Z"
}
```

---

## 📊 **Analytics Endpoints**

### 15. **Get Dashboard Stats**
**GET** `/analytics/dashboard`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "totalMembers": 25,
  "subscriptionRevenue": 2500,
  "totalDonations": 500,
  "activePayments": 15,
  "growthRate": 12.5,
  "engagement": 85.2
}
```

---

### 16. **Get Analytics Data**
**GET** `/analytics/data`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "totalRevenue": 3000,
  "activeMembers": 25,
  "growthRate": 12.5,
  "engagement": 85.2,
  "revenueTrends": [
    { "month": "Jan", "revenue": 2400 },
    { "month": "Feb", "revenue": 2700 },
    { "month": "Mar", "revenue": 3000 }
  ],
  "memberGrowth": [
    { "month": "Jan", "members": 18 },
    { "month": "Feb", "members": 22 },
    { "month": "Mar", "members": 25 }
  ]
}
```

---

## 🧪 **Test Endpoints**

### 17. **Test API Connection**
**GET** `/auth/test`

**Headers:**
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
```

**Response:**
```json
{
  "message": "API is working correctly",
  "timestamp": "2025-08-01T22:00:00.000Z"
}
```

---

## 📝 **Error Responses**

### **400 Bad Request**
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### **401 Unauthorized**
```json
{
  "message": "Invalid API key",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### **404 Not Found**
```json
{
  "message": "Member not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### **500 Internal Server Error**
```json
{
  "message": "Internal server error",
  "error": "Internal Server Error",
  "statusCode": 500
}
```

---

## 🔧 **Postman Collection Setup**

### **Environment Variables**
Create a Postman environment with these variables:

```
base_url: https://apieyeamembership.eyea.et/v1
api_key: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
auth_token: (will be set after login)
```

### **Pre-request Scripts**
For authenticated requests, add this pre-request script:
```javascript
pm.request.headers.add({
    key: 'X-KEY',
    value: pm.environment.get('api_key')
});

if (pm.environment.get('auth_token')) {
    pm.request.headers.add({
        key: 'Authorization',
        value: 'Bearer ' + pm.environment.get('auth_token')
    });
}
```

### **Tests Scripts**
For login endpoints, add this test script to automatically set the token:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.access_token) {
        pm.environment.set('auth_token', response.access_token);
    } else if (response.token) {
        pm.environment.set('auth_token', response.token);
    }
}
```

---

## 📱 **Mobile App Integration Tips**

1. **Store API Key Securely**: Never hardcode the API key in your app
2. **Token Management**: Store and refresh JWT tokens securely
3. **Error Handling**: Implement proper error handling for all API calls
4. **Offline Support**: Cache membership data for offline viewing
5. **Push Notifications**: Use member IDs for targeted notifications
6. **Image Upload**: For profile pictures, use multipart/form-data
7. **Real-time Updates**: Consider WebSocket connections for live updates

---

## 🔒 **Security Notes**

- All requests must include the `X-KEY` header
- JWT tokens expire after 24 hours
- Use HTTPS for all API calls
- Validate all input data on the client side
- Implement proper session management
- Never expose API keys in client-side code

---

## 📞 **Support**

For API support and questions:
- Email: admin@eyea.org
- Documentation: https://apieyeamembership.eyea.et/docs
- Status: https://apieyeamembership.eyea.et/status 