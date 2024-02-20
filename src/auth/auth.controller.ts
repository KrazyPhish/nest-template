import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service'
import { Public } from 'src/decorator/public-auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto, UserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginDto, @Req() req: Request) {
    return await this.authService.login(req.user as UserDto)
  }

  @Get('test')
  async test(@Req() req: Request) {
    return req.user;
  }
}
