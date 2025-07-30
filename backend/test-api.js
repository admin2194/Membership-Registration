const axios = require('axios');

const BASE_URL = 'http://localhost:3001/v1';

async function testAPI() {
  try {
    console.log('Testing EYEYA API...\n');

    // Test 1: SSO
    console.log('1. Testing SSO endpoint...');
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
      console.log('❌ SSO failed:', error.response?.data?.message || error.message);
    }

    // Test 2: Get Membership Levels
    console.log('\n2. Testing Membership Levels endpoint...');
    try {
      const levelsResponse = await axios.get(`${BASE_URL}/membership/levels`);
      console.log('✅ Membership levels retrieved:', levelsResponse.data.length, 'levels');
    } catch (error) {
      console.log('❌ Membership levels failed:', error.response?.data?.message || error.message);
    }

    // Test 3: Submit Donation
    console.log('\n3. Testing Donation endpoint...');
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
      console.log('❌ Donation failed:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 API testing completed!');

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAPI(); 