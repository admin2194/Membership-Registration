# SSL/HTTPS Setup for EYEA Admin Portal

## Overview
This document describes the SSL/HTTPS implementation for the EYEA Organization admin portal at `apieyeamembership.eyea.et`.

## Current Status
✅ **SSL/HTTPS is now active and working!**

- **Domain**: `apieyeamembership.eyea.et`
- **HTTPS URL**: `https://apieyeamembership.eyea.et`
- **SSL Certificate**: Let's Encrypt (free, trusted)
- **Certificate Expiry**: October 30, 2025
- **Auto-renewal**: Configured via cron job

## Features Implemented

### 1. SSL Certificate
- **Provider**: Let's Encrypt
- **Type**: Domain Validated (DV)
- **Auto-renewal**: Every 90 days (Let's Encrypt standard)
- **Certificate Location**: `/etc/letsencrypt/live/apieyeamembership.eyea.et/`

### 2. HTTPS Configuration
- **Protocols**: TLSv1.2, TLSv1.3
- **Ciphers**: Strong encryption (ECDHE-RSA-AES256-GCM-SHA512, etc.)
- **HTTP/2**: Enabled for better performance
- **HSTS**: Strict Transport Security enabled

### 3. Security Headers
- `Strict-Transport-Security`: Forces HTTPS usage
- `X-Frame-Options`: Prevents clickjacking
- `X-XSS-Protection`: XSS protection
- `X-Content-Type-Options`: Prevents MIME sniffing
- `Content-Security-Policy`: Enhanced security policy
- `Referrer-Policy`: Controls referrer information

### 4. HTTP to HTTPS Redirect
- All HTTP requests are automatically redirected to HTTPS
- 301 permanent redirect for SEO benefits

## File Structure

```
Membership-Registration/
├── ssl/
│   ├── cert.pem          # SSL certificate
│   └── key.pem           # Private key
├── nginx.conf            # Updated nginx configuration
├── renew-ssl.sh          # SSL renewal script
└── SSL_SETUP.md          # This documentation
```

## Automatic Renewal

### Cron Job
A cron job has been set up to automatically renew SSL certificates:
```bash
# Runs daily at 12:00 PM
0 12 * * * cd /home/eyea/Membership-Registration && ./renew-ssl.sh >> /home/eyea/Membership-Registration/ssl-renewal.log 2>&1
```

### Manual Renewal
To manually renew certificates:
```bash
cd /home/eyea/Membership-Registration
./renew-ssl.sh
```

## Testing SSL Setup

### 1. HTTPS Connection
```bash
curl -I https://apieyeamembership.eyea.et
```

### 2. HTTP to HTTPS Redirect
```bash
curl -I http://apieyeamembership.eyea.et
```

### 3. Certificate Details
```bash
openssl s_client -connect apieyeamembership.eyea.et:443 -servername apieyeamembership.eyea.et < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

## Docker Services

The SSL setup is integrated with Docker Compose:

```yaml
# docker-compose.prod.yml
nginx:
  image: nginx:alpine
  ports:
    - "80:80"    # HTTP (redirects to HTTPS)
    - "443:443"  # HTTPS
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf:ro
    - ./ssl:/etc/nginx/ssl:ro
```

## Security Best Practices

1. **Certificate Management**: Automatic renewal prevents expiration
2. **Strong Ciphers**: Only modern, secure cipher suites
3. **Security Headers**: Comprehensive protection against common attacks
4. **HSTS**: Forces HTTPS usage for 1 year
5. **Content Security Policy**: Prevents XSS and other injection attacks

## Troubleshooting

### Certificate Expiry
If certificates expire:
1. Check renewal logs: `tail -f ssl-renewal.log`
2. Manual renewal: `./renew-ssl.sh`
3. Restart services: `docker-compose -f docker-compose.prod.yml restart nginx`

### Nginx Issues
If nginx fails to start:
1. Check configuration: `docker exec eyea-nginx-prod nginx -t`
2. Check logs: `docker logs eyea-nginx-prod`
3. Verify SSL files exist and have correct permissions

### Port Conflicts
If ports 80/443 are in use:
1. Check what's using them: `sudo netstat -tlnp | grep :80`
2. Stop conflicting services
3. Restart Docker containers

## Monitoring

### SSL Certificate Status
Monitor certificate expiry:
```bash
openssl s_client -connect apieyeamembership.eyea.et:443 -servername apieyeamembership.eyea.et < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

### Renewal Logs
Check automatic renewal status:
```bash
tail -f /home/eyea/Membership-Registration/ssl-renewal.log
```

## Benefits of HTTPS

1. **Security**: Encrypted communication between client and server
2. **Trust**: Browser shows secure padlock icon
3. **SEO**: Google favors HTTPS sites
4. **Performance**: HTTP/2 support for faster loading
5. **Compliance**: Meets security standards and regulations

## Next Steps

1. **Monitor**: Keep an eye on renewal logs
2. **Backup**: Consider backing up SSL certificates
3. **Monitoring**: Set up alerts for certificate expiry
4. **Documentation**: Update team documentation

---

**Last Updated**: August 1, 2025
**Status**: ✅ Active and Working
**Next Renewal**: October 30, 2025 (Automatic) 