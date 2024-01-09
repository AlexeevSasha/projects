import { Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormKidsRules = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubResults.mainInfo.collapseText")}
          key="stadiumUsefulInfo"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "title", props.lang]} label={t("pagesSections.clubResults.mainInfo.title")}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["mainInfo", "previewImg", props.lang]}
            label={t("pagesSections.clubResults.mainInfo.banner")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/* Правила */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.spartakKids.rules.title")}
          key="rules"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["rules", props.lang]} label={t("subscriptions.description")}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
