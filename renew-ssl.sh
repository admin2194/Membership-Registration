#!/bin/bash

# SSL Certificate Renewal Script for EYEA Admin Portal
# This script renews Let's Encrypt certificates and copies them to the SSL directory

echo "Starting SSL certificate renewal process..."

# Renew certificates
sudo certbot renew --quiet

# Check if renewal was successful
if [ $? -eq 0 ]; then
    echo "SSL certificates renewed successfully!"
    
    # Copy renewed certificates to SSL directory
    sudo cp /etc/letsencrypt/live/apieyeamembership.eyea.et/fullchain.pem ssl/cert.pem
    sudo cp /etc/letsencrypt/live/apieyeamembership.eyea.et/privkey.pem ssl/key.pem
    
    # Set proper permissions
    sudo chown -R $USER:$USER ssl/
    chmod 600 ssl/key.pem
    chmod 644 ssl/cert.pem
    
    echo "Certificates copied to SSL directory with proper permissions."
    
    # Reload nginx to use new certificates
    if docker ps | grep -q eyea-nginx-prod; then
        echo "Reloading nginx container..."
        docker exec eyea-nginx-prod nginx -s reload
        echo "Nginx reloaded successfully!"
    else
        echo "Nginx container not running. Please restart the services."
    fi
else
    echo "SSL certificate renewal failed!"
    exit 1
fi

echo "SSL renewal process completed!" 