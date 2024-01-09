import { FormImgTextWithTerritory } from "./formImgTextWithTerritory";
import { FormMainInfo } from "./formMainInfo";
import { FormMetaTags } from "./formMetaTags";
import { FormRedBanner } from "./formRedBanner";
import { FormTriplePhoto } from "./formTriplePhoto";
import { FormRedBlock } from "./formRedBlock";
import { FormImgWithWysiwygInline } from "./formImgWithWysiwygInline";
import { FormPremiumLevelsImgText } from "./formPremiumLevelsImgText";
import { FormButton } from "./formButton";

const CMS = () => {
  return <></>;
};

CMS.MetaTags = FormMetaTags;
CMS.RedBanner = FormRedBanner;
CMS.MainInfo = FormMainInfo;
CMS.Button = FormButton;
CMS.ImgTextWithTerritory = FormImgTextWithTerritory;
CMS.TriplePhoto = FormTriplePhoto;
CMS.RedBlock = FormRedBlock;
CMS.ImgWithWysiwygInline = FormImgWithWysiwygInline;
CMS.PremiumLevelsImgText = FormPremiumLevelsImgText;
export { CMS };
