#!/bin/bash

# EYEA Docker Setup Script
# This script helps you set up and run the EYEA application using Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    print_success "Docker and Docker Compose are installed"
}

# Function to create environment file
create_env_file() {
    if [ ! -f ".env" ]; then
        print_status "Creating .env file from template..."
        cp env.production.example .env
        print_success "Created .env file. Please edit it with your production values."
    else
        print_warning ".env file already exists"
    fi
}

# Function to build and start services
start_services() {
    local mode=$1
    
    case $mode in
        "dev")
            print_status "Starting development environment..."
            docker-compose -f docker-compose.dev.yml up --build -d
            ;;
        "prod")
            print_status "Starting production environment..."
            docker-compose -f docker-compose.prod.yml up --build -d
            ;;
        *)
            print_status "Starting default environment..."
            docker-compose up --build -d
            ;;
    esac
}

# Function to stop services
stop_services() {
    local mode=$1
    
    case $mode in
        "dev")
            docker-compose -f docker-compose.dev.yml down
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml down
            ;;
        *)
            docker-compose down
            ;;
    esac
    
    print_success "Services stopped"
}

# Function to show logs
show_logs() {
    local service=$1
    local mode=$2
    
    case $mode in
        "dev")
            docker-compose -f docker-compose.dev.yml logs -f $service
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml logs -f $service
            ;;
        *)
            docker-compose logs -f $service
            ;;
    esac
}

# Function to show status
show_status() {
    local mode=$1
    
    case $mode in
        "dev")
            docker-compose -f docker-compose.dev.yml ps
            ;;
        "prod")
            docker-compose -f docker-compose.prod.yml ps
            ;;
        *)
            docker-compose ps
            ;;
    esac
}

# Function to clean up
cleanup() {
    print_warning "This will remove all containers, networks, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        docker-compose down -v --remove-orphans
        docker system prune -f
        print_success "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Function to show help
show_help() {
    echo "EYEA Docker Setup Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start [dev|prod]    Start services (default: dev)"
    echo "  stop [dev|prod]     Stop services (default: dev)"
    echo "  restart [dev|prod]  Restart services (default: dev)"
    echo "  logs [service]      Show logs for a service"
    echo "  status [dev|prod]   Show service status"
    echo "  cleanup             Remove all containers and volumes"
    echo "  setup               Initial setup (check Docker, create .env)"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup"
    echo "  $0 start dev"
    echo "  $0 start prod"
    echo "  $0 logs backend"
    echo "  $0 status"
}

# Main script logic
case "${1:-help}" in
    "setup")
        print_status "Running initial setup..."
        check_docker
        create_env_file
        print_success "Setup completed!"
        print_status "Next steps:"
        print_status "1. Edit .env file with your configuration"
        print_status "2. Run: $0 start dev"
        ;;
    "start")
        check_docker
        create_env_file
        start_services "${2:-dev}"
        print_success "Services started successfully!"
        print_status "Frontend: http://localhost:3000"
        print_status "Backend API: http://localhost:3001/v1"
        print_status "Use '$0 logs [service]' to view logs"
        ;;
    "stop")
        stop_services "${2:-dev}"
        ;;
    "restart")
        stop_services "${2:-dev}"
        sleep 2
        start_services "${2:-dev}"
        print_success "Services restarted successfully!"
        ;;
    "logs")
        show_logs "${2:-}" "${3:-dev}"
        ;;
    "status")
        show_status "${2:-dev}"
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|*)
        show_help
        ;;
esac 