import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @Get('/me')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: Request) {
    return {
      message: 'User fetched successfully',
      user: req.currentUser,
    };
  }
}
