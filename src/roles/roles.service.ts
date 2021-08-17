import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const findRole = await this.roleRepository.findOne({ where: { value } });

    if (!findRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    return findRole;
  }
}
