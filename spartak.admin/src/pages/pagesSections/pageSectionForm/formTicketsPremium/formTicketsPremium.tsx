import React from "react";
import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import { ImageField } from "../../../../ui/ImageField";
import { imageRepository } from "../../../../api/imageRepository";
import { CMS } from "../../../../common/components/cms";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormTicketsPremium = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/*Красный блок с текстом*/}
      <CMS.RedBlock lang={props.lang} />
      {/* Информативный блог с фотографиями и описанием */}
      <CMS.ImgWithWysiwygInline lang={props.lang} />
      {/* Информативный блог с уровнями премиума */}
      <CMS.PremiumLevelsImgText lang={props.lang} />
      {/* Схема трибуны */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.lodgePlan.title")}
          key="FormLodgePlan"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["lodgePlan", props.lang]} label={t("pagesSections.image")}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
