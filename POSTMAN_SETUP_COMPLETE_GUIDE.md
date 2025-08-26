# 🚀 EYEA Membership API - Complete Postman Setup Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Backend Setup](#backend-setup)
3. [Postman Collection Setup](#postman-collection-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing Workflow](#testing-workflow)
6. [Troubleshooting](#troubleshooting)
7. [API Endpoints Reference](#api-endpoints-reference)

## 🚀 Quick Start

### Prerequisites
- Postman installed on your machine
- Backend server running (Docker or local)
- API key (provided in the collection)

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Choose one of these files:
   - `EYEA_Membership_API_Local.postman_collection.json` (for local development)
   - `EYEA_Membership_API.postman_collection.json` (for production)
4. The collection will be imported with all endpoints

### 2. Set Up Environment
1. In Postman, click **Environments** (left sidebar)
2. Click **+** to create a new environment
3. Name it: `EYEA Membership API - Local`
4. Add these variables:

| Variable | Initial Value | Current Value | Description |
|----------|---------------|---------------|-------------|
| `base_url` | `http://localhost:3001/v1` | `http://localhost:3001/v1` | API base URL |
| `auth_token` | `` | `` | JWT token (auto-filled after login) |
| `api_key` | `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY` | `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY` | API key |
| `member_id` | `` | `` | Member ID (auto-filled after registration) |

5. Click **Save**
6. Select your environment from the dropdown (top right)

## 🔧 Backend Setup

### Option 1: Using Docker (Recommended)
```bash
cd /home/eyea/Membership-Registration
docker-compose up -d
```

### Option 2: Local Development
```bash
cd /home/eyea/Membership-Registration/backend
npm install
npm run start:dev
```

### Verify Backend is Running
```bash
curl http://localhost:3001/v1/auth/test
```

Expected response:
```json
{
  "message": "API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📦 Postman Collection Setup

### Collection Structure
The collection is organized into 5 main sections:

1. **🔐 Authentication**
   - Admin Login
   - SSO Login (Mobile)
   - Get User Profile
   - Change Password
   - Test API Connection

2. **👥 Membership Management**
   - Get Membership Levels
   - Register New Member
   - Get All Members
   - Get Member by ID
   - Update Member
   - Delete Member

3. **💳 Payments**
   - Get Subscription Payments
   - Create Payment

4. **🎁 Donations**
   - Get Donation History
   - Create Donation

5. **📊 Analytics**
   - Get Dashboard Stats
   - Get Analytics Data

### Authentication Flow
1. **Start with Admin Login**
   - Go to **Authentication** → **Admin Login**
   - Click **Send**
   - The JWT token will be automatically saved

2. **Use Protected Endpoints**
   - All subsequent requests will include the token
   - No manual token management needed

## 🌍 Environment Configuration

### Local Development Environment
```json
{
  "base_url": "http://localhost:3001/v1",
  "api_key": "0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY",
  "auth_token": "",
  "member_id": ""
}
```

### Production Environment
```json
{
  "base_url": "https://apieyeamembership.eyea.et/v1",
  "api_key": "0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY",
  "auth_token": "",
  "member_id": ""
}
```

## 🧪 Testing Workflow

### Step-by-Step Testing Sequence

#### 1. Test API Connection
1. Go to **Authentication** → **Test API Connection**
2. Click **Send**
3. Should return: `{"message": "API is running"}`

#### 2. Admin Login
1. Go to **Authentication** → **Admin Login**
2. Click **Send**
3. Check response for `access_token`
4. Token is automatically saved to environment

#### 3. Get Membership Levels
1. Go to **Membership Management** → **Get Membership Levels**
2. Click **Send**
3. Should return available membership levels

#### 4. Register New Member
1. Go to **Membership Management** → **Register New Member**
2. Update the request body with test data:
```json
{
  "fullName": "Test User",
  "email": "test.user@example.com",
  "phoneNumber": "+251912345678",
  "faydaId": "123456789",
  "membershipLevel": "level1",
  "address": {
    "street": "123 Test St",
    "city": "Addis Ababa",
    "state": "Addis Ababa",
    "zipCode": "1000",
    "country": "Ethiopia"
  },
  "emergencyContact": {
    "name": "Emergency Contact",
    "phone": "+251987654321",
    "relationship": "Spouse"
  }
}
```
3. Click **Send**
4. Member ID is automatically saved to environment

#### 5. Get All Members
1. Go to **Membership Management** → **Get All Members**
2. Click **Send**
3. Should return paginated list of members

#### 6. Create Donation
1. Go to **Donations** → **Create Donation**
2. Update request body:
```json
{
  "donorName": "Test Donor",
  "amount": 100,
  "currency": "ETB",
  "message": "Test donation",
  "anonymous": false,
  "email": "donor@example.com",
  "phone": "+251912345678"
}
```
3. Click **Send**

#### 7. Get Dashboard Stats
1. Go to **Analytics** → **Get Dashboard Stats**
2. Click **Send**
3. Should return dashboard statistics

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Connection Refused
**Error**: `ECONNREFUSED`
**Solution**: 
- Check if backend is running: `docker-compose ps`
- Restart backend: `docker-compose restart eyea-backend`

#### 2. 401 Unauthorized
**Error**: `401 Unauthorized`
**Solution**:
- Re-run **Admin Login** to get fresh token
- Check if token is saved in environment variables

#### 3. 403 Forbidden
**Error**: `403 Forbidden`
**Solution**:
- Verify API key in environment variables
- Check if `X-KEY` header is included

#### 4. CORS Errors
**Error**: CORS policy blocked
**Solution**:
- Ensure you're using the correct base URL
- Check if backend CORS is configured properly

#### 5. 400 Bad Request
**Error**: `400 Bad Request`
**Solution**:
- Validate request body format
- Check required fields in the API documentation

### Debug Steps
1. **Check Backend Logs**:
   ```bash
   docker-compose logs eyea-backend
   ```

2. **Test API Directly**:
   ```bash
   curl -X GET http://localhost:3001/v1/auth/test \
     -H "X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY"
   ```

3. **Check Environment Variables**:
   - In Postman, click the environment dropdown
   - Click the eye icon to view variables
   - Verify all values are correct

## 📚 API Endpoints Reference

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Admin login | No |
| POST | `/auth/sso` | SSO login | No |
| GET | `/auth/profile` | Get user profile | Yes |
| POST | `/auth/change-password` | Change password | Yes |
| GET | `/auth/test` | Test API connection | No |

### Membership Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/membership/levels` | Get membership levels | No |
| POST | `/membership/register` | Register new member | No |
| GET | `/membership` | Get all members | No |
| GET | `/membership/:id` | Get member by ID | No |
| PUT | `/membership/:id` | Update member | Yes |
| DELETE | `/membership/:id` | Delete member | Yes |

### Payment Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/payments/subscriptions` | Get subscription payments | No |
| POST | `/payments` | Create payment | No |

### Donation Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/donation/history` | Get donation history | No |
| POST | `/donation` | Create donation | No |

### Analytics Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/analytics/dashboard` | Get dashboard stats | No |
| GET | `/analytics/data` | Get analytics data | No |

## 🔐 Security Notes

### API Key Management
- API key is included in `X-KEY` header for all requests
- Key: `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY`
- Never commit API keys to version control

### JWT Token Management
- Tokens are automatically managed by Postman scripts
- Tokens expire after a certain time (check backend config)
- Re-authenticate when tokens expire

### Environment Variables
- Use environment variables for sensitive data
- Clear environment variables after testing
- Don't share environment files with sensitive data

## 📞 Support

### Getting Help
1. **Check Backend Logs**: `docker-compose logs eyea-backend`
2. **Test API Directly**: Use curl commands above
3. **Verify Environment**: Check Postman environment variables
4. **Contact Development Team**: Provide error details and logs

### Useful Commands
```bash
# Check backend status
docker-compose ps

# View backend logs
docker-compose logs eyea-backend

# Restart backend
docker-compose restart eyea-backend

# Test API directly
curl http://localhost:3001/v1/auth/test

# Check environment
docker-compose exec eyea-backend env
```

---

## 🎉 Ready to Test!

You're now set up to test the EYEA Membership API using Postman. Start with the **Test API Connection** endpoint and follow the testing workflow above.

**Happy Testing! 🚀**


