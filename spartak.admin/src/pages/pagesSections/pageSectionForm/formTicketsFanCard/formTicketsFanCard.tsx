import { Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormTicketsFanCard = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.commonInfo.collapseText")}
          key="commonInfo"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "previewImg", props.lang]} label={t("pagesSections.commonInfo.mainInfoImg")}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item name={["mainInfo", "title", props.lang]} label={t("pagesSections.commonInfo.mainInfoTitle")}>
            <Input />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/* Весь тест страницы */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.ticketsFanCard.text")}
          key="ticketsFanCard.text"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["text", props.lang]} label={t("pagesSections.ticketsFanCard.text")}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
