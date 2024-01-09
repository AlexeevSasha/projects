import { BaseApiService } from "./BaseApiService";

export interface FeedBackDto {
  name: string;
  phoneNumber: string;
  userEmail: string | null;
  pageUrl: string;
  checkBox: boolean;
  feedbackType:
    | "ConferenceHall"
    | "FoodCourt"
    | "ChildrenHall"
    | "HallOfFame"
    | "VipHall"
    | "AdjacentTerritories"
    | "CorporateClients"
    | "FamilySector"
    | "personnel";
  birthDay?: string;
}

class FeedbackRepository extends BaseApiService {
  constructor() {
    super("admin/Feedback/");
  }
  addFeedback = (body: Omit<FeedBackDto, "checkBox">) => this.post("SendToManager", JSON.stringify(body));
}

export const feedbackRepository = new FeedbackRepository();
