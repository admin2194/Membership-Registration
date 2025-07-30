const axios = require('axios');

const BASE_URL = 'http://localhost:3001/v1';

async function testFullAPI() {
  try {
    console.log('🧪 Testing EYEYA API (Full Test)...\n');

    // Test 1: Basic endpoint
    console.log('1. Testing basic endpoint...');
    try {
      const response = await axios.get(`${BASE_URL}`);
      console.log('✅ Basic endpoint working:', response.data);
    } catch (error) {
      console.log('❌ Basic endpoint failed:', error.message);
    }

    // Test 2: Auth test endpoint
    console.log('\n2. Testing auth test endpoint...');
    try {
      const response = await axios.get(`${BASE_URL}/auth/test`);
      console.log('✅ Auth test endpoint working:', response.data);
    } catch (error) {
      console.log('❌ Auth test endpoint failed:', error.message);
    }

    // Test 3: Seed admin
    console.log('\n3. Testing admin seeding...');
    try {
      const response = await axios.post(`${BASE_URL}/auth/seed-admin`);
      console.log('✅ Admin seeding response:', response.data);
    } catch (error) {
      console.log('❌ Admin seeding failed:', error.response?.data || error.message);
    }

    // Test 4: Admin login
    console.log('\n4. Testing admin login...');
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: 'admin@eyea.com',
        password: 'admin123'
      });
      console.log('✅ Admin login successful');
      const token = response.data.access_token;
      
      // Test 5: SSO with correct API key
      console.log('\n5. Testing SSO...');
      try {
        const ssoResponse = await axios.post(`${BASE_URL}/auth/sso`, {
          fullName: 'Jane Doe',
          phoneNumber: '251742219814'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-KEY': 'test-api-key'
          }
        });
        console.log('✅ SSO successful:', ssoResponse.data.status);
      } catch (error) {
        console.log('❌ SSO failed:', error.response?.data || error.message);
      }

      // Test 6: Donation submission
      console.log('\n6. Testing donation submission...');
      try {
        const donationResponse = await axios.post(`${BASE_URL}/donation`, {
          fullName: 'Rediet Alemu',
          phoneNumber: '251742219814',
          amount: 500,
          note: 'Supporting youth programs'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Donation submitted successfully');
      } catch (error) {
        console.log('❌ Donation failed:', error.response?.data || error.message);
      }

      // Test 7: Membership levels (requires auth)
      console.log('\n7. Testing membership levels...');
      try {
        const levelsResponse = await axios.get(`${BASE_URL}/membership/levels`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('✅ Membership levels retrieved:', levelsResponse.data.length, 'levels');
      } catch (error) {
        console.log('❌ Membership levels failed:', error.response?.data || error.message);
      }

    } catch (error) {
      console.log('❌ Admin login failed:', error.response?.data || error.message);
    }

    console.log('\n🎉 Full API testing completed!');

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testFullAPI(); 