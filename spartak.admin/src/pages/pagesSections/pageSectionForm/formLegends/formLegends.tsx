import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Select } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { theme } from "../../../../assets/theme/theme";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormLegends = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />

      {/* Основная информация на странице */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesAdjacentTerritory.mainInfo.collapseText")}
          key="2"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["mainInfo", "previewImg", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoImg")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
          <Form.Item
            name={["mainInfo", "title", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.mainInfo.mainInfoTitle")}
          >
            <Input />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/*Красный блок с текстом*/}
      <CMS.RedBlock lang={props.lang} />

      {/* Состав комитета ветеранов */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.legends.committee.veteransCommittee")}
          key="4"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["dataCommitteeTitle", props.lang]}
            fieldKey={["dataCommitteeTitle", props.lang]}
            label={t("pagesSections.legends.committee.blockTitle")}
          >
            <Input />
          </Form.Item>
          <Form.List name={["dataCommittee"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Form.Item
                      {...restField}
                      name={[name, "photo"]}
                      fieldKey={[name, "photo"]}
                      label={t("pagesSections.legends.committee.veteransPhoto")}
                      style={{ display: "flex" }}
                    >
                      <ImageField
                        validation={{
                          width: 336,
                          height: 389,
                          size: 1024,
                          format: ["png", "jpeg"],
                        }}
                        uploadRequest={imageRepository.upload}
                      />
                    </Form.Item>
                    <UploadDesc>
                      {t("allPages.form.uploadDesc", {
                        width: "336",
                        height: "389",
                        size: "1",
                        format: "jpeg, png",
                      })}
                    </UploadDesc>
                    <Form.Item
                      {...restField}
                      name={[name, "fullName", props.lang]}
                      fieldKey={[name, "fullName", props.lang]}
                      label={t("pagesSections.legends.committee.veteransFullName")}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "birthDate"]}
                      fieldKey={[name, "birthDate"]}
                      label={t("pagesSections.legends.committee.birthDate")}
                    >
                      <Input type={"date"} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "position", props.lang]}
                      fieldKey={[name, "position", props.lang]}
                      label={t("pagesSections.legends.committee.position")}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "selectPosition"]}
                      fieldKey={[name, "selectPosition"]}
                      label={t("pagesSections.legends.committee.selectPosition")}
                      initialValue={"member"}
                    >
                      <Select
                        defaultActiveFirstOption
                        options={[
                          { value: "member", label: "Член комитета" },
                          { value: "lead", label: "Руководство комитета" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description", props.lang]}
                      fieldKey={[name, "description", props.lang]}
                      label={t("pagesSections.legends.committee.description")}
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

      {/*История команды ветеранов*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.legends.history.historyBlock")}
          key="5"
          className="site-collapse-custom-panel"
        >
          <Form.Item name={["history"]}>
            <Form.Item
              label={t("pagesSections.legends.history.title")}
              name={["history", "title", props.lang]}
              style={{ paddingBottom: "24px" }}
            >
              <Input placeholder={t("pagesSections.legends.history.enterTitle")} />
            </Form.Item>
            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <Form.Item
                name={["history", "firstImg", props.lang]}
                label={t("pagesSections.legends.history.firstPhoto")}
              >
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item
                label={t("pagesSections.legends.history.descriptionFirst")}
                name={["history", "descriptionFirst", props.lang]}
                style={{ paddingBottom: "24px" }}
              >
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
            </div>
            <Form.Item
              // label={t("pagesSections.legends.history.descriptionFirst")}
              name={["history", "descriptionFirstLong", props.lang]}
              style={{ paddingBottom: "24px" }}
            >
              <Wysiwyg uploadRequest={imageRepository.upload} />
            </Form.Item>
            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <Form.Item
                label={t("pagesSections.legends.history.descriptionSecond")}
                name={["history", "descriptionSecond", props.lang]}
              >
                <Wysiwyg uploadRequest={imageRepository.upload} />
              </Form.Item>
              <Form.Item
                name={["history", "secondImg", props.lang]}
                label={t("pagesSections.legends.history.secondPhoto")}
              >
                <ImageField uploadRequest={imageRepository.upload} />
              </Form.Item>
            </div>
            <Form.Item
              style={{ marginTop: 32 }}
              // label={t("pagesSections.legends.history.descriptionSecond")}
              name={["history", "descriptionSecondLong", props.lang]}
            >
              <Wysiwyg uploadRequest={imageRepository.upload} />
            </Form.Item>
            <Form.Item
              style={{ marginTop: 32 }}
              label={t("pagesSections.legends.history.buttonName")}
              name={["history", "buttonName", props.lang]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ marginTop: 32 }}
              label={t("pagesSections.legends.history.buttonLink")}
              name={["history", "buttonLink", props.lang]}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/*Дополнительно*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.legends.additional.blockName")}
          key="6"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["additional"]}>
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <Container>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"additional" + index}`}>
                    <Form.Item
                      {...blockInfo}
                      label={t("pagesSections.legends.additional.additionalInfo")}
                      name={[blockInfo.name, props.lang]}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} height="100px" />
                    </Form.Item>
                    <MinusContainer style={{ padding: 0 }}>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.legends.additional.addPoint")}
                  </Button>
                </Form.Item>
              </Container>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2px 0 10px;
`;

const UploadDesc = styled.span`
  display: flex;
  align-items: center;
  color: ${theme.colors.middleGray};
  width: 210px;
`;
