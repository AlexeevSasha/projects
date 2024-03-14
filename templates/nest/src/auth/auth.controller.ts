import { Controller, Inject } from "@nestjs/common";
import { Routes } from "../utils/constants/routes";
import { Services } from "../utils/constants/services";
import { IAuthService } from "./interfaces/auth.service";

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private readonly authService: IAuthService) {}
}
