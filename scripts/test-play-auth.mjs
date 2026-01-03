/**
 * Test Google Play API authentication
 */

import { google } from 'googleapis';
import fs from 'fs';

const PACKAGE_NAME = 'com.inthebiz.app';
const SERVICE_ACCOUNT_PATH = './play-service-account.json';

async function testAuth() {
  try {
    console.log('🔐 Testing Google Play API authentication...\n');
    
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
    console.log('✅ Service account loaded');
    console.log(`   Email: ${credentials.client_email}`);
    console.log(`   Project: ${credentials.project_id}\n`);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    console.log('🔑 Creating auth client...');
    const authClient = await auth.getClient();
    console.log('✅ Auth client created\n');

    // Test getting access token
    console.log('🎫 Getting access token...');
    const accessToken = await authClient.getAccessToken();
    
    if (accessToken && accessToken.token) {
      console.log('✅ Access token obtained successfully!');
      console.log(`   Token starts with: ${accessToken.token.substring(0, 20)}...\n`);
    } else {
      console.log('❌ Failed to get access token\n');
      return;
    }

    // Try to call the API
    console.log('📱 Testing API call - listing existing subscriptions...');
    const androidPublisher = google.androidpublisher({
      version: 'v3',
      auth: authClient,
    });

    const response = await androidPublisher.monetization.subscriptions.list({
      packageName: PACKAGE_NAME,
    });

    console.log('✅ API call successful!');
    console.log(`   Found ${response.data.subscriptions?.length || 0} existing subscriptions\n`);
    
    if (response.data.subscriptions && response.data.subscriptions.length > 0) {
      console.log('📦 Existing subscriptions:');
      response.data.subscriptions.forEach(sub => {
        console.log(`   - ${sub.productId}`);
      });
    } else {
      console.log('   No existing subscriptions found (this is normal for a new app)');
    }

    console.log('\n✅ **Authentication is working correctly!**');
    console.log('   The API is accessible and ready to use.\n');

  } catch (error) {
    console.error('\n❌ **Authentication failed:**');
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('invalid_grant')) {
      console.error('\n🔍 **Troubleshooting invalid_grant error:**');
      console.error('   1. Make sure the service account email is invited in Play Console:');
      console.error('      https://play.google.com/console/users-and-permissions');
      console.error('   2. Grant these permissions:');
      console.error('      - View financial data, orders, and cancellation survey responses');
      console.error('      - Manage orders and subscriptions');
      console.error('   3. Wait 5-10 minutes after granting permissions');
      console.error('   4. Make sure Google Play Developer API is enabled:');
      console.error('      https://console.developers.google.com/apis/api/androidpublisher.googleapis.com/');
    }
    
    console.error('\n');
  }
}

testAuth();
