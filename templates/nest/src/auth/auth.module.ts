import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Services } from "../utils/constants/services";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [{ provide: Services.AUTH, useClass: AuthService }],
  exports: [{ provide: Services.AUTH, useClass: AuthService }, JwtModule],
})
export class AuthModule {}
