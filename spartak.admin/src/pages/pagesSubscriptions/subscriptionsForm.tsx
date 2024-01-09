import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Form, Input, Space, Tabs, Typography } from "antd";
import { imageRepository } from "api/imageRepository";
import { CMS } from "common/components/cms";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { DragableMultiImageField } from "ui/DragableImageField";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { UploadDesc } from "ui/UploadDesc";
import { theme } from "../../assets/theme/theme";
import { deepMerge } from "../../common/helpers/deepMerge";
import { required } from "../../common/helpers/validators/required";
import { useAppDispatch } from "../../store";
import { noticeActions } from "../../store/notice/notice";
import { getSubscriptionById, updateSubscription } from "../../store/subscriptions/subscriptionsActionAsync";
import { subscriptionByIdSelector } from "../../store/subscriptions/subscriptionsSelectors";
import { subscriptionActions } from "../../store/subscriptions/subscriptionsSlice";
import { ImageField } from "../../ui/ImageField";
import { Wysiwyg } from "../../ui/Wisiwyg/Wysiwyg";
import { TableBlockFromSubscriptionsForm } from "./components/tableBlockFromSubscriptionsForm";

export const SubscriptionsForm = memo(() => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const id = useParams<{ id: string }>().id;
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const subscriptionById = useSelector(subscriptionByIdSelector);
  const [values, setValues] = useState<any>();

  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionById(id));
    }

    return () => {
      dispatch(subscriptionActions.resetSubscription());
    };
  }, [id]);

  const closeDrawer = () => {
    form.resetFields();
    setValues({});
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  useEffect(() => {
    if (!visible || !subscriptionById) {
      form.resetFields();
    } else {
      const initV = {
        ...JSON.parse(subscriptionById?.JsonData || "{}"),
        FullName: subscriptionById.FullName,
        PreviousImageUrl: subscriptionById.PreviousImageUrl,
        // ImageUrl: subscriptionById.ImageUrl,
      };

      form.setFieldsValue(initV);
      setValues(initV);
    }
  }, [subscriptionById, visible]);

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(
        noticeActions.add({
          message: t("allPages.saveNotSuccess"),
          type: "error",
        })
      );

      return;
    }

    if (subscriptionById) {
      // Содержит только те поля что изменяли
      const newValue = deepMerge<any>({ ...values }, form.getFieldsValue());
      // Объединяет те поля что изменяли с теми, которые не изменяли
      const description = deepMerge<any>({ ...JSON.parse(subscriptionById?.JsonData) }, newValue);

      dispatch(
        updateSubscription(
          // deepMerge<SubscriptionEntity>(
          //   subscriptionById,
          {
            ...subscriptionById,
            FullName: description.FullName,
            PreviousImageUrl: description.PreviousImageUrl,
            ImageUrl: description.ImageUrl,
            JsonData: JSON.stringify(description),
            // Description: { Ru: JSON.stringify(description), En: "" },
          }
          // form.getFieldsValue()
          // )
        )
      )
        .unwrap()
        .then(() => {
          dispatch(noticeActions.add({ message: t("allPages.saveSuccess") }));
          closeDrawer();
        });
    }
  };

  return (
    <Drawer
      title={<HeaderText>{t("subscriptions.subscriptionChange")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width={"56%"}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("allPages.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab="Русский язык" key="Ru" />
        <Tabs.TabPane tab="Английский язык" key="En" />
      </Tabs>

      {!subscriptionById ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" validateTrigger="onBlur">
          <Container>
            {/*мета - теги*/}
            <CMS.MetaTags lang={lang} />
            {/* Основная информация на странице */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.aboutStadium.mainInfo.collapseText")}
                key="1"
                className="site-collapse-custom-panel"
              >
                <Form.Item name={["FullName", lang]} label={t("subscriptions.subscriptionName")}>
                  <Input disabled={lang === "Ru"} />
                </Form.Item>

                <UploadWrapper>
                  <div>
                    <Form.Item
                      name="PreviousImageUrl"
                      label={t("subscriptions.subscriptionsImage")}
                      rules={[{ validator: required }]}
                    >
                      <ImageField
                        withCrop
                        validation={{
                          width: 780,
                          height: 427,
                          size: 2048,
                          format: ["png", "jpeg"],
                        }}
                      />
                    </Form.Item>

                    <UploadDesc>
                      {t("allPages.form.uploadDesc", {
                        width: "780",
                        height: "427",
                        size: "2",
                        format: "png, jpeg",
                      })}
                    </UploadDesc>
                  </div>

                  <div>
                    <Form.Item
                      name="ImageUrl"
                      label={t("subscriptions.forPageImage")}
                      rules={[{ validator: required }]}
                    >
                      <ImageField
                        validation={{
                          width: 1920,
                          height: 600,
                          size: 2048,
                          format: ["png", "jpeg"],
                          exact: true,
                        }}
                      />
                    </Form.Item>

                    <UploadDesc>
                      {t("allPages.form.uploadDesc", {
                        width: "1920",
                        height: "600",
                        size: "2",
                        format: "png, jpeg",
                      })}
                    </UploadDesc>
                  </div>
                </UploadWrapper>
              </Collapse.Panel>
            </Collapse>
            {/* Красный баннер */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.servicesAdjacentTerritory.redBlock.collapseText")}
                key="2"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  name={["redBanner", "text1", lang]}
                  label={t("pagesSections.servicesAdjacentTerritory.redBlock.firstColumn")}
                  style={{ marginBottom: "48px" }}
                >
                  <Wysiwyg uploadRequest={imageRepository.upload} />
                </Form.Item>

                <Form.Item
                  name={["redBanner", "text2", lang]}
                  label={t("pagesSections.servicesAdjacentTerritory.redBlock.secondColumn")}
                >
                  <Wysiwyg uploadRequest={imageRepository.upload} />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            {/* Список домашних матчей */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.homeMatchList.collapseText")}
                key="3"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  name={["homeMatchList", "title", lang]}
                  label={t("pagesSections.subscription.homeMatchList.title")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["homeMatchList", "buttonText", lang]}
                  label={t("pagesSections.subscription.homeMatchList.buttonText")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["homeMatchList", "buttonLink", lang]}
                  label={t("pagesSections.subscription.homeMatchList.buttonLink")}
                >
                  <Input />
                </Form.Item>

                <div>
                  <Form.Item
                    name={["homeMatchList", "opponentsLogos"]}
                    label={t("pagesSections.subscription.homeMatchList.opponentsLogos")}
                  >
                    <DragableMultiImageField
                      validation={{
                        width: 100,
                        height: 100,
                        size: 1024,
                        format: ["jpeg", "png"],
                        validate: (width, height) => width === 100 && height === 100,
                      }}
                      uploadRequest={imageRepository.upload}
                      withCrop
                    />
                  </Form.Item>

                  <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 480, flex: "1 1 150px" }}>
                    {t("pagesSections.subscription.homeMatchList.opponentsPrompt")}
                  </Typography.Text>
                </div>
              </Collapse.Panel>
            </Collapse>
            {/* Блок со списком в 2 колонки */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.twoColumnList.collapseText")}
                key="4"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  name={["twoColumnList", "title", lang]}
                  label={t("pagesSections.subscription.twoColumnList.title")}
                >
                  <Input />
                </Form.Item>

                <Form.List name={["twoColumnList", "list"]}>
                  {(fields, { add, remove }) => (
                    <GridContainer>
                      {fields.map(({ key, name, ...restField }) => (
                        <SpaceForTextArea key={key} align="baseline">
                          <Form.Item {...restField} name={[name, "text", lang]}>
                            <Input placeholder={t("pagesSections.subscription.twoColumnList.rowPlaceholder")} />
                          </Form.Item>
                          <MinusContainer>
                            <DeleteOutlined onClick={() => remove(name)} />
                          </MinusContainer>
                        </SpaceForTextArea>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          {t("pagesSections.subscription.twoColumnList.addButton")}
                        </Button>
                      </Form.Item>
                    </GridContainer>
                  )}
                </Form.List>
              </Collapse.Panel>
            </Collapse>
            {/* Блок со специальными предложениями */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.specialOffers.collapseText")}
                key="5"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  name={["specialOffers", "title", lang]}
                  label={t("pagesSections.subscription.specialOffers.title")}
                >
                  <Input />
                </Form.Item>

                <Form.List name={["specialOffers", "list"]}>
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name, ...restField }) => (
                        <ListRowContainer key={key}>
                          <DoubleImageContainer>
                            <Form.Item
                              name={[name, "whiteImage"]}
                              label={t("pagesSections.subscription.specialOffers.elemOfOffer.whiteImage")}
                              rules={[{ validator: required }]}
                            >
                              <ImageField
                                withCrop
                                validation={{
                                  width: 378,
                                  height: 142,
                                  size: 2048,
                                  format: ["png", "jpeg"],
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              name={[name, "darkImage"]}
                              label={t("pagesSections.subscription.specialOffers.elemOfOffer.darkImage")}
                              rules={[{ validator: required }]}
                            >
                              <ImageField
                                withCrop
                                validation={{
                                  width: 378,
                                  height: 142,
                                  size: 2048,
                                  format: ["png", "jpeg"],
                                }}
                              />
                            </Form.Item>

                            <UploadDesc>
                              {t("allPages.form.uploadDesc", {
                                width: "378",
                                height: "142",
                                size: "2",
                                format: "png, jpeg",
                              })}
                            </UploadDesc>
                          </DoubleImageContainer>

                          <Form.Item {...restField} name={[name, "description", lang]}>
                            <Input
                              placeholder={t("pagesSections.subscription.specialOffers.elemOfOffer.description")}
                            />
                          </Form.Item>
                          <MinusContainer>
                            <DeleteOutlined onClick={() => remove(name)} />
                          </MinusContainer>
                        </ListRowContainer>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          {t("pagesSections.subscription.specialOffers.elemOfOffer.addButton")}
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>

                <Form.Item
                  name={["specialOffers", "warningText", lang]}
                  label={t("pagesSections.subscription.specialOffers.warningText")}
                >
                  <Input />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            {/* Блок с информацией о продаже баннеров (текст слева, картинка справа) */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.blockInfo.collapseText")}
                key="6"
                className="site-collapse-custom-panel"
              >
                <ContainerBlockInfo>
                  <Form.Item name={["blockInfo", "img", lang]} label={t("pagesSections.subscription.blockInfo.img")}>
                    <ImageField
                      withCrop
                      validation={{
                        width: 670,
                        height: 450,
                        size: 2048,
                        format: ["png", "jpeg"],
                      }}
                      uploadRequest={imageRepository.upload}
                    />
                  </Form.Item>

                  <Form.Item
                    name={["blockInfo", "title", lang]}
                    label={t("pagesSections.subscription.blockInfo.title")}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name={["blockInfo", "description", lang]}
                    label={t("pagesSections.subscription.blockInfo.description")}
                  >
                    <Wysiwyg uploadRequest={imageRepository.upload} />
                  </Form.Item>
                </ContainerBlockInfo>
              </Collapse.Panel>
            </Collapse>
            {/* Блок баннера */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.banner.collapseText")}
                key="7"
                className="site-collapse-custom-panel"
              >
                <div className="ant-col ant-form-item-label">
                  <label>{t("pagesSections.subscription.banner.imgTitle")}</label>
                </div>

                <DoubleImageContainer>
                  <Form.Item
                    name={["banner", "backgroundImgL"]}
                    label={t("pagesSections.subscription.banner.desktop")}
                    rules={[{ validator: required }]}
                  >
                    <ImageField
                      withCrop
                      validation={{
                        width: 1584,
                        height: 304,
                        size: 2048,
                        format: ["png", "jpeg"],
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["banner", "backgroundImgM"]}
                    label={t("pagesSections.subscription.banner.tablet")}
                    rules={[{ validator: required }]}
                  >
                    <ImageField
                      withCrop
                      validation={{
                        width: 720,
                        height: 344,
                        size: 2048,
                        format: ["png", "jpeg"],
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["banner", "backgroundImgS"]}
                    label={t("pagesSections.subscription.banner.mobile")}
                    rules={[{ validator: required }]}
                  >
                    <ImageField
                      withCrop
                      validation={{
                        width: 343,
                        height: 464,
                        size: 2048,
                        format: ["png", "jpeg"],
                      }}
                    />
                  </Form.Item>

                  <Typography.Text type="secondary" style={{ fontSize: 14, maxWidth: 480, flex: "1 1 150px" }}>
                    {t("pagesSections.subscription.banner.prompt")}
                  </Typography.Text>
                </DoubleImageContainer>

                <Form.Item name={["banner", "title", lang]} label={t("pagesSections.subscription.banner.title")}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["banner", "description", lang]}
                  label={t("pagesSections.subscription.banner.description")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["banner", "buttonText", lang]}
                  label={t("pagesSections.subscription.banner.buttonText")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["banner", "buttonLink", lang]}
                  label={t("pagesSections.subscription.banner.buttonLink")}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={["banner", "rightImg"]}
                  label={t("pagesSections.subscription.banner.rightImg")}
                  rules={[{ validator: required }]}
                  style={{ marginTop: "16px" }}
                >
                  <ImageField
                    withCrop
                    validation={{
                      width: 630,
                      height: 304,
                      size: 2048,
                      format: ["png", "jpeg"],
                    }}
                  />
                </Form.Item>
                <Typography.Text type="secondary" style={{ fontSize: 13, maxWidth: 480, flex: "1 1 150px" }}>
                  {t("pagesSections.subscription.banner.rightImgPrompt")}
                </Typography.Text>
              </Collapse.Panel>
            </Collapse>
            {/* Блок с таблицей */}
            <TableBlockFromSubscriptionsForm lang={lang} />
            {/* Блок с описанием условий в 2 колонки */}
            <Collapse>
              <Collapse.Panel
                header={t("pagesSections.subscription.descriptionBlock.collapseText")}
                key="2"
                className="site-collapse-custom-panel"
              >
                <Form.Item
                  name={["descriptionBlock", "title", lang]}
                  label={t("pagesSections.subscription.descriptionBlock.title")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["descriptionBlock", "text1", lang]}
                  label={t("pagesSections.subscription.descriptionBlock.firstColumn")}
                  style={{ marginBottom: "48px" }}
                >
                  <Wysiwyg uploadRequest={imageRepository.upload} />
                </Form.Item>

                <Form.Item
                  name={["descriptionBlock", "text2", lang]}
                  label={t("pagesSections.subscription.descriptionBlock.secondColumn")}
                >
                  <Wysiwyg uploadRequest={imageRepository.upload} />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
          </Container>
        </Form>
      )}
    </Drawer>
  );
});

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 24px;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SpaceForTextArea = styled(Space)`
  display: flex;
  width: 100%;

  .ant-space-item:nth-child(1) {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 12px;
  grid-template-rows: auto;
`;

const MinusContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ListRowContainer = styled.div`
  display: grid;
  margin-bottom: 16px;

  ${MinusContainer} {
    span {
      width: 100%;
      padding: 8px 0;
    }
    :hover {
      color: ${theme.colors.red};
    }
  }
`;

const DoubleImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ContainerBlockInfo = styled.div`
  display: grid;
  margin-bottom: 12px;

  ${MinusContainer} {
    span {
      width: 100%;
      padding: 8px 0;
      margin-top: 24px;
    }
    :hover {
      color: ${theme.colors.red};
    }
  }
`;
