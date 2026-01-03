import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Định nghĩa kiểu payload của JWT
interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

// Định nghĩa kiểu Request có user
export interface RequestWithUser extends Request {
  user?: JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('Not found token or invalid format.');
      throw new UnauthorizedException('Token not provided or invalid format');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request.user = {
        userId: payload.userId,
        email: payload.email,
      };

      this.logger.log(`Verify token successfully: ID ${payload.userId}`);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error verifying token: ${error.message}`);
      } else {
        this.logger.error(`Error verifying token: Unknown error`);
      }
      throw new UnauthorizedException('Token not valid or expired');
    }
  }
}
