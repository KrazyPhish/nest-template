import { IsOptional, IsPositive, IsInt, IsString } from 'class-validator';

/**
 * @description: 列表
 */
export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly page: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly limit: number;
}

export class PaginationVO {
  readonly page: number;

  readonly limit: number;

  readonly total: number;
}

/**
 * @description: 公共vo
 */
export class CommonVO {
  readonly id: string;

  readonly createTime: Date;

  readonly updateTime: Date;
}

/**
 * @description: id
 */
export class IdDto {
  @IsString()
  readonly id: string;
}
