import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { google } from "googleapis";

class EmailController {
  OAuth2Client;

  constructor() {
    this.OAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_EMAIL_CLIENT_ID,
      process.env.GOOGLE_EMAIL_CLIENT_SECRET,
      process.env.GOOGLE_EMAIL_REDIRECT_URI
    );
    this.OAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
    });
  }

  private async createTransport() {
    const accessToken = await this.OAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_EMAIL_FROM,
        clientId: process.env.GOOGLE_EMAIL_CLIENT_ID,
        clientSecret: process.env.GOOGLE_EMAIL_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token || "",
      },
      from: process.env.GOOGLE_EMAIL_FROM,
    });
  }

  public async sendEmail(data: Mail.Options) {
    const transport = await this.createTransport();

    try {
      await transport.sendMail({
        from: process.env.GOOGLE_EMAIL_FROM,
        to: data.to,
        replyTo: process.env.GOOGLE_EMAIL_FROM,
        subject: data.subject,
        text: data.text,
        html: data.html,
      });
    } catch (error) {
      throw error;
    }
  }
}

export { EmailController };
