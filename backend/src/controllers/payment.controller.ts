import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('subscriptions')
  @UseGuards(JwtAuthGuard)
  async getSubscriptionPayments(@Request() req: any) {
    const userId = req.user.sub;
    const payments = await this.paymentService.getSubscriptionPayments(userId);
    return payments;
  }
} 