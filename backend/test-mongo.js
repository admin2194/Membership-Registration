const mongoose = require('mongoose');

async function testMongoConnection() {
  try {
    console.log('🧪 Testing MongoDB connection...');
    
    const uri = 'mongodb://localhost:27022/eyea_db';
    
    console.log('Connecting to:', uri);
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({ name: String, test: Boolean });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'test', test: true });
    await testDoc.save();
    
    console.log('✅ Database write test successful!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'test' });
    console.log('✅ Database cleanup successful!');
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testMongoConnection(); 