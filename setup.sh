#!/bin/bash

# ReaderX Setup Script
# This script helps new team members set up the development environment

echo "🌎 Setting up ReaderX Development Environment..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (version 14 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="14.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to version 14 or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Set up environment variables
if [ ! -f ".env" ]; then
    echo "🔧 Setting up environment variables..."
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  IMPORTANT: Please edit .env and add your actual API keys:"
    echo "   - REACT_APP_SUPABASE_URL"
    echo "   - REACT_APP_SUPABASE_ANON_KEY" 
    echo "   - REACT_APP_GOOGLE_TRANSLATE_API_KEY"
else
    echo "✅ .env file already exists"
fi

# Check if all required environment variables are set
echo "🔍 Checking environment configuration..."
source .env

missing_vars=()

if [[ "$REACT_APP_SUPABASE_URL" == *"your_supabase_project_url"* ]]; then
    missing_vars+=("REACT_APP_SUPABASE_URL")
fi

if [[ "$REACT_APP_SUPABASE_ANON_KEY" == *"your_supabase_anon_key"* ]]; then
    missing_vars+=("REACT_APP_SUPABASE_ANON_KEY")
fi

if [[ "$REACT_APP_GOOGLE_TRANSLATE_API_KEY" == *"your_google_translate_api_key"* ]]; then
    missing_vars+=("REACT_APP_GOOGLE_TRANSLATE_API_KEY")
fi

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "⚠️  The following environment variables need to be configured:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please edit .env and replace the placeholder values with your actual API keys."
    echo "Refer to the README.md for instructions on obtaining these keys."
else
    echo "✅ All environment variables are configured"
fi

echo ""
echo "🚀 Setup complete! You can now run:"
echo "   npm start    # Start development server"
echo "   npm test     # Run tests"
echo "   npm run build # Build for production"
echo ""
echo "📖 For more information, see README.md"
