import React from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Form } from "antd";
import { ImageField } from "../../../../ui/ImageField";
import { imageRepository } from "../../../../api/imageRepository";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormMatches = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
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
