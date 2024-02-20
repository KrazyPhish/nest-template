import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserListQueryDto, UserListVO, UserVO } from './dto/index.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const item = await this.user.findOne({ where: { username, isDelete: false} })
    if (item) {
      throw new HttpException(`用户${username}已存在`, 200)
    }
    const user = this.user.create(createUserDto)
    return await this.user.save(user)
  }

  async findAll(query: UserListQueryDto): Promise<UserListVO> {
    const { nickname, page = 1, limit = 10 } = query
    const where: Record<string, any> = { isDelete: false }
    if (nickname) {
      where.nickname = Like(`%${nickname}%`)
    }
    const [list, total] = await this.user.findAndCount({
      where,
      order: { updateTime: 'DESC' },
      skip: (page - 1) * limit,
      take: limit
    })
    return { list, page, limit, total }
  }

  async findOne(id: string): Promise<UserVO> {
    const item = await this.user.findOne({
      where: { id, isDelete: false },
    })
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在或已被删除`, 200)
    }
    return item
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const item = await this.user.findOne({ where: { id, isDelete: false } })
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在或已被删除`, 200)
    }
    const current = this.user.merge(item, updateUserDto)
    return this.user.save(current)
  }

  async remove(id: string) {
    const item = await this.user.findOne({ where: { id, isDelete: false } })
    if (!item) {
      throw new HttpException(`id为${id}的数据不存在或已被删除`, 400)
    }
    item.isDelete = true
    return this.user.save(item)
  }

  async findByUsername(username: string) {
    const user = await this.user.findOne({
      where: { username, isDelete: false },
      select: ['password', 'id'],
    })
    if (!user) {
      throw new HttpException('用户名或密码不正确！', 400)
    }
    const { password, id } = user
    return { username, password, id }
  }
}
