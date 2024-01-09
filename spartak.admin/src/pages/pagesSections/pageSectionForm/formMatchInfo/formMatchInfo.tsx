import { Collapse, Form } from "antd";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormMatchInfo = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.mainPage.mainPageTitle")}
          key="main"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "previewImg", props.lang]}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
