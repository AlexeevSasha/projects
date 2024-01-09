import { Collapse, Form } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormAcademyEnter = (props: ICmsProps) => {
  const { t } = useTranslation();
  const { Panel } = Collapse;

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/* Информация */}
      <Collapse>
        <Panel header={t("pagesSections.academyEnter.mainInfo")} key="1" className="site-collapse-custom-panel">
          <PhotoBlock>
            <ColumnContainer>
              <Form.Item name={["info", "firstParagraph", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item name={["info", "firstParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </ColumnContainer>

            <ColumnContainer>
              <Form.Item name={["info", "secondParagraph", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>

              <Form.Item name={["info", "secondParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </ColumnContainer>

            <ColumnContainer>
              <Form.Item name={["info", "thirdParagraph", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item name={["info", "thirdParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </ColumnContainer>

            <ColumnContainer>
              <Form.Item name={["info", "fourthParagraph", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>

              <Form.Item name={["info", "fourthParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </ColumnContainer>
          </PhotoBlock>
        </Panel>
      </Collapse>
    </>
  );
};

const PhotoBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  gap: 12px;
`;

const ColumnContainer = styled.div`
  display: flex;
  column-gap: 24px;
  grid-template-rows: auto;

  .ant-input {
    height: inherit;
  }
`;
