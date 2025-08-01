# API Key Management Guide - EYEA Membership System

## 🔑 What is an API Key?

An API key is a secret token that provides authentication and authorization for accessing the EYEA Membership API. It's used to:
- Authenticate API requests
- Control access to protected endpoints
- Track API usage
- Prevent unauthorized access

## 🚀 How to Create and Manage API Keys

### 1. **Current API Key Setup**

The system currently uses a **single API key** defined in environment variables:

```bash
# In your .env file
API_KEY=eyea-api-key-2024
```

### 2. **Setting Up Your API Key**

#### **Step 1: Create a Strong API Key**
Generate a secure API key using one of these methods:

**Option A: Using OpenSSL (Recommended)**
```bash
openssl rand -base64 32
```

**Option B: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option C: Using Online Generator**
- Visit: https://generate-secret.vercel.app/32
- Copy the generated key

#### **Step 2: Update Environment Variables**

**For Development:**
```bash
# backend/.env
API_KEY=your-generated-api-key-here
```

**For Production:**
```bash
# Set in your production environment
API_KEY=your-generated-api-key-here
```

#### **Step 3: Update Docker Environment**
```bash
# docker-compose.yml or docker-compose.prod.yml
environment:
  - API_KEY=your-generated-api-key-here
```

### 3. **Using API Keys in Requests**

#### **Header Format:**
```
X-KEY: your-api-key-here
```

#### **Example cURL Request:**
```bash
curl -X POST "https://apieyeamembership.eyea.et/v1/auth/sso" \
  -H "Content-Type: application/json" \
  -H "X-KEY: your-api-key-here" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "+251912345678"
  }'
```

#### **Example Postman:**
1. Add header: `X-KEY: your-api-key-here`
2. Or use environment variable: `X-KEY: {{api_key}}`

## 🔒 Security Best Practices

### 1. **API Key Security**
- ✅ Use strong, randomly generated keys (32+ characters)
- ✅ Store keys in environment variables, never in code
- ✅ Rotate keys regularly (every 90 days)
- ✅ Use different keys for development and production
- ❌ Never commit API keys to version control
- ❌ Never share API keys publicly

### 2. **Environment Management**
```bash
# Development (.env.development)
API_KEY=dev-eyea-api-key-2024-dev

# Production (.env.production)
API_KEY=prod-eyea-api-key-2024-prod-secure
```

### 3. **Access Control**
- Limit API key access to authorized personnel only
- Monitor API usage for suspicious activity
- Implement rate limiting for API endpoints
- Log all API key usage for audit purposes

## 🛠️ Advanced API Key Management

### 1. **Multiple API Keys (Future Enhancement)**

For better security, you can implement multiple API keys:

```typescript
// backend/src/auth.service.ts
const VALID_API_KEYS = [
  process.env.API_KEY_1,
  process.env.API_KEY_2,
  process.env.API_KEY_3
];

async validateApiKey(apiKey: string): Promise<boolean> {
  return VALID_API_KEYS.includes(apiKey);
}
```

### 2. **API Key with Expiration**
```typescript
// Enhanced API key structure
interface ApiKey {
  key: string;
  name: string;
  expiresAt: Date;
  permissions: string[];
  createdBy: string;
}
```

### 3. **API Key Usage Tracking**
```typescript
// Track API key usage
interface ApiKeyUsage {
  key: string;
  endpoint: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}
```

## 📋 API Key Implementation Examples

### 1. **Backend Validation (Current)**
```typescript
// backend/src/auth.service.ts
async sso(fullName: string, phoneNumber: string, apiKey: string) {
  if (apiKey !== process.env.API_KEY) {
    throw new UnauthorizedException('Invalid API key');
  }
  // ... rest of the method
}
```

### 2. **Frontend Usage**
```typescript
// lib/api.ts
private async request(endpoint: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-KEY': process.env.NEXT_PUBLIC_API_KEY || 'your-api-key',
    ...options.headers,
  };
  // ... rest of the method
}
```

### 3. **Middleware Validation**
```typescript
// backend/src/api-key.guard.ts
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-key'];
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
    
    return true;
  }
}
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. **"Invalid API key" Error**
- Check if API key is correctly set in environment variables
- Verify the key is being sent in the `X-KEY` header
- Ensure no extra spaces or characters in the key

#### 2. **"API key is required" Error**
- Make sure you're sending the `X-KEY` header
- Check if the header name is exactly `X-KEY` (case-sensitive)

#### 3. **Environment Variable Not Loading**
```bash
# Restart your application after changing environment variables
npm run dev
# or
docker-compose down && docker-compose up
```

## 📊 API Key Monitoring

### 1. **Usage Logging**
```typescript
// Log API key usage
console.log(`API Key used: ${apiKey.substring(0, 8)}...`);
console.log(`Endpoint: ${endpoint}`);
console.log(`Timestamp: ${new Date().toISOString()}`);
```

### 2. **Rate Limiting**
```typescript
// Implement rate limiting per API key
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each API key to 100 requests per windowMs
};
```

## 🚨 Emergency Procedures

### 1. **API Key Compromise**
If your API key is compromised:
1. **Immediately** generate a new API key
2. Update all environment variables
3. Restart all services
4. Monitor for suspicious activity
5. Update all client applications

### 2. **Key Rotation Process**
```bash
# 1. Generate new key
openssl rand -base64 32

# 2. Update environment variables
# 3. Deploy to staging first
# 4. Test thoroughly
# 5. Deploy to production
# 6. Monitor for errors
# 7. Remove old key after 24 hours
```

## 📞 Support

For API key issues:
1. Check this guide first
2. Verify environment variables
3. Test with a simple cURL request
4. Check application logs
5. Contact the development team

---

**Remember: Keep your API keys secure and never share them publicly! 🔐** 