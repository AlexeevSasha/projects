import { BaseApiService } from "./BaseApiService";

export type DonationEntity = {
  Name: string;
  IsAnonymously: boolean;
  Email: string;
  Phone: string;
  Comment: string;
  PayAmount: number;
  termsAgree?: boolean;
};

class DonationRepository extends BaseApiService {
  constructor() {
    super("profile/");
  }

  getInvoiceUrl = (body: DonationEntity) => this.post<string>("Donation/GetInvoiceUrl", JSON.stringify(body), "");
}

export const donationRepository = new DonationRepository();
