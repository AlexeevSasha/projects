import { LocaleType } from "../../../api/dto/LocaleType";
import { IButton } from "./IButton";

export interface IFoodCourtDescription {
  images: LocaleType[];
  description?: LocaleType;
  button: IButton;
}
