import { Injectable, CanActivate, ExecutionContext, forwardRef, Inject } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    // If user has admin role, allow access
    if (user.role === 'admin') {
      return true;
    }

    return false;
  }
}