/**
 * Get user emails from Supabase for Google Play testing
 */

import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

async function getUserEmails() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to Supabase\n');

    // Get all user emails from auth.users table
    const result = await client.query(`
      SELECT email 
      FROM auth.users 
      WHERE email IS NOT NULL 
      ORDER BY created_at DESC
    `);

    if (result.rows.length === 0) {
      console.log('⚠️  No users found in database');
      return;
    }

    console.log(`📧 Found ${result.rows.length} user(s):\n`);
    
    const emails = result.rows.map(row => row.email);
    emails.forEach((email, index) => {
      console.log(`${index + 1}. ${email}`);
    });

    console.log('\n📋 Copy these emails to Google Play Console:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(emails.join('\n'));
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 How to add them as testers:');
    console.log('1. Go to: https://play.google.com/console/');
    console.log('2. Select: Internal testing → Testers');
    console.log('3. Create an email list and paste the emails above');
    console.log('4. Save and select that list for your internal testing track\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

getUserEmails();
