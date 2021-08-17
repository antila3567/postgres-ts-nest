import { User } from 'src/users/user.model';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const newUser = await this.userService.getUserByEmail(dto.email);
    if (newUser) {
      throw new HttpException('user exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const createUser = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(createUser);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }

    throw new HttpException(
      'Login or password is incorect',
      HttpStatus.BAD_REQUEST,
    );
  }
}
