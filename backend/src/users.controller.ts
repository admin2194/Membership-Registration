import { Controller, Get, Post, Put, Delete, Param, Body, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.userModel.find().select('-__v').exec();
    return {
      success: true,
      count: users.length,
      users: users.map(user => ({
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
      })),
    };
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