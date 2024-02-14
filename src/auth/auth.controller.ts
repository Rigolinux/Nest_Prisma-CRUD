import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.signUser(loginDto.username, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
