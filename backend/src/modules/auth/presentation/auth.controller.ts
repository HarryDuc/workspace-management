import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { AuthEntity } from '../domain/entities/auth.entity';
import { LoginAuthEntity } from '../application/dto/login.dto';
import { ResetPasswordDto } from '../application/dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: AuthEntity) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginAuthEntity) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('reset-password-request')
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('reset-password')
  verifyResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.verifyResetPassword(resetPasswordDto.token, resetPasswordDto.newPassword, resetPasswordDto.confirmPassword);
  }

  refreshToken(@Body() token: any) {
    return this.authService.refreshToken(token.refreshToken, token.accessToken);
  }
}
