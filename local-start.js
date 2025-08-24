#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Pi Tetris Local Setup');
console.log('========================\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found!');
  console.log('📝 Creating .env file from template...\n');
  
  const envExample = `# Database Configuration (REQUIRED - Replace with your database details)
DATABASE_URL="postgresql://username:password@localhost:5432/pi_tetris_dev"

# Session Secret (REQUIRED - Generate a random string)
SESSION_SECRET="change-this-to-a-random-secret-key"

# Local Development Settings
NODE_ENV="development"
PORT=5000

# Replit Compatibility (can use dummy values)
REPL_ID="local-development"
REPLIT_DOMAINS="localhost:5000"
ISSUER_URL="https://replit.com/oidc"`;

  fs.writeFileSync(envPath, envExample);
  
  console.log('✅ .env file created!');
  console.log('🔧 Please edit .env file with your database details before continuing.\n');
  console.log('💡 Example database URL: postgresql://postgres:yourpassword@localhost:5432/pi_tetris_dev\n');
  process.exit(0);
}

// Check if dependencies are installed
console.log('📦 Checking dependencies...');
try {
  execSync('node -e "require(\'express\')"', { stdio: 'ignore' });
  console.log('✅ Dependencies are installed\n');
} catch (error) {
  console.log('⚠️  Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
}

console.log('🗄️  Setting up database schema...');
try {
  execSync('npm run db:push', { stdio: 'inherit' });
  console.log('✅ Database schema ready\n');
} catch (error) {
  console.log('❌ Database setup failed. Please check your DATABASE_URL in .env file');
  console.log('💡 Make sure PostgreSQL is running and the database exists\n');
  process.exit(1);
}

console.log('🎉 Starting Pi Tetris development server...\n');
console.log('🌐 Website: http://localhost:5000');
console.log('⚙️  Admin Panel: http://localhost:5000/admin');
console.log('🔧 Authentication is disabled for local development\n');

// Start the development server
execSync('npm run dev', { stdio: 'inherit' });