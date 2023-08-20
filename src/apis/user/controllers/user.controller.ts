import { BaseController } from '@app/base/base.controller';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user';
import { User } from '@app/decorators';

@Controller('user')
export class UserController extends BaseController<UserEntity>(
  UserEntity,
  'user',
) {
  relations = [];

  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post('create')
  create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return super.create(body);
  }

  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    return super.update(id, body);
  }

  @Get('me')
  getMe(@User() user: UserEntity) {
    return user;
  }
}
