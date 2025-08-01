import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMembershipById(@Param('id') id: string) {
    const membership = await this.membershipService.getMembershipById(id);
    return {
      status: 'success',
      data: membership
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateMembership(@Param('id') id: string, @Body() updateData: any) {
    const membership = await this.membershipService.updateMembership(id, updateData);
    return {
      status: 'success',
      message: 'Membership updated successfully',
      data: membership
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMembership(@Param('id') id: string) {
    await this.membershipService.deleteMembership(id);
    return {
      status: 'success',
      message: 'Membership deleted successfully'
    };
  }
} 