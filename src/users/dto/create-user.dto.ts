import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'qwerty@gmail.com', description: 'user email' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123123sad2312', description: 'user password' })
  @IsString()
  @Length(6, 20)
  readonly password: string;
}
