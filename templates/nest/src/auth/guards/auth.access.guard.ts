import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IncomingMessage } from "http";
import { IJwtPayload } from "../interfaces/jwt.payload";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest<IncomingMessage & { user?: IJwtPayload }>(context);

    try {
      const token = this.getToken(request);
      request.user = (await this.jwtService.verifyAsync(token, { secret: process.env.ACCESS_TOKEN_SECRET })) as IJwtPayload;
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: { headers: Record<string, string | string[]> }): string {
    const authorization = request.headers["authorization"];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error("Invalid Authorization Header");
    }
    const [_, token] = authorization.split(" ");
    return token;
  }
}
