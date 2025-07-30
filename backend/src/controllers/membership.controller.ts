import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { MembershipService } from '../services/membership.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registerMembership(@Body() membershipData: any, @Request() req: any) {
    const userId = req.user.sub;
    const membership = await this.membershipService.registerMembership(membershipData, userId);
    return {
      status: 'success',
      message: 'Membership registered successfully',
      data: membership
    };
  }

  @Get('levels')
  @UseGuards(JwtAuthGuard)
  async getMembershipLevels() {
    const levels = await this.membershipService.getMembershipLevels();
    return levels;
  }
} 