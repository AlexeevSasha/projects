import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormTicketsMain = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      {/* <CMS.MetaTags lang={props.lang} /> */}

      {/* Тест для СЕО */}
      <Collapse>
        <Collapse.Panel header={t("pagesSections.ticketsMain.seoText")} key="3" className="site-collapse-custom-panel">
          <Form.Item name={["seoText", props.lang]}>
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
