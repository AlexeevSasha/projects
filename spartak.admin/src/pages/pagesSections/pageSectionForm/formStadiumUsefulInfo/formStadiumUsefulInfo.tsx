import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormStadiumUsefulInfo = (props: ICmsProps) => {
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

      {/* Проход на территорию */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumUsefulInfo.entranceToTheStadium")}
          key="stadiumUsefulInfo"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["entranceInfo", "title", props.lang]}
            label={t("pagesSections.stadiumStaff.eventTeam.title")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["entranceInfo", "additionalInfo", props.lang]}
            label={t("pagesSections.stadiumStaff.admissionConditions.collapseTitle")}
          >
            <TextArea size={"middle"} />
          </Form.Item>

          <div>{t("pagesSections.stadiumUsefulInfo.entranceNames")}</div>
          <Form.List name="entranceNames">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"blockInfo" + index}`}>
                    <Form.Item name={[blockInfo.name, props.lang]}>
                      <Input placeholder={t("pagesSections.stadiumContacts.typeOFContact")} />
                    </Form.Item>

                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.servicesAdjacentTerritory.addBlockInfo")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/* Полезная информация */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumUsefulInfo.usefulInfo")}
          key="stadiumUsefulInfo "
          className="site-collapse-custom-panel"
        >
          <Form.List name={["usefulInfoBlocks"]}>
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
                      <Wysiwyg uploadRequest={imageRepository.upload} height={"100px"} />
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
