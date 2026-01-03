/**
 * RevenueCat API Configuration
 * Automatically configure products, entitlements, and offerings
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const API_KEY = process.env.REVENUECAT_SECRET_KEY;
const BASE_URL = 'https://api.revenuecat.com/v1';

if (!API_KEY) {
  console.error('❌ REVENUECAT_SECRET_KEY not found in .env');
  process.exit(1);
}

async function apiCall(endpoint, method = 'GET', body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      console.error(`❌ API Error (${response.status}):`, data);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`❌ Request failed:`, error.message);
    return null;
  }
}

async function main() {
  console.log('\n🚀 RevenueCat Auto-Configuration\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Get project/app info
  console.log('📱 Step 1: Fetching app configuration...');
  const apps = await apiCall('/apps');
  
  if (!apps || !apps.items) {
    console.log('⚠️  Could not fetch apps (may need different endpoint)');
    console.log('   Continuing with product check...\n');
  } else {
    console.log(`✅ Found ${apps.items.length || 0} app(s)\n`);
    
    if (apps.items.length > 0) {
      console.log('Apps:');
      apps.items.forEach(app => {
        console.log(`  - ${app.name} (${app.id})`);
      });
    }
  }

  // 2. Get products
  console.log('\n📦 Step 2: Checking products...');
  const productsResp = await apiCall('/products');
  const products = productsResp?.items || [];
  
  console.log(`${products.length > 0 ? '✅' : '⏳'} Found ${products.length} product(s)`);
  if (products.length > 0) {
    products.forEach(product => {
      console.log(`  - ${product.identifier}: ${product.display_name || 'No name'}`);
    });
  }

  // 3. Get entitlements
  console.log('\n🎯 Step 3: Checking entitlements...');
  const entitlements = await apiCall('/entitlements');
  
  if (entitlements) {
    console.log(`✅ Found ${entitlements.length || 0} entitlement(s)`);
    if (entitlements.length > 0) {
      entitlements.forEach(ent => {
        console.log(`  - ${ent.identifier}`);
      });
    }
  }

  // 4. Get offerings
  console.log('\n🎁 Step 4: Checking offerings...');
  const offerings = await apiCall('/offerings');
  
  if (offerings) {
    console.log(`✅ Found ${offerings.length || 0} offering(s)`);
    if (offerings.length > 0) {
      offerings.forEach(offer => {
        console.log(`  - ${offer.identifier}`);
      });
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📋 Configuration Status:\n');
  
  const hasProMonthly = products?.some(p => p.identifier === 'pro_monthly');
  const hasProYearly = products?.some(p => p.identifier === 'pro_yearly');
  const hasProEntitlement = entitlements?.some(e => e.identifier === 'pro');
  const hasDefaultOffering = offerings?.some(o => o.identifier === 'default');

  console.log(`  ${hasProMonthly ? '✅' : '⏳'} Product: pro_monthly`);
  console.log(`  ${hasProYearly ? '✅' : '⏳'} Product: pro_yearly`);
  console.log(`  ${hasProEntitlement ? '✅' : '⏳'} Entitlement: pro`);
  console.log(`  ${hasDefaultOffering ? '✅' : '⏳'} Offering: default`);

  console.log('\n📝 Next Steps:\n');
  
  if (!hasProMonthly || !hasProYearly) {
    console.log('1. ⏳ Create products in Google Play Console:');
    console.log('   Run: node scripts/create-play-products.mjs\n');
  }
  
  console.log('2. 🔗 Add products to RevenueCat:');
  console.log('   https://app.revenuecat.com/products');
  console.log('   • Add: pro_monthly ($4.99/month)');
  console.log('   • Add: pro_yearly ($49.99/year)\n');
  
  if (!hasProEntitlement) {
    console.log('3. 🎯 Create "pro" entitlement:');
    console.log('   https://app.revenuecat.com/entitlements');
    console.log('   • Attach both products to it\n');
  }
  
  if (!hasDefaultOffering) {
    console.log('4. 🎁 Create "default" offering:');
    console.log('   https://app.revenuecat.com/offerings');
    console.log('   • Add both products to it\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
