import { Collapse, Form } from "antd";
import { Wysiwyg } from "../../../ui/Wisiwyg/Wysiwyg";
import { imageRepository } from "../../../api/imageRepository";
import { useTranslation } from "react-i18next";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormRedBlock = ({ lang }: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.redBlock.collapseText")}
        key="FormRedBlock"
        className="site-collapse-custom-panel"
      >
        <Form.Item name={["redBanner", "text1", lang]} label={t("pagesSections.redBlock.firstColumn")}>
          <Wysiwyg uploadRequest={imageRepository.upload} bottom="10px" />
        </Form.Item>
        <Form.Item name={["redBanner", "text2", lang]} label={t("pagesSections.redBlock.secondColumn")}>
          <Wysiwyg uploadRequest={imageRepository.upload} bottom="10px" />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};
