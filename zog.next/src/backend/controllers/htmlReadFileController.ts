import fs from "fs";
import { join } from "path";

export class HtmlReadFilesController {
  private pathHtml(nameFile: string) {
    return join(process.cwd(), "src", "html", `${nameFile}.html`);
  }

  readFile(nameFile: string) {
    return fs.readFileSync(this.pathHtml(nameFile), "utf-8");
  }
}
