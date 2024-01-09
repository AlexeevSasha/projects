import { BaseApiService } from "./BaseApiService";

class SubscribeMedia extends BaseApiService {
  constructor() {
    super("profile");
  }
  subscribeMediaRequest = (body: string) => this.post("/MediaSubscription/Subscribe", JSON.stringify(body));
}

export const subscribeMedia = new SubscribeMedia();
