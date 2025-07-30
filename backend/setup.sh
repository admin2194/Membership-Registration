#!/bin/bash

echo "🚀 Setting up EYEYA Backend API..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Create MongoDB data directory if it doesn't exist
if [ ! -d data ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
fi

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Start MongoDB (if not already running)"
echo "3. Run 'npm run start:dev' to start the development server"
echo "4. Test the API with 'node test-api.js'"
echo ""
echo "Default admin credentials:"
echo "Email: admin@eyea.com"
echo "Password: admin123" 