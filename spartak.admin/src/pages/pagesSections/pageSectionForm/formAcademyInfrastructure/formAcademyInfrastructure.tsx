import React from "react";
import { Collapse, Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { imageRepository } from "../../../../api/imageRepository";
import { CMS } from "../../../../common/components/cms";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormAcademyInfrastructure = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />

      {/* Блок о инфраструктуре */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.academyInfrastructure.about")}
          key="FormAbout"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["about", "title", props.lang]} label={t("pagesSections.academyInfrastructure.title")}>
            <Input />
          </Form.Item>
          <Form.Item name={["about", "text1", props.lang]} label={t("pagesSections.academyInfrastructure.firstColumn")}>
            <Wysiwyg uploadRequest={imageRepository.upload} bottom="15px" />
          </Form.Item>
          <Form.Item
            name={["about", "text2", props.lang]}
            label={t("pagesSections.academyInfrastructure.secondColumn")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Space size={"large"}>
            <Form.Item
              name={["about", "images", "light"]}
              label={t("pagesSections.academyInfrastructure.images.light")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item name={["about", "images", "dark"]} label={t("pagesSections.academyInfrastructure.images.dark")}>
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
          </Space>
        </Collapse.Panel>
      </Collapse>
      {/* Баннер */}
      <CMS.RedBanner lang={props.lang} />
      {/* Второстепенный заголовок */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.academyInfrastructure.description")}
          key="FormSecondTitle"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["description", "title", props.lang]} label={t("pagesSections.academyInfrastructure.title")}>
            <Input />
          </Form.Item>
          {/* Информативный блог с фотографиями и описанием */}
          <CMS.ImgWithWysiwygInline name={"description"} lang={props.lang} />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
