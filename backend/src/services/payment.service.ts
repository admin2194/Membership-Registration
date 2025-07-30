import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async getSubscriptionPayments(userId: string): Promise<Payment[]> {
    return this.paymentModel.find({ userId }).sort({ date: -1 }).exec();
  }

  async seedSamplePayments(userId: string): Promise<void> {
    const payments = [
      {
        month: 'June',
        date: '2025-06-05',
        amount: 500,
        status: 'Paid',
        userId,
      },
      {
        month: 'May',
        date: '2025-05-06',
        amount: 500,
        status: 'Paid',
        userId,
      },
    ];

    for (const payment of payments) {
      await this.paymentModel.findOneAndUpdate(
        { month: payment.month, userId: payment.userId },
        payment,
        { upsert: true, new: true }
      );
    }
  }
} 