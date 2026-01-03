/**
 * Check current releases on all tracks
 */

import { google } from 'googleapis';
import fs from 'fs';

const PACKAGE_NAME = 'com.inthebiz.app';
const SERVICE_ACCOUNT_PATH = './play-service-account.json';

async function checkReleases() {
  try {
    console.log('🔍 Checking current releases...\n');

    const credentials = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    const authClient = await auth.getClient();
    const androidPublisher = google.androidpublisher({
      version: 'v3',
      auth: authClient,
    });

    // Create an edit to read current state
    const editResponse = await androidPublisher.edits.insert({
      packageName: PACKAGE_NAME,
    });
    const editId = editResponse.data.id;

    // Check internal track
    console.log('📱 Internal Testing Track:');
    const internalTrack = await androidPublisher.edits.tracks.get({
      packageName: PACKAGE_NAME,
      editId,
      track: 'internal',
    });

    if (internalTrack.data.releases && internalTrack.data.releases.length > 0) {
      internalTrack.data.releases.forEach(release => {
        console.log(`   Status: ${release.status}`);
        console.log(`   Version codes: ${release.versionCodes?.join(', ')}`);
        console.log(`   Release notes: ${release.releaseNotes?.[0]?.text || 'None'}`);
      });
    } else {
      console.log('   No releases found');
    }

    // List all bundles
    console.log('\n📦 Available Bundles:');
    const bundles = await androidPublisher.edits.bundles.list({
      packageName: PACKAGE_NAME,
      editId,
    });

    if (bundles.data.bundles && bundles.data.bundles.length > 0) {
      bundles.data.bundles.forEach(bundle => {
        console.log(`   Version code: ${bundle.versionCode}`);
      });
    } else {
      console.log('   No bundles found');
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkReleases();
