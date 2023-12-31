import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { PaginationDto } from './base.dto';

export function BaseController<Entity extends BaseEntity>(
  $ref: any,
  name?: string,
) {
  abstract class Controller {
    abstract relations: string[];

    constructor(public readonly service: BaseService<Entity>) {}

    @Post('create')
    create(@Body() body): Promise<Entity> {
      return this.service.create(body);
    }

    // @Get('all')
    // getAll(@Query() query: PaginationDto): Promise<Entity[]> {
    // }

    @Get('detail/:id')
    getDetail(@Param('id') id: string): Promise<Entity> {
      return this.service.getOneByIdOrFail(id, ...this.relations);
    }

    @Patch('update/:id')
    update(@Param('id') id: string, @Body() body): Promise<Entity> {
      return this.service.updateById(id, body);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<Entity> {
      return this.service.deleteById(id);
    }
  }

  return Controller;
}
