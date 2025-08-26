# 🚀 Mobile Developer Setup Guide

## 📱 **Quick Start for Mobile App Integration**

### **1. Import Postman Collection**
1. Download `EYEA_Membership_API.postman_collection.json`
2. Open Postman
3. Click "Import" → Select the JSON file
4. The collection will be imported with all endpoints ready to test

### **2. Set Up Environment Variables**
Create a new environment in Postman with these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `base_url` | `https://apieyeamembership.eyea.et/v1` | API base URL |
| `api_key` | `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY` | Your API key |
| `auth_token` | (empty) | Will be set after login |

### **3. Test API Connection**
1. Select the "Test API Connection" request
2. Click "Send"
3. You should get: `{"message": "API is working correctly"}`

### **4. Test Authentication**
1. Try "SSO Login (Mobile)" with sample data
2. The token will automatically be saved to `auth_token`
3. Now you can test authenticated endpoints

---

## 🔧 **Mobile App Integration Steps**

### **Step 1: API Configuration**
```swift
// iOS Swift Example
let baseURL = "https://apieyeamembership.eyea.et/v1"
let apiKey = "0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY"
```

```kotlin
// Android Kotlin Example
const val BASE_URL = "https://apieyeamembership.eyea.et/v1"
const val API_KEY = "0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY"
```

### **Step 2: HTTP Headers**
All requests must include:
```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
Content-Type: application/json
```

For authenticated requests, also add:
```
Authorization: Bearer {your_jwt_token}
```

### **Step 3: Key Endpoints for Mobile**

#### **User Registration/Login**
- `POST /auth/sso` - Mobile app login
- `GET /auth/profile` - Get user profile

#### **Membership Management**
- `GET /membership/levels` - Get membership options
- `POST /membership/register` - Register new member
- `GET /membership/{id}` - Get member details

#### **Payments**
- `POST /payments` - Create payment
- `GET /payments/subscriptions` - Get payment history

---

## 📋 **Essential Request Examples**

### **Mobile Login (SSO)**
```json
POST /auth/sso
{
  "fullName": "John Doe",
  "phoneNumber": "+251912345678"
}
```

### **Register Member**
```json
POST /membership/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+251912345678",
  "faydaId": "123456789",
  "membershipLevel": "level1"
}
```

### **Create Payment**
```json
POST /payments
{
  "memberId": "member_id_here",
  "amount": 100,
  "currency": "ETB",
  "paymentMethod": "mobile_money"
}
```

---

## 🔒 **Security Best Practices**

1. **Store API Key Securely**
   - iOS: Use Keychain
   - Android: Use EncryptedSharedPreferences
   - Never hardcode in source code

2. **Token Management**
   - Store JWT tokens securely
   - Implement token refresh logic
   - Clear tokens on logout

3. **Network Security**
   - Use HTTPS only
   - Implement certificate pinning
   - Validate server responses

---

## 🧪 **Testing Checklist**

- [ ] API connection test passes
- [ ] SSO login works
- [ ] User profile retrieval works
- [ ] Member registration works
- [ ] Payment creation works
- [ ] Error handling works
- [ ] Token expiration handling works

---

## 📞 **Support & Resources**

- **Full Documentation**: `API_DOCUMENTATION.md`
- **Postman Collection**: `EYEA_Membership_API.postman_collection.json`
- **API Status**: https://apieyeamembership.eyea.et/status
- **Support Email**: admin@eyea.org

---

## 🚨 **Common Issues & Solutions**

### **401 Unauthorized**
- Check if API key is correct
- Verify X-KEY header is included
- Ensure token is valid (if using authenticated endpoint)

### **404 Not Found**
- Verify endpoint URL is correct
- Check if resource ID exists
- Ensure proper HTTP method

### **500 Server Error**
- Check request body format
- Verify all required fields
- Contact support if issue persists

---

## 📱 **Mobile-Specific Tips**

1. **Offline Support**: Cache membership data locally
2. **Push Notifications**: Use member IDs for targeting
3. **Image Upload**: Use multipart/form-data for profile pictures
4. **Real-time Updates**: Consider WebSocket for live data
5. **Background Sync**: Implement data synchronization
6. **Error Recovery**: Handle network failures gracefully

**Happy coding! 🚀** 