#!/bin/bash

# EYEA Environment Setup Script
# This script helps configure the environment for different deployment scenarios

echo "🚀 EYEA Environment Setup Script"
echo "================================"

# Function to create environment file
create_env_file() {
    local env_type=$1
    local filename=".env.${env_type}"
    
    echo "Creating ${filename}..."
    
    case $env_type in
        "local")
            cat > $filename << EOF
# Local Development Environment
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NODE_ENV=development
EOF
            ;;
        "dev")
            cat > $filename << EOF
# Development Environment
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NODE_ENV=development
EOF
            ;;
        "staging")
            cat > $filename << EOF
# Staging Environment
NEXT_PUBLIC_API_URL=http://apieyeamembership.eyea.et/v1
NODE_ENV=production
EOF
            ;;
        "prod")
            cat > $filename << EOF
# Production Environment
NEXT_PUBLIC_API_URL=https://apieyeamembership.eyea.et/v1
NODE_ENV=production
EOF
            ;;
    esac
    
    echo "✅ Created ${filename}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [local|dev|staging|prod]"
    echo ""
    echo "Options:"
    echo "  local    - Local development (localhost:3000 -> localhost:3001)"
    echo "  dev      - Development environment"
    echo "  staging  - Staging environment (http://apieyeamembership.eyea.et)"
    echo "  prod     - Production environment (https://apieyeamembership.eyea.et)"
    echo ""
    echo "Examples:"
    echo "  $0 local    # Setup for local development"
    echo "  $0 staging  # Setup for staging deployment"
    echo "  $0 prod     # Setup for production deployment"
}

# Main script logic
case $1 in
    "local")
        create_env_file "local"
        echo ""
        echo "🎯 Local Development Setup Complete!"
        echo "Frontend: http://localhost:3000"
        echo "Backend:  http://localhost:3001"
        echo ""
        echo "To start development:"
        echo "  npm run dev          # Frontend"
        echo "  cd backend && npm run start:dev  # Backend"
        ;;
    "dev")
        create_env_file "dev"
        echo ""
        echo "🔧 Development Environment Setup Complete!"
        echo "Use: docker-compose -f docker-compose.dev.yml up"
        ;;
    "staging")
        create_env_file "staging"
        echo ""
        echo "🚀 Staging Environment Setup Complete!"
        echo "Domain: http://apieyeamembership.eyea.et"
        echo "Use: docker-compose up"
        ;;
    "prod")
        create_env_file "prod"
        echo ""
        echo "🌐 Production Environment Setup Complete!"
        echo "Domain: https://apieyeamembership.eyea.et"
        echo "Use: docker-compose -f docker-compose.prod.yml up"
        ;;
    *)
        show_usage
        exit 1
        ;;
esac

echo ""
echo "📝 Next Steps:"
echo "1. Copy the generated .env file to your project root"
echo "2. Start the appropriate services"
echo "3. Test the API endpoints"
echo ""
echo "🔗 Test URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001/v1"
echo "- Health Check: http://localhost:3001/v1" 