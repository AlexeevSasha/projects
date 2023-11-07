import crypto from "crypto";
import { generateId } from "../../common/constants/generateId";

interface IParams {
  utm?: string | string[] | undefined;
  form?: string | string[] | undefined;
  type?: "manual";
  price: string;
}

export class RobokassaController {
  private readonly utm: string;
  private readonly form: string;
  private readonly outSum: string;
  private readonly login: string;
  private readonly password: string;

  constructor({ utm, form, price, type }: IParams) {
    this.utm = typeof utm === "string" ? utm : "";
    this.form = typeof form === "string" ? form : "";
    this.outSum = price;
    [this.login, this.password] = this.getAuth(type);
  }

  private getAuth(type?: IParams["type"]): [string, string] {
    let login = process.env.ROBOKASSA_LOGIN;
    let password = process.env.ROBOKASSA_PASSWORD;

    if (type === "manual") {
      login = process.env.ROBOKASSA_LOGIN_MANUAL;
      password = process.env.ROBOKASSA_PASSWORD_MANUAL;
    }

    return [String(login), String(password)];
  }

  private createShp() {
    return [`shp_form=${this.form || ""}`, `shp_id=${generateId()}`, `shp_utm=${this.utm || ""}`];
  }

  private createSignature(receipt: string, shp: string[]) {
    const generateValue = [
      this.login,
      this.outSum,
      process.env.ROBOKASSA_INVID,
      receipt,
      this.password,
      shp.join(":"),
    ].join(":");

    return crypto.createHash("md5").update(generateValue).digest("hex");
  }

  private createReceipt(name: string) {
    const receiptArray = {
      items: [
        {
          name,
          quantity: 1,
          sum: this.outSum,
          payment_method: "full_payment",
          payment_object: "commodity",
          tax: "none",
        },
      ],
    };

    return JSON.stringify(receiptArray);
  }

  private createUrl(signature: string, receipt: string, shp: string[]) {
    return `${process.env.ROBOKASSA_URL}?MerchantLogin=${this.login}&OutSum=${this.outSum}&InvId=${
      process.env.ROBOKASSA_INVID
    }&Receipt=${receipt}&SignatureValue=${signature}&${shp.join("&")}`;
  }

  init(title: string) {
    const shp = this.createShp();
    const receipt = this.createReceipt(title);
    const signature = this.createSignature(receipt, shp);

    return this.createUrl(signature, encodeURIComponent(receipt), shp);
  }
}
