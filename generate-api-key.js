#!/usr/bin/env node

const crypto = require('crypto');

/**
 * Generate a secure API key for EYEA Membership System
 * Usage: node generate-api-key.js [length]
 */

function generateApiKey(length = 32) {
  // Generate random bytes and convert to base64
  const randomBytes = crypto.randomBytes(length);
  const apiKey = randomBytes.toString('base64');
  
  // Remove any non-alphanumeric characters for cleaner keys
  const cleanApiKey = apiKey.replace(/[^a-zA-Z0-9]/g, '');
  
  return cleanApiKey;
}

function generateMultipleKeys(count = 5, length = 32) {
  console.log(`\n🔑 Generating ${count} API keys (${length} characters each):\n`);
  
  for (let i = 1; i <= count; i++) {
    const apiKey = generateApiKey(length);
    console.log(`API Key ${i}: ${apiKey}`);
  }
  
  console.log(`\n📝 Copy one of these keys to your .env file:`);
  console.log(`API_KEY=your-chosen-key-here\n`);
}

function showUsage() {
  console.log(`
🔑 EYEA Membership API Key Generator

Usage:
  node generate-api-key.js [length] [count]

Examples:
  node generate-api-key.js          # Generate 5 keys of 32 chars
  node generate-api-key.js 48       # Generate 5 keys of 48 chars
  node generate-api-key.js 32 10    # Generate 10 keys of 32 chars

Security Tips:
  ✅ Use keys with 32+ characters
  ✅ Store in environment variables
  ✅ Never commit to version control
  ✅ Rotate keys regularly
  ✅ Use different keys for dev/prod
`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const length = parseInt(args[0]) || 32;
const count = parseInt(args[1]) || 5;

// Validate input
if (length < 16) {
  console.error('❌ Error: API key length must be at least 16 characters');
  process.exit(1);
}

if (count < 1 || count > 20) {
  console.error('❌ Error: Count must be between 1 and 20');
  process.exit(1);
}

// Show usage if help requested
if (args.includes('--help') || args.includes('-h')) {
  showUsage();
  process.exit(0);
}

// Generate and display API keys
console.log('🚀 EYEA Membership API Key Generator');
console.log('=====================================');

generateMultipleKeys(count, length);

console.log('🔒 Security Reminders:');
console.log('  • Store API keys in environment variables');
console.log('  • Never commit keys to version control');
console.log('  • Use different keys for development and production');
console.log('  • Rotate keys every 90 days');
console.log('  • Monitor API usage for suspicious activity\n'); 