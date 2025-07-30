# API Pagination Guide

## Overview

The EYEA Membership API now supports pagination for better performance and user experience when dealing with large datasets. All paginated endpoints are available at `http://apieyeamembership.eyea.et`.

## Pagination Parameters

All paginated endpoints accept the following query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number (starts from 1) |
| `limit` | number | 10 | Number of items per page (max 100) |
| `search` | string | - | Search term for filtering results |
| `sortBy` | string | createdAt | Field to sort by |
| `sortOrder` | string | desc | Sort order: `asc` or `desc` |

## Available Endpoints

### 1. Get All Users (Paginated)
```
GET /v1/users?page=1&limit=10&search=john&sortBy=fullName&sortOrder=asc
```

**Response:**
```json
{
  "data": [
    {
      "id": "user_id",
      "fullName": "John Doe",
      "phone": "+251912345678"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": false
  },
  "success": true
}
```

### 2. Get All Memberships (Paginated)
```
GET /v1/membership?page=1&limit=20&search=growth&sortBy=createdAt&sortOrder=desc
```

**Response:**
```json
{
  "data": [
    {
      "id": "membership_id",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phoneNumber": "+251912345679",
      "membershipLevelId": 2,
      "jobTitle": "CEO",
      "sectors": ["Technology", "Finance"],
      "needs": ["Networking", "Mentorship"],
      "userId": {
        "id": "user_id",
        "fullName": "Jane Smith",
        "phone": "+251912345679"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 85,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "success": true
}
```

## Search Functionality

The search parameter supports searching across multiple fields:

- **Users**: `fullName`, `phone`
- **Memberships**: `fullName`, `email`, `phoneNumber`, `faydaId`

Search is case-insensitive and uses partial matching.

## Sorting Options

### Users
- `fullName` - Sort by user's full name
- `createdAt` - Sort by creation date (default)
- `phone` - Sort by phone number

### Memberships
- `fullName` - Sort by member's full name
- `createdAt` - Sort by creation date (default)
- `email` - Sort by email address
- `membershipLevelId` - Sort by membership level
- `jobTitle` - Sort by job title

## Example Usage

### Get first page of users with 15 items per page
```
GET http://apieyeamembership.eyea.et/v1/users?page=1&limit=15
```

### Search for memberships containing "tech" in any searchable field
```
GET http://apieyeamembership.eyea.et/v1/membership?search=tech&page=1&limit=10
```

### Get memberships sorted by job title in ascending order
```
GET http://apieyeamembership.eyea.et/v1/membership?sortBy=jobTitle&sortOrder=asc&page=1&limit=20
```

### Get second page of users with custom search and sorting
```
GET http://apieyeamembership.eyea.et/v1/users?page=2&limit=10&search=john&sortBy=fullName&sortOrder=asc
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success with data
- `400` - Invalid pagination parameters
- `401` - Unauthorized (for protected endpoints)
- `500` - Server error

## Rate Limiting

- API endpoints: 10 requests per second
- Frontend endpoints: 30 requests per second

## Authentication

Most paginated endpoints require JWT authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## CORS Configuration

The API is configured to accept requests from `http://apieyeamembership.eyea.et` and supports the following methods:
- GET
- POST
- PUT
- DELETE
- OPTIONS 