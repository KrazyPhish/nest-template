import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super();
  }

  // 验证账号密码正确性
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (password !== user.password) {
      throw new HttpException('用户名或密码错误！', 400);
    }

    return user;
  }
}
