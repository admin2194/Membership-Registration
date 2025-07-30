import { Controller, Post, Get, Body, UseGuards, Request, Query } from '@nestjs/common';
import { MembershipService } from '../services/membership.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PaginationDto } from '../dto/pagination.dto';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMemberships(@Query() paginationDto: PaginationDto) {
    return await this.membershipService.getAllMemberships(paginationDto);
  }
} 