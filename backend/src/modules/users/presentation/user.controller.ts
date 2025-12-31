import { Body, Controller, Get, Param, Put, Version } from '@nestjs/common';
import { UserService } from '../application/services/user.service';


@Controller('users')
@Controller({
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version('1')
  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Put(':email')
  async updateUser(@Body('email') email: string) {
    return this.userService.updateUser(email);
  }

  @Put(':email')
  async changePassword(@Body() email: string) {
    return this.userService.updatePassword(email);
  }
}
