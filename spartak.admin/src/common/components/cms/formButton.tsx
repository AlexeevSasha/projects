import { useTranslation } from "react-i18next";
import { Checkbox, Collapse, Form, Input } from "antd";
import { NamePath } from "antd/lib/form/interface";
import { getNamePath } from "../../helpers/getNamePath";
import { ICmsProps } from "../../interfaces/ICmsProps";

interface IProps extends ICmsProps {
  name: NamePath;
}
export const FormButton = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel header={t("pagesSections.button.title")} key="FormButton" className="site-collapse-custom-panel">
        <Form.Item name={getNamePath(props.name, ["button", "show"])} valuePropName="checked">
          <Checkbox>{t("pagesSections.button.show")}</Checkbox>
        </Form.Item>
        <Form.Item
          name={getNamePath(props.name, ["button", "text", props.lang])}
          label={t("pagesSections.button.text")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={getNamePath(props.name, ["button", "link", props.lang])}
          label={t("pagesSections.button.link")}
        >
          <Input />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  );
};
