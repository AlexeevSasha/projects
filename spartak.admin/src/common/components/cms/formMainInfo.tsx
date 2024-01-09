import { Collapse, Form, Input } from "antd";
import { imageRepository } from "api/imageRepository";
import { useTranslation } from "react-i18next";
import { ImageField } from "ui/ImageField";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormMainInfo = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.commonInfo.collapseText")}
        key="FormMainInfo"
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
  );
};
