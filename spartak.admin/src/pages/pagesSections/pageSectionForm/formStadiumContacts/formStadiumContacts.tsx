import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormStadiumContacts = (props: ICmsProps) => {
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

      {/*Создание контакта*/}
      <Collapse>
        <Collapse.Panel header={t("pagesSections.clubContacts.title")} key="4" className="site-collapse-custom-panel">
          <Form.List name="stadiumContacts">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"blockInfo" + index}`}>
                    <Form.Item name={[blockInfo.name, "title", props.lang]}>
                      <Input placeholder={t("pagesSections.stadiumContacts.typeOFContact")} />
                    </Form.Item>
                    <Form.Item
                      name={[blockInfo.name, "titleDescription", props.lang]}
                      label={t("pagesSections.clubContacts.mainInfo.description")}
                      style={{ marginBottom: "40px" }}
                    >
                      <TextArea />
                    </Form.Item>

                    <Form.Item name={[blockInfo.name, "info", props.lang]}>
                      <Input placeholder={t("pagesSections.stadiumContacts.typeOfConnection")} />
                    </Form.Item>
                    <Form.Item
                      name={[blockInfo.name, "infoDescription", props.lang]}
                      label={t("pagesSections.clubContacts.mainInfo.description")}
                      style={{ marginBottom: "40px" }}
                    >
                      <TextArea />
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
    </>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 24px;
`;
