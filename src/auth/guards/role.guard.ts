import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('RoleGuard');
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role != 2) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
