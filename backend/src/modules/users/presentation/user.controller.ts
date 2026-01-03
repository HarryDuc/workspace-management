import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UserService } from '../application/services/user.service';
import { JwtAuthGuard, RequestWithUser } from '@/src/common/guards/jwt.guard';

@Controller('users')
@Controller({
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUser(@Request() req: RequestWithUser) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.userService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  async updateUser(@Request() req: RequestWithUser) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.userService.updateUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile/change-password')
  async changePassword(
    @Request() req: RequestWithUser,
    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
      comfirmNewPassword: string;
    },
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.userService.updatePassword(userId, body);
  }
}
