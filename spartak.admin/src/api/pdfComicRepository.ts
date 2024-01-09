import { BaseApiService } from "./BaseApiService";

class PdfComicRepository extends BaseApiService {
  constructor() {
    super("media");
  }

  upload = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("PdfComic/Add", formData, {
      headers: {},
    }).catch(() => file.name);
  };
}

export const pdfComicRepository = new PdfComicRepository();
