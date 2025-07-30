// MongoDB initialization script for EYEA database
db = db.getSiblingDB('eyea_db');

// Create admin user for the application database
db.createUser({
  user: 'eyea_user',
  pwd: 'eyea_password',
  roles: [
    {
      role: 'readWrite',
      db: 'eyea_db'
    }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('memberships');
db.createCollection('membershiplevels');
db.createCollection('donations');
db.createCollection('payments');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "phoneNumber": 1 }, { unique: true });
db.memberships.createIndex({ "userId": 1 });
db.memberships.createIndex({ "membershipLevelId": 1 });
db.donations.createIndex({ "phoneNumber": 1 });
db.payments.createIndex({ "userId": 1 });
db.payments.createIndex({ "status": 1 });

print('✅ EYEA database initialized successfully!'); 