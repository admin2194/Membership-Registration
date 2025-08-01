// Test script to verify backend integration
const API_BASE = 'http://localhost:3001/v1';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`URL: ${API_BASE}${endpoint}`);
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Note: This will fail without auth, but we can see if the endpoint exists
      }
    });
    
    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success:`, data);
    } else {
      console.log(`❌ Error: ${response.statusText}`);
    }
  } catch (error) {
    console.log(`❌ Network Error:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Testing Backend Integration...');
  console.log('=====================================');
  
  // Test membership endpoints
  await testEndpoint('/membership', 'Get All Memberships');
  await testEndpoint('/membership/levels', 'Get Membership Levels');
  
  // Test payment endpoints
  await testEndpoint('/payments/subscriptions', 'Get Subscription Payments');
  
  // Test donation endpoints
  await testEndpoint('/donation/history', 'Get Donation History');
  
  console.log('\n=====================================');
  console.log('✅ Integration test completed!');
  console.log('\n📝 Notes:');
  console.log('- 401 errors are expected (no auth token)');
  console.log('- 200/404 responses show endpoints exist');
  console.log('- Network errors indicate connection issues');
}

runTests(); 