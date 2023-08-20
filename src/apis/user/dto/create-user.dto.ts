import { Roles } from '@app/enums';
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEnum(Roles)
  role!: Roles;
}
