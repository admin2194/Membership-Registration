import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import { MembershipLevel } from '../schemas/membership-level.schema';
import { Payment } from '../schemas/payment.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(MembershipLevel.name) private membershipLevelModel: Model<MembershipLevel>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async onModuleInit() {
    console.log('🌱 Starting database seeding...');
    
    try {
      // Seed admin user
      await this.seedAdminUser();
      
      // Seed membership levels
      await this.seedMembershipLevels();
      
      // Seed sample payments
      await this.seedSamplePayments();
      
      console.log('✅ Database seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
    }
  }

  private async seedAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@eyea.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminPhone = process.env.ADMIN_PHONE || '+251911234567';

    const existingAdmin = await this.userModel.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const adminUser = new this.userModel({
        fullName: 'EYEA Admin',
        email: adminEmail,
        phoneNumber: adminPhone,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await adminUser.save();
      console.log('👤 Admin user seeded successfully');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    } else {
      console.log('👤 Admin user already exists');
    }
  }

  private async seedMembershipLevels() {
    const levels = [
      { id: 1, name: 'Basic', price: 1000, frequency: 'monthly' },
      { id: 2, name: 'Standard', price: 2500, frequency: 'monthly' },
      { id: 3, name: 'Premium', price: 5000, frequency: 'monthly' },
      { id: 4, name: 'Enterprise', price: 10000, frequency: 'monthly' },
    ];

    for (const level of levels) {
      const existingLevel = await this.membershipLevelModel.findOne({ id: level.id });
      
      if (!existingLevel) {
        const newLevel = new this.membershipLevelModel(level);
        await newLevel.save();
      }
    }
    
    console.log('📊 Membership levels seeded successfully');
  }

  private async seedSamplePayments() {
    const samplePayments = [
      {
        month: 'January 2024',
        date: new Date('2024-01-15'),
        amount: 2500,
        status: 'completed',
        userId: 'sample-user-1',
      },
      {
        month: 'February 2024',
        date: new Date('2024-02-15'),
        amount: 2500,
        status: 'completed',
        userId: 'sample-user-1',
      },
      {
        month: 'March 2024',
        date: new Date('2024-03-15'),
        amount: 2500,
        status: 'pending',
        userId: 'sample-user-1',
      },
      {
        month: 'January 2024',
        date: new Date('2024-01-20'),
        amount: 5000,
        status: 'completed',
        userId: 'sample-user-2',
      },
      {
        month: 'February 2024',
        date: new Date('2024-02-20'),
        amount: 5000,
        status: 'completed',
        userId: 'sample-user-2',
      },
    ];

    for (const payment of samplePayments) {
      const existingPayment = await this.paymentModel.findOne({
        month: payment.month,
        userId: payment.userId,
      });
      
      if (!existingPayment) {
        const newPayment = new this.paymentModel(payment);
        await newPayment.save();
      }
    }
    
    console.log('💰 Sample payments seeded successfully');
  }
} 