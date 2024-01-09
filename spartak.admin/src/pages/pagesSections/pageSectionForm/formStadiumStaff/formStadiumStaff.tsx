import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormStadiumStaff = (props: ICmsProps) => {
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

      {/*Что такое Event Team*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumStaff.eventTeam.collapseTitle")}
          key="eventTeam"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["staffEventTeam", "title", props.lang]}
            label={t("pagesSections.stadiumStaff.eventTeam.title")}
          >
            <Input />
          </Form.Item>

          <GridContainer>
            <Form.Item
              name={["staffEventTeam", "firstColumn", props.lang]}
              label={t("pagesSections.clubHistory.emblemHistory.firstColumn")}
            >
              <Wysiwyg bottom={"0"} uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item
              name={["staffEventTeam", "secondColumn", props.lang]}
              label={t("pagesSections.clubHistory.emblemHistory.secondColumn")}
            >
              <Wysiwyg bottom={"0"} uploadRequest={imageRepository.upload} />
            </Form.Item>
          </GridContainer>
        </Collapse.Panel>
      </Collapse>

      {/*Виды стюартов*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumStaff.stewards.collapseTitle")}
          key="stewardsCategory"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["stewardsCategory", "title", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.title")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["stewardsCategory", "description", props.lang]}
            label={t("pagesSections.stadiumStaff.stewards.description")}
          >
            <TextArea style={{ height: "150px" }} />
          </Form.Item>
          <Form.List name={["stewardsCategory", "stewards"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ name }) => (
                  <>
                    <Form.Item
                      name={[name, props.lang]}
                      label={t("pagesSections.stadiumStaff.stewards.categoryOfStewards")}
                    >
                      <Input />
                    </Form.Item>
                    <MinusContainer>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </MinusContainer>
                  </>
                ))}
                <>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.stadiumStaff.stewards.addCategory")}
                    </Button>
                  </Form.Item>
                </>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/*Вопрос  ответ*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumStaff.questionAnswer.collapseTitle")}
          key="questionAnswer"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["questionAnswer", "title", props.lang]}
            label={t("pagesSections.stadiumStaff.eventTeam.title")}
          >
            <Input />
          </Form.Item>
          <Form.List name={["questionAnswer", "blockQuestionsAnswers"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Collapse>
                    <Collapse.Panel
                      header={t("pagesSections.stadiumStaff.questionAnswer.collapseTitle")}
                      key="stewardsCategory"
                      className="site-collapse-custom-panel"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "question", props.lang]}
                        fieldKey={[name, "question", props.lang]}
                        label={t("pagesSections.stadiumStaff.questionAnswer.question")}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "answer", props.lang]}
                        fieldKey={[name, "answer", props.lang]}
                        label={t("pagesSections.stadiumStaff.questionAnswer.answer")}
                      >
                        <Wysiwyg uploadRequest={imageRepository.upload} />
                      </Form.Item>
                      <MinusContainer>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </MinusContainer>
                    </Collapse.Panel>
                  </Collapse>
                ))}
                <>
                  <Form.Item style={{ paddingTop: "24px" }}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.stadiumStaff.questionAnswer.addQuestionAnswer")}
                    </Button>
                  </Form.Item>
                </>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/*Дополнительные условия*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumStaff.admissionConditions.collapseTitle")}
          key="admissionConditions"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["admissionConditions"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Form.Item
                      {...restField}
                      name={[name, "title", props.lang]}
                      fieldKey={[name, "title", props.lang]}
                      label={t("pagesSections.stadiumStaff.admissionConditions.title")}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "description", props.lang]}
                      fieldKey={[name, "description", props.lang]}
                      label={t("pagesSections.stadiumStaff.stewards.description")}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} />
                    </Form.Item>
                    <MinusContainer>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </MinusContainer>
                  </>
                ))}
                <>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.stadiumStaff.admissionConditions.addBlock")}
                    </Button>
                  </Form.Item>
                </>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
  padding-bottom: 16px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  grid-template-rows: auto;
`;
