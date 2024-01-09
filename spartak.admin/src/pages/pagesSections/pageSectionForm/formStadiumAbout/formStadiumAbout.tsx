import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormStadiumAbout = (props: ICmsProps) => {
  const { t } = useTranslation();
  const { Panel } = Collapse;

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/* Характеристики */}
      <Collapse>
        <Panel
          header={t("pagesSections.aboutStadium.characteristic.collapseText")}
          key="1"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["characteristic", "img", props.lang]}
            label={t("pagesSections.aboutStadium.characteristic.img")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>

          <Form.List name={["characteristic", "list"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <StyledSpace key={key} align="baseline">
                    <Form.Item
                      required
                      {...restField}
                      name={[name, "name", props.lang]}
                      fieldKey={[name, "name", props.lang]}
                    >
                      <Input required placeholder={t("pagesSections.aboutStadium.characteristic.list.name")} />
                    </Form.Item>
                    <Form.Item
                      required
                      {...restField}
                      name={[name, "description", props.lang]}
                      fieldKey={[name, "description", props.lang]}
                    >
                      <Input required placeholder={t("pagesSections.aboutStadium.characteristic.list.description")} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </StyledSpace>
                ))}
                <Form.Item style={{ paddingBottom: "10px" }}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {t("pagesSections.aboutStadium.characteristic.addButton")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <GridContainer>
            <Form.Item name={["characteristic", "columnText1", props.lang]}>
              <Wysiwyg bottom={"0"} uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item name={["characteristic", "columnText2", props.lang]}>
              <Wysiwyg bottom={"0"} uploadRequest={imageRepository.upload} />
            </Form.Item>
          </GridContainer>
        </Panel>
      </Collapse>
      {/* Достижения */}
      <Collapse>
        <Panel
          header={t("pagesSections.aboutStadium.achievements.collapseText")}
          key="1"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["achievements", "img", props.lang]}
            label={t("pagesSections.aboutStadium.achievements.img")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>

          <Form.List name={["achievements", "list"]}>
            {(fields, { add, remove }) => (
              <GridContainer>
                {fields.map(({ key, name, ...restField }) => (
                  <SpaceForTextArea key={key} align="baseline">
                    <Form.Item {...restField} name={[name, "year", props.lang]}>
                      <Input placeholder={t("pagesSections.aboutStadium.achievements.list.year")} />
                    </Form.Item>

                    <Form.Item name={[name, "description", props.lang]}>
                      <TextArea placeholder={t("pagesSections.aboutStadium.achievements.list.description")} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "reward", props.lang]}
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input placeholder={t("pagesSections.aboutStadium.achievements.list.reward")} />
                    </Form.Item>
                    <MinusContainer>
                      <DeleteOutlined onClick={() => remove(name)} />
                    </MinusContainer>
                  </SpaceForTextArea>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {t("pagesSections.aboutStadium.achievements.list.addButton")}
                  </Button>
                </Form.Item>
              </GridContainer>
            )}
          </Form.List>
        </Panel>
      </Collapse>
      {/* История стадиона */}
      <Collapse>
        <Panel
          header={t("pagesSections.aboutStadium.stadiumHistory.collapseText")}
          key="1"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            label={t("pagesSections.aboutStadium.stadiumHistory.title")}
            name={["stadiumHistory", "title", props.lang]}
          >
            <Input size={"middle"} />
          </Form.Item>

          <PhotoBlock>
            <GridContainer>
              <Form.Item name={["stadiumHistory", "firstParagraph1Column", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item name={["stadiumHistory", "firstParagraph2Column", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
            </GridContainer>
            <Form.Item name={["stadiumHistory", "firstParagraphImg", props.lang]}>
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>

            <FirstColumnContainer>
              <Form.Item name={["stadiumHistory", "secondParagraph1Column", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item name={["stadiumHistory", "secondParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </FirstColumnContainer>

            <SecondColumnContainer>
              <Form.Item name={["stadiumHistory", "thirdParagraphImg", props.lang]}>
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item name={["stadiumHistory", "thirdParagraph2Column", props.lang]}>
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
            </SecondColumnContainer>
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
  gap: 24px;
`;
const StyledSpace = styled(Space)`
  display: flex;
  margin-bottom: 8px;
  width: 100%;

  .ant-space-item {
    width: 47.5%;

    :last-child {
      width: 5%;
    }
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  grid-template-rows: auto;
`;

const FirstColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr min-content;
  gap: 24px;
  grid-template-rows: auto;

  .ant-input {
    height: inherit;
  }
`;
const SecondColumnContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 3fr;
  gap: 24px;
  grid-template-rows: auto;
`;

const SpaceForTextArea = styled(Space)`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  width: 100%;

  .ant-input-number {
    width: 100%;
  }

  .ant-space-item {
    width: 100%;
  }
`;

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
