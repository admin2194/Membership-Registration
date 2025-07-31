# 🌐 EYEA Environment Setup Guide

This guide explains how to configure the EYEA Membership Registration System for different environments.

## 🎯 Supported Environments

### 1. **Local Development** (`localhost:3000`)
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Database: Local MongoDB or Cloud MongoDB

### 2. **Staging** (`http://apieyeamembership.eyea.et`)
- Frontend: `http://apieyeamembership.eyea.et`
- Backend: `http://apieyeamembership.eyea.et/v1`
- Database: Cloud MongoDB

### 3. **Production** (`https://apieyeamembership.eyea.et`)
- Frontend: `https://apieyeamembership.eyea.et`
- Backend: `https://apieyeamembership.eyea.et/v1`
- Database: Cloud MongoDB

## 🚀 Quick Setup

### Option 1: Using Setup Script
```bash
# Local development
./setup-env.sh local

# Staging deployment
./setup-env.sh staging

# Production deployment
./setup-env.sh prod
```

### Option 2: Manual Setup

#### Local Development
```bash
# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NODE_ENV=development
EOF

# Start services
npm run dev                    # Frontend
cd backend && npm run start:dev  # Backend
```

#### Staging/Production
```bash
# Create .env.production
cat > .env.production << EOF
NEXT_PUBLIC_API_URL=https://apieyeamembership.eyea.et/v1
NODE_ENV=production
EOF

# Start with Docker
docker-compose -f docker-compose.prod.yml up
```

## 🔧 Environment Variables

### Frontend Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/v1` |
| `NODE_ENV` | Environment | `development` or `production` |

### Backend Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/eyea` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `API_KEY` | API authentication | `eyea-api-key-2024` |
| `PORT` | Server port | `3001` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

## 🐳 Docker Deployment

### Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Access services
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# MongoDB: localhost:27017
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up

# Access services
# Frontend: https://apieyeamembership.eyea.et
# Backend: https://apieyeamembership.eyea.et/v1
```

## 🔍 Testing Your Setup

### 1. Check Frontend
```bash
curl http://localhost:3000
# Should return the EYEA login page
```

### 2. Check Backend API
```bash
curl http://localhost:3001/v1
# Should return "Hello World!"
```

### 3. Test Authentication
```bash
# Admin login
curl -X POST http://localhost:3001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eyea.org","password":"admin123"}'

# SSO login
curl -X POST http://localhost:3001/v1/auth/sso \
  -H "Content-Type: application/json" \
  -H "X-KEY: eyea-api-key-2024" \
  -d '{"fullName":"Test User","phoneNumber":"251742219814"}'
```

## 🔐 Default Credentials

### Admin Login
- **Email**: `admin@eyea.org`
- **Password**: `admin123`

### API Key
- **Key**: `eyea-api-key-2024`
- **Header**: `X-KEY: eyea-api-key-2024`

## 🚨 Troubleshooting

### CORS Errors
If you see CORS errors, check:
1. Backend CORS configuration in `backend/src/main.ts`
2. Frontend API URL in environment variables
3. Domain is included in allowed origins

### Database Connection
If database connection fails:
1. Check MongoDB URI in environment variables
2. Ensure MongoDB is running
3. Verify network connectivity

### Port Conflicts
If ports are already in use:
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

## 📊 Environment Matrix

| Environment | Frontend URL | Backend URL | Database | CORS Origins |
|-------------|--------------|-------------|----------|--------------|
| Local Dev | `http://localhost:3000` | `http://localhost:3001` | Local/Cloud | `localhost:3000` |
| Staging | `http://apieyeamembership.eyea.et` | `http://apieyeamembership.eyea.et/v1` | Cloud | `apieyeamembership.eyea.et` |
| Production | `https://apieyeamembership.eyea.et` | `https://apieyeamembership.eyea.et/v1` | Cloud | `apieyeamembership.eyea.et` |

## 🎉 Success Indicators

✅ **Frontend loads without errors**
✅ **Backend API responds to health check**
✅ **Admin login works**
✅ **SSO login works**
✅ **Dashboard loads with data**
✅ **No CORS errors in browser console**

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the logs: `docker-compose logs`
3. Verify environment variables are set correctly
4. Ensure all services are running

**Happy coding! 🚀** 