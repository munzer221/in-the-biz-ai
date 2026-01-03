/**
 * Google Cloud Service Account Setup - Web-based (No CLI required)
 * Creates instructions for manual setup via Google Cloud Console
 */

import fs from 'fs';
import path from 'path';

console.log('\n🚀 Google Cloud Service Account Setup (Manual)\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const keyFilePath = path.resolve('./play-service-account.json');

// Check if key already exists
if (fs.existsSync(keyFilePath)) {
  console.log('✅ Service account key already exists!');
  console.log(`📁 Location: ${keyFilePath}\n`);
  
  // Verify it's valid JSON
  try {
    const keyContent = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
    console.log('✅ Key file is valid JSON');
    console.log(`📧 Service Account: ${keyContent.client_email || 'Unknown'}`);
    console.log(`🆔 Project ID: ${keyContent.project_id || 'Unknown'}\n`);
    
    console.log('📋 Next steps:');
    console.log('   1. Go to Google Play Console: https://play.google.com/console');
    console.log('   2. Select your app');
    console.log('   3. Go to: Setup > API access');
    console.log(`   4. Link this service account: ${keyContent.client_email}`);
    console.log('   5. Grant "Admin (all permissions)" access');
    console.log('   6. Run: node scripts/create-play-products.mjs\n');
    
  } catch (error) {
    console.log('⚠️  Key file exists but may be invalid');
    console.log('   Delete it and follow the steps below to create a new one\n');
  }
} else {
  console.log('📝 Follow these steps to create your service account:\n');
  
  console.log('1️⃣  Go to Google Cloud Console:');
  console.log('   https://console.cloud.google.com/iam-admin/serviceaccounts\n');
  
  console.log('2️⃣  Create a new service account:');
  console.log('   • Click "CREATE SERVICE ACCOUNT"');
  console.log('   • Name: play-console-api');
  console.log('   • Description: Service account for Google Play Console API');
  console.log('   • Click "CREATE AND CONTINUE"\n');
  
  console.log('3️⃣  Grant permissions (optional - can skip this step):');
  console.log('   • Click "CONTINUE" (no roles needed for Play Console)\n');
  
  console.log('4️⃣  Create a key:');
  console.log('   • Click on the service account you just created');
  console.log('   • Go to "KEYS" tab');
  console.log('   • Click "ADD KEY" > "Create new key"');
  console.log('   • Select "JSON"');
  console.log('   • Click "CREATE"\n');
  
  console.log('5️⃣  Save the downloaded file:');
  console.log(`   • Rename it to: play-service-account.json`);
  console.log(`   • Move it to: ${path.resolve('.')}`);
  console.log('   • The file should be in the same folder as this script\n');
  
  console.log('6️⃣  Enable Google Play Android Developer API:');
  console.log('   https://console.cloud.google.com/apis/library/androidpublisher.googleapis.com');
  console.log('   • Click "ENABLE"\n');
  
  console.log('7️⃣  Link to Google Play Console:');
  console.log('   https://play.google.com/console');
  console.log('   • Select your app: "In The Biz"');
  console.log('   • Go to: Setup > API access');
  console.log('   • Click "Link existing service account"');
  console.log('   • Select the service account you created');
  console.log('   • Grant "Admin (all permissions)" access\n');
  
  console.log('8️⃣  Once complete, run this script again to verify\n');
}

console.log('🔒 Security reminder:');
console.log('   ✓ play-service-account.json is already in .gitignore');
console.log('   ✓ NEVER commit this file to Git');
console.log('   ✓ Keep it secure and private\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
