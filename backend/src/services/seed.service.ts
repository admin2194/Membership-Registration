import { Injectable, OnModuleInit } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { PaymentService } from './payment.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly paymentService: PaymentService,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      // Seed membership levels
      await this.membershipService.seedMembershipLevels();
      console.log('Membership levels seeded successfully');

      // Seed sample payments for admin user
      const adminUserId = 'admin'; // You might want to get the actual admin user ID
      await this.paymentService.seedSamplePayments(adminUserId);
      console.log('Sample payments seeded successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
} 