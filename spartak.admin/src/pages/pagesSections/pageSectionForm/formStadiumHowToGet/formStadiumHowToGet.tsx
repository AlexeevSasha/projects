import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormStadiumHowToGet = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <div>
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

      {/*Основная информация*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.stadiumHowToGet.collapseTitle")}
          key="stadiumHowToGet"
          className="site-collapse-custom-panel"
        >
          <Form.List name="howToGet">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"blockInfo" + index}`}>
                    <Form.Item name={[blockInfo.name, "title", props.lang]}>
                      <Input placeholder={t("pagesSections.stadiumHowToGet.kindOfTransport")} />
                    </Form.Item>
                    <Form.Item
                      name={[blockInfo.name, "description", props.lang]}
                      label={t("pagesSections.stadiumHowToGet.description")}
                    >
                      <Wysiwyg uploadRequest={imageRepository.upload} />
                    </Form.Item>

                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.stadiumHowToGet.add")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 5px 0 20px;
`;
