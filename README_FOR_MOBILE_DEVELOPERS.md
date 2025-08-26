# 📱 EYEA Membership API - Mobile Developer Guide

## 🚀 **Quick Start**

Your EYEA Membership API is ready for mobile app integration! Here's everything you need to get started.

---

## 📋 **What's Included**

1. **📄 API Documentation** - Complete endpoint documentation with examples
2. **🔧 Postman Collection** - Ready-to-import collection for testing
3. **📱 Mobile Setup Guide** - Step-by-step integration instructions
4. **🔑 API Key** - Your secure API key for authentication

---

## 🔑 **Your API Credentials**

| Item | Value |
|------|-------|
| **Base URL** | `https://apieyeamembership.eyea.et/v1` |
| **API Key** | `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY` |
| **Admin Email** | `admin@eyea.org` |
| **Admin Password** | `admin123` |

---

## 📁 **Files to Download**

1. **`API_DOCUMENTATION.md`** - Complete API reference
2. **`EYEA_Membership_API.postman_collection.json`** - Postman collection
3. **`MOBILE_DEVELOPER_SETUP.md`** - Mobile integration guide

---

## 🧪 **Test Your API**

### **Quick Test Commands**

```bash
# Test API connection
curl -X GET "https://apieyeamembership.eyea.et/v1/auth/test" \
  -H "X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY"

# Test mobile login (SSO)
curl -X POST "https://apieyeamembership.eyea.et/v1/auth/sso" \
  -H "Content-Type: application/json" \
  -H "X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY" \
  -d '{"fullName": "Test User", "phoneNumber": "+251912345678"}'

# Test admin login
curl -X POST "https://apieyeamembership.eyea.et/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@eyea.org", "password": "admin123"}'
```

---

## 🔧 **Essential Headers**

All API requests must include:

```
X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY
Content-Type: application/json
```

For authenticated requests, also add:

```
Authorization: Bearer {your_jwt_token}
```

---

## 📱 **Key Endpoints for Mobile Apps**

### **Authentication**
- `POST /auth/sso` - Mobile app login (no password needed)
- `GET /auth/profile` - Get user profile

### **Membership**
- `GET /membership/levels` - Get membership options
- `POST /membership/register` - Register new member
- `GET /membership/{id}` - Get member details

### **Payments**
- `POST /payments` - Create payment
- `GET /payments/subscriptions` - Get payment history

---

## 🎯 **Mobile App Integration Flow**

1. **User opens app** → Check if user is logged in
2. **Login required** → Use SSO endpoint with phone number
3. **Get user data** → Fetch profile and membership info
4. **Register member** → Use registration endpoint
5. **Handle payments** → Create payment records
6. **Sync data** → Keep local data updated

---

## 🔒 **Security Requirements**

- ✅ **API Key Required** - All requests need X-KEY header
- ✅ **HTTPS Only** - No HTTP requests allowed
- ✅ **Token Management** - Store JWT tokens securely
- ✅ **Input Validation** - Validate all user inputs
- ✅ **Error Handling** - Handle API errors gracefully

---

## 📞 **Support & Resources**

- **📧 Email**: admin@eyea.org
- **🌐 API Status**: https://apieyeamembership.eyea.et/status
- **📚 Full Docs**: See `API_DOCUMENTATION.md`
- **🧪 Test Collection**: Import `EYEA_Membership_API.postman_collection.json`

---

## 🚨 **Important Notes**

1. **API Key Security**: Never expose the API key in client-side code
2. **Token Expiration**: JWT tokens expire after 24 hours
3. **Rate Limiting**: API has rate limits (10 req/sec for API, 30 req/sec for frontend)
4. **CORS**: API supports cross-origin requests from authorized domains
5. **Data Validation**: Always validate data before sending to API

---

## 🎉 **Ready to Start!**

Your API is fully functional and ready for mobile app integration. Start with the Postman collection to test all endpoints, then integrate into your mobile app using the provided documentation.

**Happy coding! 🚀**

---

*Last Updated: August 1, 2025*
*API Version: 1.0*
*Status: Production Ready ✅* 