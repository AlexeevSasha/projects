import { BaseApiService } from "./BaseApiService";

class ActivationRepository extends BaseApiService {
  constructor() {
    super("admin");
  }

  invitation = async (body: { token: string; password: string }) =>
    this.post<string>("EmployeeActivation/AcceptRegisterByToken", JSON.stringify(body));

  recovery = async (body: { token: string; password: string }) =>
    this.post<string>("EmployeeActivation/RestorePasswordByToken", JSON.stringify(body));

  forgot = async (email: string) => this.post<string>("EmployeeActivation/Forgot", JSON.stringify(email));
}

export const activationRepository = new ActivationRepository();
