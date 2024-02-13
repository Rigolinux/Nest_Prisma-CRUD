import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUser(
    userName: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOnebyUsername(userName);
    if (!user) throw new NotFoundException('The username was not found');
    if (user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      const payload = { username: user.username, role: user.roleId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException(
      'The username or password you entered is incorrect',
    );
  }
}
