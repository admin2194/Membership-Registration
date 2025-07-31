import { Controller, Get, Post, Put, Delete, Param, Body, Request, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { PaginationDto } from './dto/pagination.dto';
import { PaginationService } from './services/pagination.service';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private paginationService: PaginationService,
  ) {}

  @Get()
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    const { query, sort, skip, limit } = this.paginationService.buildQuery(paginationDto);
    
    const [users, total] = await Promise.all([
      this.userModel.find(query)
        .select('-__v')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(query).exec(),
    ]);

    const userData = users.map(user => ({
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
    }));

    return this.paginationService.createPaginationResponse(
      userData,
      total,
      paginationDto
    );
  }

  @Get('profile')
  async getCurrentUser(@Request() req) {
    const user = await this.userModel.findById(req.user?.userId).select('-__v').exec();
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
      },
    };
  }

  @Get(':phone')
  async getUserByPhone(@Param('phone') phone: string) {
    const user = await this.userModel.findOne({ phone }).select('-__v').exec();
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }
    return {
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
      },
    };
  }

  @Put(':phone')
  async updateUser(@Param('phone') phone: string, @Body() updateData: { fullName?: string }) {
    const user = await this.userModel.findOneAndUpdate(
      { phone },
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-__v').exec();

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
      },
    };
  }

  @Delete(':phone')
  async deleteUser(@Param('phone') phone: string) {
    const user = await this.userModel.findOneAndDelete({ phone }).exec();
    
    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
} 