import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { DonationService } from '../services/donation.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async submitDonation(@Body() donationData: any) {
    const donation = await this.donationService.submitDonation(donationData);
    return {
      status: 'success',
      message: 'Donation submitted successfully',
      data: donation
    };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getDonationHistory(@Request() req: any) {
    const userId = req.user.sub;
    const donations = await this.donationService.getDonationHistory(userId);
    return donations;
  }
} 