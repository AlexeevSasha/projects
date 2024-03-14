import { Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}
}
