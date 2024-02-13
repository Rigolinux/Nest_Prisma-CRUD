import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUser(userName: string, password: string) {
    const user = await this.usersService.findOnebyUsername(userName);
    if (!user) throw new NotFoundException('The username was not found');
    if (user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException(
      'The username or password you entered is incorrect',
    );
  }
}
