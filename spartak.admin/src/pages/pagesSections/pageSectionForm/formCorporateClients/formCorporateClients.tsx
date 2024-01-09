import React from "react";
import { Checkbox, Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import { ImageField } from "../../../../ui/ImageField";
import { imageRepository } from "../../../../api/imageRepository";
import { CMS } from "../../../../common/components/cms";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormCorporateClients = (props: ICmsProps) => {
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

      {/* форма */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.corporateClients.form.title")}
          key="CorporateClientsFeedbackBlock"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["form", "img"]} label={t("pagesSections.corporateClients.form.img")}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item name={["form", "show"]} valuePropName="checked">
            <Checkbox>{t("pagesSections.corporateClients.form.show")}</Checkbox>
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
