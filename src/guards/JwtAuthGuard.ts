import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomRequest }from '../custom/custom-request';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    try {
      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);
      (request as any).user = decoded;  
      return true;
    } catch (error) {
      return false;
    }
  }
}
