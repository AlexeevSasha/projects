import { NotCustomBlocksEnum } from "./NotCustomBlocksEnum";

export interface IIntegralDiseaseEpicrisisVisible {
  blockName: string;
  id: number;
  isCustom: boolean;
  isPreview: boolean;
  sort: number;
  confBlockId: NotCustomBlocksEnum;
}
