import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Space } from "antd";
import { imageRepository } from "api/imageRepository";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { Wysiwyg } from "../../../ui/Wisiwyg/Wysiwyg";
import React from "react";
import { FormButton } from "./formButton";
import { ICmsProps } from "../../interfaces/ICmsProps";

// используется на странице /tickets/info/premium
export const FormPremiumLevelsImgText = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.premiumLevelsImgText.title")}
        key="CorporateClientsInfoBlock"
        className="site-collapse-custom-panel"
      >
        <Form.List name="premiumLevel">
          {(fieldsPremiumLevel, { add: blockInfoAdd, remove: blockInfoRemove }) => (
            <>
              {fieldsPremiumLevel.map((premiumLevel, index) => (
                <div style={{ marginBottom: 15 }} key={`${"premiumLevel" + index}`}>
                  <Form.List initialValue={[""]} name={[premiumLevel.name, "images"]}>
                    {(images, { add: imageAdd, remove: imageRemove }) => (
                      <div>
                        <Space wrap size={"large"}>
                          {images.map((img, i) => (
                            <Space key={`${"img" + i}`}>
                              <Form.Item {...img} name={[img.name, props.lang]}>
                                <ImageField uploadRequest={imageRepository.upload} />
                              </Form.Item>
                              <MinusContainer>
                                <DeleteOutlined onClick={() => imageRemove(img.name)} />
                              </MinusContainer>
                            </Space>
                          ))}
                        </Space>
                        <Form.Item>
                          <Button type="dashed" onClick={() => imageAdd()} block icon={<PlusOutlined />}>
                            {t("pagesSections.premiumLevelsImgText.addImg")}
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                  <Form.Item {...premiumLevel} name={[premiumLevel.name, "description", props.lang]}>
                    <Wysiwyg uploadRequest={imageRepository.upload} />
                  </Form.Item>
                  <FormButton lang={props.lang} name={premiumLevel.name} />
                  <MinusContainer>
                    <DeleteOutlined onClick={() => blockInfoRemove(premiumLevel.name)} />
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
  );
};

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonBlock = styled.div`
  border: 1px solid #d9d9d9;
  padding: 10px;
  margin: 10px 0;
`;
