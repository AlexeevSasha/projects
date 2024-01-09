import { Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormLoyaltyRules = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesAdjacentTerritory.mainInfo.collapseText")}
          key="2"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["mainInfo", "previewImg", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoImg")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item
            name={["mainInfo", "title", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoTitle")}
          >
            <Input />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/*Контент страницы*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.chairPlotting.description")}
          key="3"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["info", "description", props.lang]} label={t("pagesSections.academyEnter.mainInfo")}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
