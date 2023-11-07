import fs from "fs";
const { google } = require("googleapis");
import { NextApiRequest } from "next";
import formidable from "formidable";

export type Files = { [key: string]: formidable.File };
type PartialDriveFile = {
  id: string;
  name: string;
};
type ResponseUploadFiles = {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
};

export class UploadFileGoogleDrive {
  private driveClient;

  public constructor() {
    this.driveClient = this.createDriveClient();
  }

  private createDriveClient() {
    const client = new google.auth.OAuth2(
      process.env.GOOGLE_EMAIL_CLIENT_ID,
      process.env.GOOGLE_EMAIL_CLIENT_SECRET,
      process.env.GOOGLE_EMAIL_REDIRECT_URI
    );
    client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });

    return google.drive({
      version: "v3",
      auth: client,
    });
  }

  private async createFolder(folderName: string): Promise<PartialDriveFile> {
    return this.driveClient.files
      .create({
        resource: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id, name",
      })
      .then((data: { data: PartialDriveFile }) => data.data);
  }

  private async searchFolder(folderName: string): Promise<PartialDriveFile | null> {
    return new Promise((resolve, reject) => {
      this.driveClient.files.list(
        {
          q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
          fields: "files(id, name)",
        },
        (err: any, res: any) => {
          if (err) {
            return reject(err);
          }

          return resolve(res.data.files ? res.data.files[0] : null);
        }
      );
    });
  }

  async saveFile(file: formidable.File, folderId?: string) {
    return this.driveClient.files.create({
      requestBody: {
        name: file.originalFilename,
        mimeType: file.mimetype || "image/jpg",
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: file.mimetype || "image/jpg",
        body: fs.createReadStream(file.filepath),
      },
    });
  }

  async parseForm<T extends Record<string, any>>(
    req: NextApiRequest
  ): Promise<{ files: Files; fields: T }> {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) return reject({ err });
        return resolve({ files: files as Files, fields: fields as T });
      });
    });
  }

  private async checkFolder(folderName: string) {
    let folder = await this.searchFolder(folderName).catch((error) => {
      return null;
    });

    if (!folder) {
      folder = await this.createFolder(folderName);
    }

    return folder;
  }

  async delete(id: string) {
    return this.driveClient.files.delete({ fileId: id, pageSize: 10000 });
  }

  async init(files: Files, folderName: string): Promise<ResponseUploadFiles[]> {
    const folder = await this.checkFolder(folderName);
    const paths = Object.values(files).map((el) =>
      this.saveFile(el, folder?.id).then((data) => data.data)
    );
    return await Promise.all(paths);
  }

  private async nestedGetFiles(id: string, files: ResponseUploadFiles[], nextPageToken?: string) {
    const result = await this.driveClient.files.list({
      q: `'${id}' in parents`,
      pageSize: 1000,
      pageToken: nextPageToken || "",
    });
    files.push(...result.data.files);
    if (result.data.nextPageToken) {
      await this.nestedGetFiles(id, files, result.data.nextPageToken);
    }
  }

  async getByIdFolder(idFolder: string): Promise<ResponseUploadFiles[]> {
    const files: ResponseUploadFiles[] = [];

    try {
      await this.nestedGetFiles(idFolder, files);
      return files;
    } catch {
      throw new Error("");
    }
  }
}
