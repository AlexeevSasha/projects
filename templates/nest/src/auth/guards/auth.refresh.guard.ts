import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IJwtPayloadRefresh } from "../interfaces/jwt.payload";

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<Request & { user?: IJwtPayloadRefresh }>(context);

    try {
      const token = this.getToken(request);
      const jwt = this.jwtService.verify(token, { secret: process.env.REFRESH_TOKEN_SECRET });
      request.user = { ...jwt, refreshToken: token };
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: Request): string {
    const refreshToken = request.cookies && "refresh_token" in request.cookies && request.cookies.refresh_token.length > 0;
    if (!refreshToken) throw new ForbiddenException("Refresh token malformed");

    return request.cookies.refresh_token;
  }
}
