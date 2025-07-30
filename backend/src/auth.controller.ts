import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  async test() {
    return { message: 'Auth controller is working' };
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.authService.login(user);
  }

  @Post('sso')
  async sso(@Body() ssoDto: { fullName: string; phoneNumber: string }, @Headers('x-key') apiKey: string) {
    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }
    
    return this.authService.sso(ssoDto.fullName, ssoDto.phoneNumber, apiKey);
  }

  @Post('seed-admin')
  async seedAdmin() {
    return this.authService.createAdminUser();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return { message: 'Profile accessed successfully' };
  }
} 