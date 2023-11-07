import { IMailing } from "../interfaces/IMailing";
import { HtmlReadFilesController } from "./htmlReadFileController";
import { EmailMailingController } from "./emailMailingController";
import { EmailController } from "./emailController";
import { replaceHtmlString } from "../utils/replaceHtmlString";
import { wordDeclension } from "../../common/constants/wordDeclension";

export class MailingController {
  private readonly criterion: IMailing["criterion"];
  private readonly title: string;
  private readonly emailHtml: string;
  private readonly target_email: string;
  private readonly emailController: EmailController;

  constructor({ criterion, letter, title, target_email }: IMailing) {
    this.criterion = criterion;
    this.title = title;
    this.target_email = target_email;
    this.emailHtml = new HtmlReadFilesController().readFile(letter);
    this.emailController = new EmailController();
  }

  private async sendEmail(email: string, name: string) {
    return this.emailController.sendEmail({
      to: email,
      subject: this.title || `Рассылка от ${process.env.NEXTAUTH_URL}`,
      html: replaceHtmlString(
        this.emailHtml,
        ["name", "gift"],
        [name, `${process.env.NEXTAUTH_URL}/redirect/auto-login?email=${email}&manual=true`]
      ),
    });
  }

  sendMessage(count: number) {
    if (!count) return "Под фильтр рассылки нет пользователей";
    return `Письма отправлено: ${count} ${wordDeclension(count, [
      "пользователю",
      "пользователям",
      "пользователям",
    ])}`;
  }

  async init() {
    const emails = await new EmailMailingController(this.criterion, this.target_email).init();
    const request = emails.map(({ email, name }) => this.sendEmail(email, name));
    await Promise.allSettled(request);

    return this.sendMessage(emails.length);
  }
}
