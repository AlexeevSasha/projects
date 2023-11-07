export class GetShareMedia {
  url: string;
  title?: string;
  image?: string;

  constructor() {
    this.url = encodeURIComponent("https://spb.polza.ru/");
  }

  vk() {
    return `https://vk.com/share.php?url=${this.url}`;
  }
  tg() {
    return `https://t.me/share/url?url=${this.url}`;
  }
  ok() {
    return `https://connect.ok.ru/offer?url=${this.url}`;
  }
}

export const getShareMedia = new GetShareMedia();
