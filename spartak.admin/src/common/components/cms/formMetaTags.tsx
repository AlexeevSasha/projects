import { Collapse, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormMetaTags = ({ lang }: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel header={t("allPages.metaTags")} key="FormMetaTags" className="site-collapse-custom-panel">
        <Form.Item label={"Title page"} name={["metaTags", "titleName", lang]}>
          <Input />
        </Form.Item>
        <Form.Item label={"og:title"} name={["metaTags", "titleOg", lang]}>
          <Input />
        </Form.Item>
        <Form.Item label={"og:image"} name={["metaTags", "imageOg", lang]}>
          <Input />
        </Form.Item>
        <Form.Item label={"og:type"} name={["metaTags", "typeOg", lang]}>
          <Input />
        </Form.Item>
        <Form.Item label={"og:description"} name={["metaTags", "descriptionOg", lang]}>
          <Input />
        </Form.Item>
        <Form.Item label={"og:locale"} name={["metaTags", "localeOg", lang]}>
          <Input />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};
