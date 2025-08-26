# 🚀 EYEA Membership API - Production Setup Guide

## ✅ **Production Status: LIVE** 

### **Production URL**: `https://apieyeamembership.eyea.et/v1`
- **Status**: ✅ Active and responding
- **SSL**: ✅ HTTPS enabled
- **API Key**: ✅ Configured
- **Authentication**: ✅ Working

## 📊 **Production Environment Details**

### **Services Running:**
- **Backend**: `eyea-backend-prod` (Port 3001)
- **Frontend**: `eyea-frontend-prod` (Port 3000)
- **Nginx**: `eyea-nginx-prod` (Ports 80/443)
- **Redis**: `eyea-redis-prod` (Port 6379)

### **SSL Configuration:**
- **Certificate**: `ssl/cert.pem`
- **Private Key**: `ssl/key.pem`
- **Protocols**: TLSv1.2, TLSv1.3
- **Security Headers**: HSTS, X-Frame-Options, etc.

## 🔧 **Production Setup Commands**

### **Start Production Environment:**
```bash
cd /home/eyea/Membership-Registration
docker-compose -f docker-compose.prod.yml up -d
```

### **Check Production Status:**
```bash
docker-compose -f docker-compose.prod.yml ps
```

### **View Production Logs:**
```bash
# Backend logs
docker logs eyea-backend-prod

# Nginx logs
docker logs eyea-nginx-prod

# All services
docker-compose -f docker-compose.prod.yml logs
```

### **Restart Production Services:**
```bash
docker-compose -f docker-compose.prod.yml restart
```

## 🧪 **Production API Testing**

### **Test Health Endpoint:**
```bash
curl -k https://apieyeamembership.eyea.et/v1/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-08-18T19:31:38.596Z",
  "service": "EYEA Backend API",
  "version": "1.0.0"
}
```

### **Test Authentication:**
```bash
curl -k -H "X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY" \
  https://apieyeamembership.eyea.et/v1/auth/test
```

### **Test Admin Login:**
```bash
curl -k -X POST \
  -H "Content-Type: application/json" \
  -H "X-KEY: 0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY" \
  -d '{"email":"admin@eyea.org","password":"admin123"}' \
  https://apieyeamembership.eyea.et/v1/auth/login
```

## 📦 **Postman Production Setup**

### **Files Available:**
1. **Collection**: `EYEA_Membership_API.postman_collection.json`
2. **Environment**: `EYEA_Membership_API_Production.postman_environment.json`

### **Setup Steps:**

#### **Step 1: Import Collection**
1. Open Postman
2. Click **Import**
3. Select: `EYEA_Membership_API.postman_collection.json`

#### **Step 2: Import Environment**
1. Click **Import**
2. Select: `EYEA_Membership_API_Production.postman_environment.json`
3. Select the environment from dropdown (top-right)

#### **Step 3: Test Production API**
1. Go to **Authentication → Test API Connection**
2. Click **Send**
3. Should return: `{"message":"Auth controller is working"}`

## 🔐 **Production Security**

### **API Key:**
- **Key**: `0A9PRT4UaiwLAXllAOwm29683ocYyIpjLeo1bcgTIY`
- **Header**: `X-KEY`
- **Status**: ✅ Active

### **Admin Credentials:**
- **Email**: `admin@eyea.org`
- **Password**: `admin123`
- **Status**: ✅ Seeded and ready

### **SSL/TLS:**
- **Certificate**: Valid SSL certificate
- **Protocols**: TLSv1.2, TLSv1.3
- **Security Headers**: Configured

## 📊 **Available Production Endpoints**

### **🔐 Authentication (5 endpoints)**
- ✅ `POST /v1/auth/login` - Admin login
- ✅ `POST /v1/auth/sso` - SSO login
- ✅ `GET /v1/auth/profile` - Get user profile
- ✅ `POST /v1/auth/change-password` - Change password
- ✅ `GET /v1/auth/test` - Test API connection

### **👥 Membership Management (6 endpoints)**
- ✅ `GET /v1/membership/levels` - Get membership levels
- ✅ `POST /v1/membership/register` - Register new member
- ✅ `GET /v1/membership` - Get all members
- ✅ `GET /v1/membership/:id` - Get member by ID
- ✅ `PUT /v1/membership/:id` - Update member
- ✅ `DELETE /v1/membership/:id` - Delete member

### **💳 Payments (2 endpoints)**
- ✅ `GET /v1/payments/subscriptions` - Get subscription payments
- ✅ `POST /v1/payments` - Create payment

### **🎁 Donations (2 endpoints)**
- ✅ `GET /v1/donation/history` - Get donation history
- ✅ `POST /v1/donation` - Create donation

### **📊 Analytics (2 endpoints)**
- ✅ `GET /v1/analytics/dashboard` - Get dashboard stats
- ✅ `GET /v1/analytics/data` - Get analytics data

## 🔍 **Production Monitoring**

### **Health Check:**
```bash
curl -k https://apieyeamembership.eyea.et/v1/health
```

### **Service Status:**
```bash
docker-compose -f docker-compose.prod.yml ps
```

### **Log Monitoring:**
```bash
# Real-time logs
docker-compose -f docker-compose.prod.yml logs -f

# Backend logs only
docker logs -f eyea-backend-prod
```

## 🚨 **Troubleshooting Production**

### **Common Issues:**

#### **1. SSL Certificate Issues**
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Renew certificate if needed
./renew-ssl.sh
```

#### **2. Service Not Responding**
```bash
# Restart services
docker-compose -f docker-compose.prod.yml restart

# Check logs
docker logs eyea-backend-prod --tail 50
```

#### **3. Database Connection Issues**
```bash
# Check MongoDB connection
docker exec eyea-backend-prod npm run test:mongo
```

## 📞 **Production Support**

### **Emergency Contacts:**
- **Backend Issues**: Check logs first
- **SSL Issues**: Check certificate expiration
- **Database Issues**: Check MongoDB Atlas connection

### **Useful Commands:**
```bash
# Full system restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

# Check all services
docker-compose -f docker-compose.prod.yml ps

# View all logs
docker-compose -f docker-compose.prod.yml logs
```

---

## 🎉 **Production is Live!**

Your EYEA Membership API is now running in production at:
**https://apieyeamembership.eyea.et/v1**

**Ready for production use! 🚀**

---

*Last Updated: August 18, 2025*
*Production Status: ✅ Live*
*SSL Status: ✅ Active*


