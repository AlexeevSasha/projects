import { DeleteOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input, Space } from "antd";
import { CMS } from "common/components/cms";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { imageRepository } from "../../../../api/imageRepository";
import { ImageField } from "../../../../ui/ImageField";
import { Wysiwyg } from "../../../../ui/Wisiwyg/Wysiwyg";
import { ICmsProps } from "../../../../common/interfaces/ICmsProps";

export const FormServicesVip = (props: ICmsProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* мета - теги */}
      <CMS.MetaTags lang={props.lang} />
      {/* Основная информация на странице */}
      <CMS.MainInfo lang={props.lang} />
      {/* Текст в две колонке на красном фоне */}
      <CMS.RedBlock lang={props.lang} />

      {/* Блок с информацией о территории */}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesVipLodges.boxes.blockInfoLabel")}
          key="4"
          className="site-collapse-custom-panel"
        >
          <Form.List name="blockInfo">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"blockInfo" + index}`}>
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
                      <Wysiwyg uploadRequest={imageRepository.upload} />
                    </Form.Item>

                    <Form.Item
                      label={t("pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.blockParamsTitle")}
                    >
                      <Form.List name={[blockInfo.name, "blockParams"]}>
                        {(fieldsBlockParams, { add: blockParamsAdd, remove: blockParamsRemove }) => (
                          <>
                            {fieldsBlockParams.map((blockParams) => (
                              <StyledSpace key={`${"blockParams" + index}`} align="baseline">
                                <Form.Item {...blockParams} name={[blockParams.name, "label", props.lang]}>
                                  <Input
                                    placeholder={t(
                                      "pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.label"
                                    )}
                                  />
                                </Form.Item>
                                <Form.Item {...blockParams} name={[blockParams.name, "value", props.lang]}>
                                  <Input
                                    placeholder={t(
                                      "pagesSections.servicesAdjacentTerritory.blockInfo.blockParams.value"
                                    )}
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

      {/*Схема VIP-Ложи и боксы*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesVipLodges.boxes.schemeAndBoxes")}
          key="5a"
          className="site-collapse-custom-panel"
        >
          <Form.Item
            name={["planImage", props.lang]}
            label={t("pagesSections.servicesAdjacentTerritory.blockInfo.img")}
          >
            <ImageField uploadRequest={imageRepository.upload} />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>

      {/*Пакеты госстеприимства*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesVipLodges.packages.packagesOfHospitality")}
          key="6a"
          className="site-collapse-custom-panel"
        >
          <Form.List name={["exclusiveConditions"]}>
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"packagesOfHospitality" + index}`}>
                    <Form.Item {...blockInfo} name={[blockInfo.name, props.lang]}>
                      <Input placeholder={t("pagesSections.servicesVipLodges.services.service")} />
                    </Form.Item>

                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.servicesVipLodges.services.addServices")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/*Дополнительные услуги*/}
      <Collapse>
        <Collapse.Panel
          header={t("pagesSections.servicesVipLodges.services.additionalServices")}
          key="7"
          className="site-collapse-custom-panel"
        >
          <Form.List name="additionalServices">
            {(fieldsBlockInfo, { add: blockInfoAdd, remove: blockInfoRemove }) => (
              <>
                {fieldsBlockInfo.map((blockInfo, index) => (
                  <div key={`${"additionalServices" + index}`}>
                    <Form.Item
                      name={[blockInfo.name, "img", props.lang]}
                      label={t("pagesSections.servicesAdjacentTerritory.blockInfo.img")}
                    >
                      <ImageField uploadRequest={imageRepository.upload} />
                    </Form.Item>

                    <Form.Item {...blockInfo} name={[blockInfo.name, "title", props.lang]}>
                      <Input placeholder={t("pagesSections.servicesVipLodges.services.service")} />
                    </Form.Item>

                    <MinusContainer>
                      <DeleteOutlined onClick={() => blockInfoRemove(blockInfo.name)} />
                    </MinusContainer>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => blockInfoAdd()} block icon={<PlusOutlined />}>
                    {t("pagesSections.servicesVipLodges.services.addServices")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Collapse.Panel>
      </Collapse>

      {/*Блок в котором в ряд 3 фотографии, одна большая и две маленьких*/}
      <CMS.TriplePhoto lang={props.lang} />
    </>
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
  padding-bottom: 24px;
`;
