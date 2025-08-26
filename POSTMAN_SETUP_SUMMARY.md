# 🎯 EYEA Membership API - Postman Setup Summary

## ✅ Current Status

### Backend Status: **RUNNING** ✅
- **URL**: `http://localhost:3001/v1`
- **Status**: Active and responding
- **Test Response**: `{"message":"Auth controller is working"}`

### Docker Services Status:
```bash
eyea-backend    Up (unhealthy)   0.0.0.0:3001->3001/tcp
eyea-frontend   Up (unhealthy)   0.0.0.0:4000->3000/tcp
eyea-redis      Up               0.0.0.0:6379->6379/tcp
```

## 📁 Available Postman Collections

### 1. Local Development Collection
**File**: `EYEA_Membership_API_Local.postman_collection.json`
- **Base URL**: `http://localhost:3001/v1`
- **Purpose**: Local development and testing
- **Status**: ✅ Ready to use

### 2. Production Collection
**File**: `EYEA_Membership_API.postman_collection.json`
- **Base URL**: `https://apieyeamembership.eyea.et/v1`
- **Purpose**: Production testing
- **Status**: ✅ Ready to use

## 🔑 API Configuration

### API Key
- **Key**: `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY`
- **Header**: `X-KEY`
- **Status**: ✅ Active

### Admin Credentials
- **Email**: `admin@eyea.org`
- **Password**: `admin123`
- **Status**: ✅ Seeded and ready

## 🚀 Quick Setup Instructions

### Step 1: Import Collection
1. Open Postman
2. Click **Import**
3. Select: `EYEA_Membership_API_Local.postman_collection.json`
4. Collection imported successfully

### Step 2: Create Environment
1. Click **Environments** (left sidebar)
2. Click **+** to create new environment
3. Name: `EYEA Membership API - Local`
4. Add variables:

| Variable | Value |
|----------|-------|
| `base_url` | `http://localhost:3001/v1` |
| `api_key` | `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY` |
| `auth_token` | `` |
| `member_id` | `` |

5. Click **Save**
6. Select environment from dropdown (top right)

### Step 3: Test Connection
1. Go to **Authentication** → **Test API Connection**
2. Click **Send**
3. Expected response: `{"message":"Auth controller is working"}`

## 📊 Available Endpoints

### 🔐 Authentication (5 endpoints)
- ✅ Admin Login
- ✅ SSO Login (Mobile)
- ✅ Get User Profile
- ✅ Change Password
- ✅ Test API Connection

### 👥 Membership Management (6 endpoints)
- ✅ Get Membership Levels
- ✅ Register New Member
- ✅ Get All Members
- ✅ Get Member by ID
- ✅ Update Member
- ✅ Delete Member

### 💳 Payments (2 endpoints)
- ✅ Get Subscription Payments
- ✅ Create Payment

### 🎁 Donations (2 endpoints)
- ✅ Get Donation History
- ✅ Create Donation

### 📊 Analytics (2 endpoints)
- ✅ Get Dashboard Stats
- ✅ Get Analytics Data

## 🧪 Testing Workflow

### Recommended Testing Sequence:
1. **Test API Connection** → Verify backend is running
2. **Admin Login** → Get authentication token
3. **Get Membership Levels** → View available levels
4. **Register New Member** → Create test member
5. **Get All Members** → View member list
6. **Create Donation** → Test donation functionality
7. **Get Dashboard Stats** → View analytics

### Sample Test Data:
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

## 🔧 Backend Management

### Start Backend:
```bash
cd /home/eyea/Membership-Registration
docker-compose up -d
```

### Check Status:
```bash
docker-compose ps
```

### View Logs:
```bash
docker logs eyea-backend --tail 20
```

### Restart Backend:
```bash
docker-compose restart backend
```

### Test API:
```bash
curl http://localhost:3001/v1/auth/test
```

## 📚 Documentation Files

### Available Guides:
1. **`POSTMAN_SETUP_COMPLETE_GUIDE.md`** - Comprehensive setup guide
2. **`POSTMAN_SETUP_GUIDE.md`** - Original setup guide
3. **`API_DOCUMENTATION.md`** - API documentation
4. **`API_KEY_MANAGEMENT_GUIDE.md`** - API key management

### Collection Files:
1. **`EYEA_Membership_API_Local.postman_collection.json`** - Local development
2. **`EYEA_Membership_API.postman_collection.json`** - Production

## 🔍 Troubleshooting

### Common Issues:

#### 1. Connection Refused
```bash
# Check if backend is running
docker-compose ps

# Restart if needed
docker-compose restart backend
```

#### 2. 401 Unauthorized
- Re-run **Admin Login** to get fresh token
- Check environment variables

#### 3. 403 Forbidden
- Verify API key in environment
- Check `X-KEY` header

#### 4. CORS Errors
- Ensure correct base URL
- Check backend CORS configuration

## 🎉 Ready to Test!

### ✅ Everything is Set Up:
- Backend is running on `http://localhost:3001/v1`
- Postman collections are ready
- API key is configured
- Admin user is seeded
- All endpoints are available

### 🚀 Next Steps:
1. Import the local collection
2. Set up environment variables
3. Start testing with **Test API Connection**
4. Follow the testing workflow

**Happy Testing! 🎯**

---

*Last Updated: August 18, 2025*
*Backend Status: ✅ Running*
*API Status: ✅ Responding*


