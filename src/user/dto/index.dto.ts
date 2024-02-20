import { OmitType, PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate } from 'class-validator'
import { CommonVO, PaginationDto, PaginationVO } from '@/common/common.dto'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @IsString()
  @IsOptional()
  readonly password: string

}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['username'])) {
  @IsOptional()
  @IsString()
  readonly nickname: string

  @IsOptional()
  @IsNumber()
  readonly age: number

  @IsOptional()
  @IsDate()
  readonly birthday: string

}

export class UserVO extends CommonVO {
  readonly username: string

  readonly nickname: string

  readonly age: number

  readonly birthday: Date
}

export class UserListQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly nickname: string
}

export class UserListVO extends PaginationVO {
  readonly list: Array<UserVO>
}