import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, InputNumber, Row } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormCLubResults = (props: ICmsProps) => {
  const { t } = useTranslation();
  const { Panel } = Collapse;
  const presentYear = new Date().getFullYear();

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

      {/* Шкала лет с результатами */}
      <Collapse>
        <Panel
          header={t("pagesSections.clubResults.lineWithDates.title")}
          key="clubResultTimeline"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["historyResults", "timeline"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Collapse>
                      <Panel
                        header={t("pagesSections.clubResults.lineWithDates.event")}
                        key="clubResultTimeline1"
                        className="site-collapse-custom-panel"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "eventDate", props.lang]}
                          fieldKey={[name, "eventDate", props.lang]}
                          label={t("pagesSections.clubResults.lineWithDates.eventDate")}
                        >
                          <InputNumber min={1922} max={presentYear} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "eventDescription", props.lang]}
                          fieldKey={[name, "eventDescription", props.lang]}
                          label={t("pagesSections.clubResults.lineWithDates.eventDescription")}
                        >
                          <Wysiwyg uploadRequest={imageRepository.upload} />
                        </Form.Item>
                        <PhotoContainer>
                          <Form.Item
                            {...restField}
                            name={[name, "eventPhoto", props.lang]}
                            fieldKey={[name, "eventPhoto", props.lang]}
                            label={t("pagesSections.clubResults.lineWithDates.eventPhoto")}
                          >
                            <ImageField uploadRequest={imageRepository.upload} />
                          </Form.Item>
                        </PhotoContainer>
                        <MinusContainer>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </MinusContainer>
                      </Panel>
                    </Collapse>
                  </>
                ))}
                <AddButtonContainer>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.clubResults.lineWithDates.addDate")}
                    </Button>
                  </Form.Item>
                </AddButtonContainer>
              </>
            )}
          </Form.List>
        </Panel>
      </Collapse>

      {/* Итоги сезонов */}
      <Collapse>
        <Panel
          header={t("pagesSections.clubResults.seasonsResults.title")}
          key="clubResultSeasonsResults"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["historyResults", "seasonsResults"]}>
            {(fields, { add, remove, move }) => (
              <>
                <AddButtonContainer>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                        setTimeout(() => move(fields.length, 0), 0);
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      {t("pagesSections.clubResults.seasonsResults.addSeason")}
                    </Button>
                  </Form.Item>
                </AddButtonContainer>
                {fields.map(({ name }) => (
                  <Collapse>
                    <Panel
                      header={t("pagesSections.clubResults.seasonsResults.resultOfSeason")}
                      key="clubResultSeasonsResults1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Form.Item name={[name, "seasonStart"]}>
                          <InputNumber min={1922} placeholder={t("pagesSections.clubResults.seasonsResults.season")} />
                        </Form.Item>
                        <StyledSlash>/</StyledSlash>
                        <Form.Item name={[name, "seasonEnd"]}>
                          <InputNumber min={1922} placeholder={t("pagesSections.clubResults.seasonsResults.season")} />
                        </Form.Item>
                      </Row>

                      <Form.List name={[name, "achievements"]}>
                        {(fieldsAchievement, { add: addAchievement, remove: deleteAchievement }) => (
                          <>
                            {fieldsAchievement.map(({ name: achievementName }) => (
                              <>
                                <Form.Item name={[achievementName, props.lang]}>
                                  <Input placeholder={t("pagesSections.clubResults.seasonsResults.achievement")} />
                                </Form.Item>

                                <MinusContainer>
                                  <DeleteOutlined onClick={() => deleteAchievement(achievementName)} />
                                </MinusContainer>
                              </>
                            ))}
                            <AddButtonContainer>
                              <Form.Item>
                                <Button type="dashed" onClick={() => addAchievement()} block icon={<PlusOutlined />}>
                                  {t("pagesSections.clubResults.seasonsResults.addAchievement")}
                                </Button>
                              </Form.Item>
                            </AddButtonContainer>
                          </>
                        )}
                      </Form.List>
                      <MinusContainer>
                        <DeleteOutlined onClick={() => remove(name)} />
                      </MinusContainer>
                    </Panel>
                  </Collapse>
                ))}
                <AddButtonContainer>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.clubResults.seasonsResults.addSeason")}
                    </Button>
                  </Form.Item>
                </AddButtonContainer>
              </>
            )}
          </Form.List>
        </Panel>
      </Collapse>
    </>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
`;
const PhotoContainer = styled.div`
  padding-top: 10px;
`;
const AddButtonContainer = styled.div`
  padding-top: 14px;
`;
const StyledSlash = styled.span`
  padding: 0 4px;
  font-size: 24px;
`;
