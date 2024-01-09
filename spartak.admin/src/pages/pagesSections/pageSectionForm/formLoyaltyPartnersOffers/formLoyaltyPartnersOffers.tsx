import React from "react";
import { Button, Collapse, Form, Space } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { requiredMinMax } from "../../../../common/helpers/validators/requiredMinMax";
import { required } from "../../../../common/helpers/validators/required";
import { ImageField } from "../../../../ui/ImageField";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { imageRepository } from "../../../../api/imageRepository";
import { UploadDesc } from "ui/UploadDesc";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormLoyaltyPartnersOffers = ({ lang }: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.List name={"partnersOffers"}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Collapse>
                <Collapse.Panel
                  header={t("partners.table.columns.partner") + " " + (key + 1)}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <StyledSpace key={key} align="baseline">
                    <Form.Item
                      name={[key, "description", lang]}
                      label={t("loyalty.desc") + " *"}
                      rules={[
                        {
                          validator: (_, value) => requiredMinMax(_, value, 1, 150),
                        },
                      ]}
                    >
                      <TextArea size={"large"} rows={4} placeholder={t("loyalty.enterDesc")} />
                    </Form.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Form.Item
                        name={[key, "image", lang]}
                        label={t("partners.form.logo") + " *"}
                        rules={[{ validator: required }]}
                      >
                        <ImageField
                          validation={{
                            width: 244,
                            height: 122,
                            size: 2048,
                            format: ["png"],
                            exact: true,
                          }}
                          uploadRequest={imageRepository.upload}
                        />
                      </Form.Item>

                      <UploadDesc>
                        {t("allPages.form.uploadDesc", {
                          width: "244",
                          height: "122",
                          size: "2",
                          format: "png",
                        })}
                      </UploadDesc>
                    </div>

                    <div
                      style={{
                        width: "600px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteOutlined height={"1em"} width={"1em"} onClick={() => remove(name)} />
                    </div>
                  </StyledSpace>
                </Collapse.Panel>
              </Collapse>
            ))}
            <Form.Item style={{ paddingBottom: "10px" }}>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {t("partners.addPartner")}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  width: 100%;

  .ant-space-item {
    //width: 47.5%;
    width: 80%;
    :last-child {
      //width: 5%;
    }
  }
  @media (max-width: 1000px) {
    .ant-space-item {
      width: 100%;
    }
  }
`;
