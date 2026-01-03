/**
 * Rollout draft release to internal testing
 */

import { google } from 'googleapis';
import fs from 'fs';

const PACKAGE_NAME = 'com.inthebiz.app';
const SERVICE_ACCOUNT_PATH = './play-service-account.json';
const TRACK = 'internal';

async function rolloutDraftRelease() {
  try {
    console.log('🚀 Rolling out draft release...\n');

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

    // Create edit
    const editResponse = await androidPublisher.edits.insert({
      packageName: PACKAGE_NAME,
    });
    const editId = editResponse.data.id;
    console.log(`✅ Edit created: ${editId}\n`);

    // Update track - replace version 1 with version 2, keep as draft
    console.log(`🎯 Setting version 2 as the active draft...`);
    await androidPublisher.edits.tracks.update({
      packageName: PACKAGE_NAME,
      editId,
      track: TRACK,
      requestBody: {
        track: TRACK,
        releases: [{
          versionCodes: ['2'],
          status: 'draft',
          releaseNotes: [{
            language: 'en-US',
            text: 'Bug fixes and performance improvements. Fixed MainActivity package issue.',
          }],
        }],
      },
    });
    console.log(`✅ Version 2 is now the active draft\n`);

    // Commit
    console.log('💾 Committing changes...');
    await androidPublisher.edits.commit({
      packageName: PACKAGE_NAME,
      editId,
    });
    console.log('✅ Changes committed!\n');

    console.log('🎉 Version 2 is now live on internal testing!');
    console.log('📱 Users can now update to version 2\n');

  } catch (error) {
    console.error('\n❌ Rollout failed:');
    console.error(`   ${error.message}`);
  }
}

rolloutDraftRelease();
