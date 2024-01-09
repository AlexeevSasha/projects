import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Space } from "antd";
import { imageRepository } from "api/imageRepository";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageField } from "ui/ImageField";
import { ICmsProps } from "../../interfaces/ICmsProps";

export const FormImgTextWithTerritory = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.servicesAdjacentTerritory.blockInfoLabel")}
        key="FormImgTextWithTerritory"
        className="site-collapse-custom-panel"
      >
        <Form.List name="blockInfo">
          {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
            <>
              {fieldsBlockInfo.map((blockInfo) => (
                <ContainerBlockInfo>
                  <Form.Item
                    name={[blockInfo.name, "img", props.lang]}
                    label={t("pagesSections.servicesAdjacentTerritory.blockInfo.img")}
                  >
                    <ImageField uploadRequest={imageRepository.upload} />
                  </Form.Item>

                  <Form.Item {...blockInfo} name={[blockInfo.name, "title", props.lang]}>
                    <Input placeholder={t("pagesSections.servicesAdjacentTerritory.blockInfo.title")} />
                  </Form.Item>
                  <Form.Item {...blockInfo} name={[blockInfo.name, "description", props.lang]}>
                    <Input placeholder={t("pagesSections.servicesAdjacentTerritory.blockInfo.description")} />
                  </Form.Item>

                  <Form.Item
                    label={t("pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.blockParamsTitle")}
                  >
                    <Form.List name={[blockInfo.name, "blockParams"]}>
                      {(fieldsBlockParams, { add: blockParamsAdd, remove: blockParamsRemove }) => (
                        <>
                          {fieldsBlockParams.map((blockParams) => (
                            <StyledSpace key={blockParams.key} align="baseline">
                              <Form.Item {...blockParams} name={[blockParams.name, "label", props.lang]}>
                                <Input
                                  placeholder={t("pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.label")}
                                />
                              </Form.Item>
                              <Form.Item {...blockParams} name={[blockParams.name, "value", props.lang]}>
                                <Input
                                  placeholder={t("pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.value")}
                                />
                              </Form.Item>

                              <MinusCircleOutlined onClick={() => blockParamsRemove(blockParams.name)} />
                            </StyledSpace>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => blockParamsAdd()} block icon={<PlusOutlined />}>
                              {t("pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.addBlockParams")}
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                  <MinusContainer>
                    <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                  </MinusContainer>
                </ContainerBlockInfo>
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

const StyledSpace = styled(Space)`
  display: flex;
  margin-bottom: 8px;
  width: 100%;

  .ant-space-item {
    width: 47.5%;

    :last-child {
      width: 5%;
    }
  }
`;

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContainerBlockInfo = styled.div`
  margin-bottom: 24px;
  border: 1px solid #d9d9d9;
  padding: 24px;
`;
