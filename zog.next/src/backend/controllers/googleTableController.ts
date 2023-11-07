import { google } from "googleapis";

class GoogleTableController {
  OAuth2Client;

  constructor() {
    this.OAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_EMAIL_CLIENT_ID,
      process.env.GOOGLE_EMAIL_CLIENT_SECRET,
      process.env.GOOGLE_EMAIL_REDIRECT_URI
    );
    this.OAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    });
  }

  public async writeToTable(tableId: string, values: string[]) {
    try {
      const sheets = google.sheets("v4");
      const request = {
        spreadsheetId: tableId,
        range: "A1:A6",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [values],
        },
        auth: this.OAuth2Client,
      };
      await sheets.spreadsheets.values.append(request);
    } catch (error) {
      throw error;
    }
  }
}

export { GoogleTableController };
