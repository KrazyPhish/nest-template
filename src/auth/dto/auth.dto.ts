import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}

export class UserDto {
  readonly id: string;
  readonly username: string;
}
