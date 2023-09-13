import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as argon2 from 'argon2';
import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '@app/base/base.entity';
import { Roles } from '@app/enums';

@Entity({ name: 'user' })
@Unique('user', ['phone'])
export class UserEntity extends BaseEntity {
  @Column()
  phone!: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password!: string;

  @Column()
  role!: Roles;

  @BeforeInsert()
  async beforeInsert() {
    console.log(await argon2.hash(this.password));
    this.password = await argon2.hash(this.password);
  }
}
