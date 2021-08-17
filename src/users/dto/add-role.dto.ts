import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  readonly value: string;
  @IsNumber()
  readonly userId: number;
}
