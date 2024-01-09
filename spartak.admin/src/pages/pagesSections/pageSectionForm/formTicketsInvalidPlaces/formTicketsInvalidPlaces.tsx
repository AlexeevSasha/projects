import React from "react";
import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { imageRepository } from "../../../../api/imageRepository";
import { CMS } from "../../../../common/components/cms";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormTicketsInvalidPlaces = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/* Текстовый блок */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.description")}
          key="CorporateClientsInfoBlock"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["description", props.lang]}>
            <Wysiwyg minHeight={"300px"} height={"auto"} uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
