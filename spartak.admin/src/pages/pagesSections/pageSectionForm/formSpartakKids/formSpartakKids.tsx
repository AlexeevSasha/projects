import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Typography } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { theme } from "../../../../assets/theme/theme";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormSpartakKids = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/*мета - теги*/}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.clubResults.mainInfo.collapseText")}
          key="stadiumUsefulInfo"
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

      {/* Стань частью команды Spartak Kids! */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.spartakKids.kids.becomePartOfTeam")}
          key="becomePartOfTeam"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["becomePartOfTeam", "title", props.lang]}
            label={t("pagesSections.stadiumStaff.eventTeam.title")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["becomePartOfTeam", "description", props.lang]}
            label={t("pagesSections.chairPlotting.description")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item name={["becomePartOfTeam", "img", props.lang]} label={t("pagesSections.spartakKids.kids.image")}>
            <ImageField
              uploadRequest={imageRepository.upload}
              validation={{
                width: 538,
                height: 538,
                size: 1024,
                format: ["png", "jpeg"],
              }}
            />
          </Form.Item>

          <Typography.Text>
            {t("allPages.form.uploadDesc", {
              format: "png, jpeg",
              width: "538",
              height: "538",
              size: "1",
            })}
          </Typography.Text>

          <Form.Item
            name={["becomePartOfTeam", "link", props.lang]}
            label={t("pagesSections.spartakKids.kids.buttonLink")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["becomePartOfTeam", "buttonTitle", props.lang]}
            label={t("pagesSections.spartakKids.kids.buttonName")}
          >
            <Input />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/* Привилегии участника */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.spartakKids.kids.memberPrivileges")}
          key="memberPrivileges "
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["memberPrivileges", "title", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.title")}
          >
            <Input />
          </Form.Item>

          <Form.List name={["memberPrivileges", "list"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Form.Item
                      {...restField}
                      name={[name, props.lang]}
                      fieldKey={[name, props.lang]}
                      label={t("pagesSections.spartakKids.kids.privilegeDescription")}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} height="100px" />
                    </Form.Item>

                    <MinusContainer>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </MinusContainer>
                  </>
                ))}
                <>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.spartakKids.kids.addPrivilege")}
                    </Button>
                  </Form.Item>
                </>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/* Красный блок */}
      <CMS.RedBanner lang={props.lang} />

      {/* Выведи футболиста на поле */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.spartakKids.kids.takePlayerToField")}
          key="takePlayerToField"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["takePlayerToField", "title", props.lang]}
            label={t("pagesSections.stadiumStaff.eventTeam.title")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["takePlayerToField", "description", props.lang]}
            label={t("pagesSections.chairPlotting.description")}
          >
            <Wysiwyg uploadRequest={imageRepository.upload} height="200px" />
          </Form.Item>
          <Form.Item
            name={["takePlayerToField", "buttonTitle", props.lang]}
            label={t("pagesSections.spartakKids.kids.buttonName")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["takePlayerToField", "photo", props.lang]}
            label={t("pagesSections.spartakKids.kids.image")}
          >
            <ImageField
              uploadRequest={imageRepository.upload}
              validation={{
                width: 646,
                height: 492,
                size: 2048,
                format: ["png", "jpeg"],
                exact: true,
              }}
            />
          </Form.Item>
          <UploadDesc>
            {t("allPages.form.uploadDesc", {
              width: "646",
              height: "492",
              size: "2",
              format: "jpeg, png",
            })}
          </UploadDesc>
        </Collapse.Panel>
      </Collapse>

      {/* Вопросы и ответы */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.spartakKids.kids.answersQuestions")}
          key="answersQuestions "
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["answersQuestions", "title", props.lang]}
            label={t("pagesSections.clubHistory.historyOfCreation.title")}
          >
            <Input />
          </Form.Item>
          <Form.List name={["answersQuestions", "list"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Form.Item
                      {...restField}
                      name={[name, "question", props.lang]}
                      fieldKey={[name, "question", props.lang]}
                      label={t("pagesSections.spartakKids.kids.question")}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "answer", props.lang]}
                      fieldKey={[name, "answer", props.lang]}
                      label={t("pagesSections.spartakKids.kids.answer")}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} height={"100px"} />
                    </Form.Item>
                    <MinusContainer>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ zIndex: 100 }} />
                    </MinusContainer>
                  </>
                ))}
                <>
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("pagesSections.spartakKids.kids.addAnswerQuestion")}
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
const UploadDesc = styled.span`
  color: ${theme.colors.middleGray};
`;
