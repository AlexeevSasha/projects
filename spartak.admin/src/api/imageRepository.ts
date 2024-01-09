import { BaseApiService } from "./BaseApiService";

class ImageRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  upload = async (file: File) => {
    const formData = new FormData();
    formData.append("formFile", file);

    return await this.post("ImageDirectories/Add", formData, {
      headers: {},
    }).catch(() => file.name);
  };

  remove = async (filePaths: string[]) => {
    const path = filePaths.filter((p) => !!p);

    path.length && (await this.delete("ImageDirectories/Delete", JSON.stringify(path)));
  };
}

export const imageRepository = new ImageRepository();
