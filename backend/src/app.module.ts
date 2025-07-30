import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { Membership, MembershipSchema } from './schemas/membership.schema';
import { MembershipLevel, MembershipLevelSchema } from './schemas/membership-level.schema';
import { Donation, DonationSchema } from './schemas/donation.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { MembershipService } from './services/membership.service';
import { DonationService } from './services/donation.service';
import { PaymentService } from './services/payment.service';
import { SeedService } from './services/seed.service';
import { MembershipController } from './controllers/membership.controller';
import { DonationController } from './controllers/donation.controller';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Membership.name, schema: MembershipSchema },
      { name: MembershipLevel.name, schema: MembershipLevelSchema },
      { name: Donation.name, schema: DonationSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
    AuthModule,
  ],
  controllers: [
    AppController, 
    UsersController, 
    MembershipController, 
    DonationController, 
    PaymentController
  ],
  providers: [
    AppService, 
    MembershipService, 
    DonationService, 
    PaymentService,
    SeedService
  ],
})
export class AppModule {}
