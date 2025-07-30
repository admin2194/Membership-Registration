import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user._id,
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone
      }
    };
  }

  async sso(fullName: string, phoneNumber: string, apiKey: string) {
    // Validate API key (you should implement proper API key validation)
    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Find or create user based on phone number
    let user = await this.userModel.findOne({ phone: phoneNumber });
    
    if (!user) {
      // Create new user for SSO
      user = new this.userModel({
        fullName,
        phone: phoneNumber,
        email: `${phoneNumber}@eyea.org`, // Generate email from phone
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
        role: 'user',
        isActive: true
      });
      await user.save();
    }

    const payload = { 
      email: user.email, 
      sub: user._id,
      role: user.role 
    };
    
    return {
      status: 'success',
      token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phone
      }
    };
  }

  async createAdminUser() {
    const adminExists = await this.userModel.findOne({ email: 'admin@eyea.com' });
    
    if (adminExists) {
      return { message: 'Admin user already exists' };
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = new this.userModel({
      fullName: 'EYEA Admin',
      email: 'admin@eyea.com',
      password: hashedPassword,
      phone: '+251703985456',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    return { message: 'Admin user created successfully' };
  }
} 