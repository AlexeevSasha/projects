import { Collapse, Form } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormMediaNews = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.mediaNews.mediaNewsSpartak")}
          key="mediaNewsSpartak"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "previewImgSpartak", props.lang]}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.mediaNews.mediaNewsSpartakYouth")}
          key="mediaNewsSpartakYouth"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "previewImgSpartakYouth", props.lang]}>
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
