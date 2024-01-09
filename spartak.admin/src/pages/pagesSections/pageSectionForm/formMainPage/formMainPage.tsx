import { Collapse, Form } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormMainPage = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.mainPage.mainPageTitle")}
          key="main"
          className="site-collapse-custom-panel"
        >
          <ImagesBlock>
            <Form.Item name={["mainInfo", "previewImgL", props.lang]} label={"L"}>
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item name={["mainInfo", "previewImgS", props.lang]} label={"S"}>
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item name={["mainInfo", "previewImgM", props.lang]} label={"M"}>
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
          </ImagesBlock>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

const ImagesBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
