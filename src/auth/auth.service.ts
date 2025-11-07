import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (loginDto.username !== adminUsername || loginDto.password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: loginDto.username, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}