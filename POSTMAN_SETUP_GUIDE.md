# EYEA Membership API - Postman Collection Setup Guide

## 📋 Overview
This guide will help you set up and use the Postman collection for testing the EYEA Membership API endpoints.

## 🚀 Quick Start

### 1. Import the Collection
1. Open Postman
2. Click **Import** button
3. Select the `EYEA_Membership_API_Postman_Collection.json` file
4. The collection will be imported with all endpoints

### 2. Set Up Environment Variables
1. In Postman, click **Environments** (left sidebar)
2. Click **+** to create a new environment
3. Name it: `EYEA Membership API - Production`
4. Add these variables:

| Variable | Initial Value | Current Value | Description |
|----------|---------------|---------------|-------------|
| `base_url` | `https://apieyeamembership.eyea.et/v1` | `https://apieyeamembership.eyea.et/v1` | API base URL |
| `auth_token` | `` | `` | JWT token (auto-filled after login) |
| `api_key` | `your-api-key-here` | `your-actual-api-key` | Your API key |
| `member_id` | `member-id-here` | `actual-member-id` | Member ID for testing |

5. Click **Save**

### 3. Get Your API Key
Contact the system administrator to get your API key and replace `your-api-key-here` with the actual key.

## 🔐 Authentication Flow

### Step 1: Admin Login
1. Go to **Authentication** → **Admin Login**
2. Update the request body with your credentials:
```json
{
  "email": "your-admin-email@eyea.et",
  "password": "your-password"
}
```
3. Click **Send**
4. The JWT token will be automatically saved to `{{auth_token}}`

### Step 2: Use Protected Endpoints
All subsequent requests will automatically include the JWT token in the Authorization header.

## 📊 API Endpoints Overview

### 🔐 Authentication
- **POST** `/auth/login` - Admin login
- **POST** `/auth/sso` - SSO login with phone/name

### 📈 Dashboard & Analytics
- **GET** `/dashboard/stats` - Dashboard statistics
- **GET** `/analytics` - Detailed analytics data

### 👥 Membership Management
- **GET** `/membership` - Get all members (with pagination)
- **GET** `/membership/:id` - Get specific member
- **POST** `/membership/register` - Register new member
- **PUT** `/membership/:id` - Update member
- **DELETE** `/membership/:id` - Delete member
- **GET** `/membership/levels` - Get membership levels

### 💳 Payments
- **GET** `/payments/subscriptions` - Get subscription payments

### 🎁 Donations
- **GET** `/donation/history` - Get donation history
- **POST** `/donation` - Submit new donation

### 👤 User Management
- **GET** `/users/profile` - Get user profile
- **PUT** `/users/profile` - Update user profile
- **PUT** `/users/change-password` - Change password

## 🧪 Testing Examples

### Example 1: Register a New Member
1. Go to **Membership Management** → **Register New Member**
2. Update the request body:
```json
{
  "fullName": "Test User",
  "email": "test.user@example.com",
  "phoneNumber": "+251912345678",
  "membershipLevel": "Gold",
  "registrationDate": "2024-01-15",
  "address": "Addis Ababa, Ethiopia",
  "occupation": "Software Engineer"
}
```
3. Click **Send**
4. Copy the returned member ID for future tests

### Example 2: Get All Members
1. Go to **Membership Management** → **Get All Members**
2. The request includes query parameters for pagination and search
3. Click **Send**
4. You'll see the paginated list of members

### Example 3: Submit a Donation
1. Go to **Donations** → **Submit Donation**
2. Update the request body:
```json
{
  "donorName": "Anonymous Donor",
  "amount": 1000,
  "purpose": "General Fund",
  "anonymous": true,
  "email": "donor@example.com",
  "message": "Supporting EYEA's mission"
}
```
3. Click **Send**

## 🔧 Environment Variables Usage

### Automatic Token Management
The collection includes scripts that automatically:
- Save JWT tokens from login responses
- Include tokens in subsequent requests
- Log request/response details for debugging

### Manual Variable Updates
You can manually update variables:
1. Click the **Environment** dropdown (top right)
2. Select your environment
3. Click the **eye** icon to view/edit variables
4. Update values as needed

## 📝 Request Body Templates

### Member Registration Template
```json
{
  "fullName": "{{$randomFullName}}",
  "email": "{{$randomEmail}}",
  "phoneNumber": "+251{{$randomInt 900000000 999999999}}",
  "membershipLevel": "{{$randomPick 'Basic' 'Silver' 'Gold' 'Platinum'}}",
  "registrationDate": "{{$timestamp}}",
  "address": "Addis Ababa, Ethiopia",
  "occupation": "{{$randomPick 'Engineer' 'Teacher' 'Doctor' 'Student'}}",
  "emergencyContact": {
    "name": "{{$randomFullName}}",
    "phone": "+251{{$randomInt 900000000 999999999}}",
    "relationship": "{{$randomPick 'Spouse' 'Parent' 'Sibling' 'Friend'}}"
  }
}
```

### Donation Template
```json
{
  "donorName": "{{$randomFullName}}",
  "amount": {{$randomInt 100 10000}},
  "purpose": "{{$randomPick 'General Fund' 'Education' 'Healthcare' 'Community Development'}}",
  "anonymous": {{$randomBoolean}},
  "email": "{{$randomEmail}}",
  "message": "Supporting EYEA's mission"
}
```

## 🚨 Error Handling

### Common HTTP Status Codes
- **200** - Success
- **201** - Created (for POST requests)
- **400** - Bad Request (check request body)
- **401** - Unauthorized (check auth token)
- **403** - Forbidden (check API key)
- **404** - Not Found (check URL)
- **500** - Server Error

### Troubleshooting
1. **401 Unauthorized**: Re-run the login request to get a fresh token
2. **403 Forbidden**: Check your API key in environment variables
3. **400 Bad Request**: Validate your request body format
4. **CORS Errors**: Ensure you're using the correct base URL

## 🔄 Testing Workflow

### Recommended Testing Sequence
1. **Authentication** → **Admin Login**
2. **Membership Management** → **Get Membership Levels**
3. **Membership Management** → **Register New Member**
4. **Membership Management** → **Get All Members**
5. **Donations** → **Submit Donation**
6. **Donations** → **Get Donation History**
7. **Dashboard & Analytics** → **Get Dashboard Stats**

## 📞 Support

If you encounter issues:
1. Check the **Console** tab in Postman for detailed logs
2. Verify environment variables are set correctly
3. Ensure the API is accessible at the base URL
4. Contact the development team with error details

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Regularly rotate API keys
- Log out when done testing
- Clear environment variables after testing

---

**Happy Testing! 🎉** 