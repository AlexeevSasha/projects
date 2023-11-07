import { IFilesGoogleDrive } from "../interfaces/FilesGoogleDrive";

class FilesGoogleDrive {
  private images: IFilesGoogleDrive[];
  private audio: IFilesGoogleDrive[];

  constructor() {
    this.images = [];
    this.audio = [];
  }

  setImage(images: IFilesGoogleDrive[]) {
    if (this.images.length) return;
    this.images = images;
  }

  setAudio(audio: IFilesGoogleDrive[]) {
    if (this.audio.length) return;
    this.audio = audio;
  }

  getImageByUrl(url: string) {
    const id = url.split("_").pop();
    const img = this.images.find((el) => el.name.split("_").pop() === id);

    return img
      ? { ...img, url: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_URL_IMAGE + img.id }
      : { url: "", id: "" };
  }

  getAudioById(id: string) {
    const audio = this.audio.find((el) => el.id === id);

    return audio ? process.env.NEXT_PUBLIC_GOOGLE_DRIVE_URL_IMAGE + audio.id : "";
  }
}

export const filesGoogleDrive = new FilesGoogleDrive();
