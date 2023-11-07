import { IStripePayment } from "../interfaces/stripe";
import Stripe from "stripe";
import { STRIPE_DESCRIPTION } from "../helpers/stripeDecription";

export class StripeController {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.PAY_STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15",
    });
  }

  private buildPay(param: IStripePayment): Stripe.Checkout.SessionCreateParams {
    return {
      mode: "payment",
      success_url: `${param.success_url}?session_id={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price_data: {
            currency: param.currency,
            product_data: {
              name: "К оплате",
              description: STRIPE_DESCRIPTION,
            },
            unit_amount: param.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        form: param.form || "",
        utm: param.utm || "",
      },
    };
  }

  async createPayment(options: IStripePayment) {
    const option = this.buildPay(options);
    return this.stripe.checkout.sessions.create(option);
  }

  async getById(id: string) {
    return await this.stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });
  }
}
