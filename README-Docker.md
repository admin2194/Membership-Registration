# EYEA Docker Setup Guide

This guide will help you set up and run the EYEA Organization Membership System using Docker.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- MongoDB Atlas account (for production)
- Node.js 18+ (for local development)

### 1. Initial Setup

```bash
# Make the setup script executable
chmod +x docker-setup.sh

# Run initial setup
./docker-setup.sh setup
```

### 2. Configure Environment

Edit the `.env` file with your configuration:

```bash
# Copy the example file
cp env.production.example .env

# Edit with your values
nano .env
```

**Important Environment Variables:**

```env
# MongoDB Atlas Connection (Production)
MONGODB_URI=mongodb+srv://admin:ZLwu373CdpGCx8wc@cluster0.rjill6e.mongodb.net/?retrywrites=true&w=majority&appName=Cluster0

# JWT Secret (CHANGE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# API Key
API_KEY=eyea-api-key-2024

# Admin User (for seeding)
ADMIN_EMAIL=admin@eyea.org
ADMIN_PASSWORD=admin123
ADMIN_PHONE=+251911234567
```

### 3. Start Services

#### Development Mode (with hot reloading)
```bash
./docker-setup.sh start dev
```

#### Production Mode
```bash
./docker-setup.sh start prod
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/v1
- **Admin Login**: Use the credentials from your `.env` file

## 📁 Docker Compose Files

### Main Files

- `docker-compose.yml` - Default configuration
- `docker-compose.dev.yml` - Development with hot reloading
- `docker-compose.prod.yml` - Production with MongoDB Atlas

### Dockerfiles

- `backend/Dockerfile` - Production backend
- `backend/Dockerfile.dev` - Development backend
- `Dockerfile.frontend` - Production frontend
- `Dockerfile.frontend.dev` - Development frontend

## 🔧 Available Commands

```bash
# Start services
./docker-setup.sh start dev      # Development mode
./docker-setup.sh start prod     # Production mode

# Stop services
./docker-setup.sh stop dev
./docker-setup.sh stop prod

# Restart services
./docker-setup.sh restart dev
./docker-setup.sh restart prod

# View logs
./docker-setup.sh logs backend
./docker-setup.sh logs frontend

# Check status
./docker-setup.sh status dev
./docker-setup.sh status prod

# Cleanup everything
./docker-setup.sh cleanup
```

## 🗄️ Database Setup

### MongoDB Atlas (Production)

The application is configured to use MongoDB Atlas. The connection string is already set up in the environment files.

### Local MongoDB (Development)

For development, a local MongoDB instance is included in the Docker Compose setup:

```bash
# Start with local MongoDB
./docker-setup.sh start dev
```

## 🔐 Admin User Seeding

The application automatically seeds an admin user on startup:

- **Email**: `admin@eyea.org` (configurable via `ADMIN_EMAIL`)
- **Password**: `admin123` (configurable via `ADMIN_PASSWORD`)
- **Phone**: `+251911234567` (configurable via `ADMIN_PHONE`)

## 📊 Monitoring & Health Checks

### Health Check Endpoints

- **Backend**: http://localhost:3001/v1/health
- **Frontend**: http://localhost:3000

### Docker Health Checks

All services include health checks that monitor:
- Service availability
- Response times
- Resource usage

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :3001
   ```

2. **MongoDB connection issues**
   ```bash
   # Check MongoDB logs
   ./docker-setup.sh logs mongodb-local
   ```

3. **Build failures**
   ```bash
   # Clean and rebuild
   ./docker-setup.sh cleanup
   ./docker-setup.sh start dev
   ```

### Logs

View logs for specific services:

```bash
# Backend logs
./docker-setup.sh logs backend

# Frontend logs
./docker-setup.sh logs frontend

# All logs
docker-compose logs -f
```

### Resource Usage

Monitor resource usage:

```bash
# Check container resource usage
docker stats

# Check disk usage
docker system df
```

## 🚀 Production Deployment

### 1. Environment Configuration

```bash
# Copy production environment
cp env.production.example .env

# Edit with production values
nano .env
```

### 2. SSL Configuration (Optional)

For HTTPS, configure SSL certificates:

```bash
# Create SSL directory
mkdir ssl

# Add your certificates
cp your-cert.pem ssl/cert.pem
cp your-key.pem ssl/key.pem

# Update nginx.conf with your domain
nano nginx.conf
```

### 3. Start Production Services

```bash
./docker-setup.sh start prod
```

### 4. Monitoring

```bash
# Check service status
./docker-setup.sh status prod

# Monitor logs
./docker-setup.sh logs backend
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale backend services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Scale frontend services
docker-compose -f docker-compose.prod.yml up -d --scale frontend=2
```

### Resource Limits

Resource limits are configured in `docker-compose.prod.yml`:

- **Backend**: 512MB RAM, 0.5 CPU
- **Frontend**: 1GB RAM, 0.75 CPU
- **Redis**: 512MB RAM, 0.25 CPU
- **Nginx**: 256MB RAM, 0.25 CPU

## 🔄 Updates & Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
./docker-setup.sh restart prod
```

### Database Backups

```bash
# Backup MongoDB (if using local instance)
docker exec eyea-mongodb-dev mongodump --out /backup

# Copy backup from container
docker cp eyea-mongodb-dev:/backup ./backup
```

### Cleanup

```bash
# Remove unused resources
docker system prune -f

# Full cleanup
./docker-setup.sh cleanup
```

## 📞 Support

For issues or questions:

1. Check the logs: `./docker-setup.sh logs [service]`
2. Verify environment configuration
3. Check Docker and Docker Compose versions
4. Review the troubleshooting section above

## 🔗 Useful Links

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs) 