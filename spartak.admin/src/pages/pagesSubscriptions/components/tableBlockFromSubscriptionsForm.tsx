import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Form, Input } from "antd";
import { imageRepository } from "api/imageRepository";
import { theme } from "assets/theme/theme";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";

interface IProps {
  lang: string;
}

export const TableBlockFromSubscriptionsForm = (props: IProps) => {
  const { t } = useTranslation();

  return (
    <Collapse>
      <Collapse.Panel
        header={t("pagesSections.subscription.table.collapseText")}
        key="8"
        className="site-collapse-custom-panel"
      >
        <Form.Item name={["table", "title", props.lang]} label={t("pagesSections.subscription.table.title")}>
          <Input />
        </Form.Item>

        <Form.List name={["table", "sections"]}>
          {(tableFields, { add: sectionAdd, remove: sectionRemove }) => (
            <GridContainer>
              {tableFields.map(({ key: sectionKey, name: sectionName, ...sectionRestField }) => (
                <Collapse>
                  <Collapse.Panel
                    header={
                      <span>
                        {t("pagesSections.subscription.table.section.collapseText")}{" "}
                        <DeleteOutlined
                          color={theme.colors.middleGray}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            sectionRemove(sectionName);
                          }}
                        />
                      </span>
                    }
                    key={"8" + sectionKey}
                    className="site-collapse-custom-panel"
                  >
                    <div className="ant-col ant-form-item-label">
                      <label>{t("pagesSections.subscription.table.section.headTable")}</label>
                    </div>
                    <DoubleColumnContainer key={sectionKey}>
                      <Form.Item
                        {...sectionRestField}
                        name={[sectionName, "headCol1", props.lang]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")} />
                      </Form.Item>
                      <Form.Item
                        {...sectionRestField}
                        name={[sectionName, "headCol2", props.lang]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")} />
                      </Form.Item>
                      <Form.Item
                        {...sectionRestField}
                        name={[sectionName, "headCol3", props.lang]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")} />
                      </Form.Item>

                      {/* <MinusContainer>
                        <DeleteOutlined onClick={() => sectionRemove(sectionName)} />
                      </MinusContainer> */}
                    </DoubleColumnContainer>

                    <div className="ant-col ant-form-item-label" style={{ marginTop: "12px" }}>
                      <label>{t("pagesSections.subscription.table.section.rowTitle")}</label>
                    </div>
                    <Form.List name={[sectionName, "row"]}>
                      {(rowFields, { add: rowAdd, remove: rowRemove }) => (
                        <>
                          {rowFields.map(({ key: rowKey, name: rowName, ...rowRestField }) => (
                            <DoubleColumnContainer key={sectionKey}>
                              <WysiwygContainer>
                                <Form.Item {...rowRestField} name={[rowName, "col1", props.lang]}>
                                  <Wysiwyg
                                    height={"100px"}
                                    uploadRequest={imageRepository.upload}
                                    placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")}
                                  />
                                </Form.Item>
                              </WysiwygContainer>
                              <WysiwygContainer>
                                <Form.Item {...rowRestField} name={[rowName, "col2", props.lang]}>
                                  <Wysiwyg
                                    height={"100px"}
                                    uploadRequest={imageRepository.upload}
                                    placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")}
                                  />
                                </Form.Item>
                              </WysiwygContainer>
                              <WysiwygContainer>
                                <Form.Item {...rowRestField} name={[rowName, "col3", props.lang]}>
                                  <Wysiwyg
                                    height={"100px"}
                                    uploadRequest={imageRepository.upload}
                                    placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")}
                                  />
                                </Form.Item>
                              </WysiwygContainer>
                              <MinusContainer>
                                <DeleteOutlined onClick={() => rowRemove(rowName)} />
                              </MinusContainer>
                            </DoubleColumnContainer>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => rowAdd()} block icon={<PlusOutlined />}>
                              {t("pagesSections.subscription.table.section.addButton")}
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Collapse.Panel>
                </Collapse>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => sectionAdd()} block icon={<PlusOutlined />}>
                  {t("pagesSections.subscription.table.addButton")}
                </Button>
              </Form.Item>
            </GridContainer>
          )}
        </Form.List>
      </Collapse.Panel>
    </Collapse>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-row-gap: 12px;
`;

const DoubleColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  align-items: center;
  grid-column-gap: 12px;
`;

const MinusContainer = styled.div`
  display: flex;
`;

const WysiwygContainer = styled.div`
  margin-bottom: 104px;
`;
