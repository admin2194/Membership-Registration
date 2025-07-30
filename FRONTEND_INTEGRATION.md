# Frontend-Backend Integration

## Overview
The EYEYA frontend (Next.js) has been successfully integrated with the backend (NestJS) API.

## Configuration

### Environment Variables
The frontend is configured to connect to the backend via the `NEXT_PUBLIC_API_URL` environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
```

### API Client
The integration uses a centralized API client (`lib/api.ts`) that handles:
- Authentication headers
- Error handling
- Request/response formatting
- Base URL configuration

## Authentication

### Admin Login
- **Endpoint**: `POST /v1/auth/login`
- **Credentials**: 
  - Email: `admin@eyea.com`
  - Password: `admin123`
- **Component**: `components/admin-login-form.tsx`

### SSO Login
- **Endpoint**: `POST /v1/auth/sso`
- **Headers**: `X-KEY: test-api-key`
- **Component**: `components/login-form.tsx`

## Key Components Updated

### 1. API Client (`lib/api.ts`)
- Centralized API communication
- Automatic JWT token handling
- Error handling and response formatting
- Support for all backend endpoints

### 2. Authentication Store (`lib/auth.ts`)
- Zustand-based state management
- Persistent authentication state
- Support for both admin and SSO login
- Automatic token management

### 3. Dashboard (`app/dashboard/page.tsx`)
- Integrated with auth system
- Real-time data fetching from backend
- Protected routes with authentication checks
- User profile display

### 4. Login Forms
- **Admin Login**: `components/admin-login-form.tsx`
- **SSO Login**: `components/login-form.tsx`
- Both forms integrated with auth system

## Available Endpoints

### Authentication
- `POST /v1/auth/login` - Admin login
- `POST /v1/auth/sso` - SSO login
- `GET /v1/auth/profile` - Get user profile

### Membership
- `GET /v1/membership/levels` - Get membership levels
- `POST /v1/membership/register` - Register membership

### Payments
- `GET /v1/payments/subscriptions` - Get subscription payments

### Donations
- `GET /v1/donation/history` - Get donation history
- `POST /v1/donation` - Submit donation

### Users
- `GET /v1/users` - Get users list

## Testing

### API Test Component
A test component (`components/api-test.tsx`) is available to verify:
- Basic API connectivity
- Admin login functionality
- SSO login functionality
- Membership levels fetching
- Donation history fetching

### Test Page
Visit `/test` to run the API integration tests.

## Running the Application

### Backend
```bash
cd backend
npm run start:dev
```

### Frontend
```bash
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/v1
- **Test Page**: http://localhost:3000/test

## Development Notes

### CORS Configuration
The backend is configured to allow requests from `http://localhost:3000`.

### Authentication Flow
1. User logs in via admin or SSO form
2. JWT token is stored in Zustand state
3. Token is automatically included in API requests
4. Protected routes check authentication status
5. Dashboard fetches real data from backend

### Error Handling
- Network errors are caught and displayed
- Authentication failures redirect to login
- API errors show user-friendly messages

## Next Steps

1. **Add more dashboard features** using the available API endpoints
2. **Implement real-time updates** for payment and donation data
3. **Add user management** features for admin users
4. **Implement membership registration** forms
5. **Add donation submission** functionality
6. **Create user profiles** and settings pages 