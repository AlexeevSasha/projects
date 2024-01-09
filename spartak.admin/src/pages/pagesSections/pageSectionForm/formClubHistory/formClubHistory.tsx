import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormClubHistory = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubResults.mainInfo.collapseText")}
          key="clubResultMainInfo"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["mainInfo", "title", props.lang]} label={t("pagesSections.clubResults.mainInfo.title")}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["mainInfo", "previewImg", props.lang]}
            label={t("pagesSections.clubResults.mainInfo.banner")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/* История создания */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubHistory.historyOfCreation.collapseTitle")}
          key="historyOfCreation"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["historyOfCreation", "title", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.title")}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["historyOfCreation", "description", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.description")}
          >
            <TextArea style={{ height: "150px" }} />
          </Form.Item>

          <Form.Item
            name={["historyOfCreation", "img"]}
            label={t("pagesSections.clubHistory.historyOfCreation.creatorsPhoto")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/* История эмблемы */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubHistory.emblemHistory.collapseTitle")}
          key="emblemHistory"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["emblemHistory", "title", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.title")}
          >
            <Input />
          </Form.Item>

          <GridContainer>
            <Form.Item
              name={["emblemHistory", "firstColumn", props.lang]}
              label={t("pagesSections.clubHistory.emblemHistory.firstColumn")}
            >
              <TextArea style={{ height: "150px" }} />
            </Form.Item>
            <Form.Item
              name={["emblemHistory", "secondColumn", props.lang]}
              label={t("pagesSections.clubHistory.emblemHistory.secondColumn")}
            >
              <TextArea style={{ height: "150px" }} />
            </Form.Item>
          </GridContainer>

          <Form.List name={["emblemHistory", "emblems"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Collapse>
                      <Collapse.Panel
                        header={t("pagesSections.clubHistory.emblemHistory.emblem")}
                        key="emblem"
                        className="site-collapse-custom-panel"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "periodOfUseEmblem", props.lang]}
                          fieldKey={[name, "periodOfUseEmblem", props.lang]}
                          label={t("pagesSections.clubHistory.emblemHistory.periodOfUseEmblem")}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "photoOfEmblem"]}
                          fieldKey={[name, "photoOfEmblem"]}
                          label={t("pagesSections.clubHistory.emblemHistory.photoOfEmblem")}
                        >
                          <ImageField uploadRequest={imageRepository.upload} />
                        </Form.Item>

                        <MinusContainer>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </MinusContainer>
                      </Collapse.Panel>
                    </Collapse>
                  </>
                ))}
                <>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.clubHistory.emblemHistory.addEmblem")}
                    </Button>
                  </Form.Item>
                </>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/* Столетие создания клуба*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubHistory.anniversaryOfCreation.collapseTitle")}
          key="anniversaryOfCreation"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["anniversaryOfCreation", "title", props.lang]}
            label={t("pagesSections.clubHistory.anniversaryOfCreation.title")}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["anniversaryOfCreation", "description", props.lang]}
            label={t("pagesSections.clubHistory.anniversaryOfCreation.description")}
          >
            <TextArea />
          </Form.Item>
          <PhotoContainer>
            <Form.Item
              name={["anniversaryOfCreation", "firstImg"]}
              label={t("pagesSections.clubHistory.anniversaryOfCreation.firstPhoto")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item
              name={["anniversaryOfCreation", "secondImg"]}
              label={t("pagesSections.clubHistory.anniversaryOfCreation.secondPhoto")}
            >
              <ImageField uploadRequest={imageRepository.upload} />
            </Form.Item>
          </PhotoContainer>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  grid-template-rows: auto;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
`;
