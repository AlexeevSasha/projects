import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Button, Checkbox, Collapse, Drawer, Form, FormInstance, Input, InputNumber, message, Radio, Select, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { IBanner } from "../../../../../api/dto/content/IBanner";
import { useSelector } from "react-redux";
import { addBannerThunk, updateBannerThunk } from "../../../../../modules/content/banner/bannerActionAsync";
import { StoryInputImg } from "../../../story/components/StoryInputImg";
import { validationColor } from "../../../../../common/helpers/banner/validationColor";
import { ButtonForImage } from "../CustomButton";
import { theme } from "../../../../../assets/theme/theme";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../../common/constants/formsConstantsValidation";
import { StateType, useAppDispatch } from "../../../../../core/redux/store";
import { StyledTooltip } from "../../../../../ui/commonComponents";

const { Panel } = Collapse;

const { Option } = Select;

interface IProps {
  bannerForUpdate: IBanner | null;
  onClose: () => void;
  visible: boolean;
}

interface ISrcData {
  src: string;
  file: File | null | string;
}

const syncKeys = new Set(["xPoint", "yPoint", "length"]);

const syncFieldsForm = (ppp: any, formForSync: FormInstance<any>, setFormValues: React.Dispatch<any>) => {
  const indexSync = ppp?.additionalInfo?.bannerInfo?.findIndex?.((item: any) => !!item);
  if (ppp?.additionalInfo?.bannerInfo?.[indexSync]) {
    const [keySync, valueSync] = Object.entries(ppp.additionalInfo?.bannerInfo?.[indexSync])[0];
    const fields: any[] = formForSync.getFieldsValue().additionalInfo?.bannerInfo;
    syncKeys.has(keySync) &&
      fields.forEach((_, index) =>
        formForSync.setFields([{ name: ["additionalInfo", "bannerInfo", index, String(keySync)], value: valueSync }])
      );
    setFormValues(formForSync.getFieldsValue());
  }
};

export const FormBanner = React.memo(({ bannerForUpdate, onClose, visible }: IProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [sizeError, setSizeError] = useState<{ size: boolean; mini: boolean }>({ size: false, mini: false });
  const [acceptError, setAcceptError] = useState<boolean>(false);
  const [srcData, setSrcData] = useState<ISrcData>({ src: "", file: null });
  const [linkItemValue, setLinkValue] = useState<{ linkType: string; linkValue: string } | {}>({});
  const [formValues, setFormValues] = useState<IBanner | null>(null);
  const [isValidErrors, setValidErrors] = useState<any>([]);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { deepLinks } = useSelector((state: StateType) => state.commons);
  useEffect(() => {
    setFormValues(bannerForUpdate);
    form.resetFields();
  }, [bannerForUpdate]);

  const closeDrawer = () => {
    form.resetFields();
    form.setFieldsValue([["additionalInfo", "bannerInfo"], undefined]);
    setLinkValue({});
    setValidErrors({});
    onClose();
    setIsChanged(false);
  };

  const submitForm = () => {
    if (!bannerForUpdate) {
      form
        .validateFields()
        .then((values) => {
          dispatch(addBannerThunk(values));
        })
        .then(closeDrawer);
    } else if (bannerForUpdate && isChanged) {
      form
        .validateFields()
        .then((values) => {
          dispatch(
            updateBannerThunk({
              ...bannerForUpdate,
              ...values
            })
          );
        })
        .then(closeDrawer);
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [visible, bannerForUpdate]);

  const deepLinksOptions = useMemo(
    () =>
      deepLinks.map((option, i) => (
        <Option key={i + 1} value={option.link}>
          {option.name}
        </Option>
      )),
    [deepLinks]
  );

  useEffect(() => {
    if (formValues?.additionalInfo?.bannerInfo?.length === 2) {
      form.resetFields([["additionalInfo", "bannerInfo", 0, "fullWidth"]]);
    }
  }, [formValues]);

  const resetFields = (index: number) => {
    if (formValues?.additionalInfo?.bannerInfo) {
      // @ts-ignore
      formValues?.additionalInfo?.bannerInfo && form.setFieldValue(["additionalInfo", "bannerInfo", index], undefined);
    }
  };

  useLayoutEffect(() => {
    const tt = document.getElementById("customImg") as HTMLImageElement | null;
    if (tt) {
      tt.onload = () => {
        setImageHeight(tt?.clientHeight);
      };
    }
  }, [srcData]);

  if (acceptError) {
    message.error(t("validations.invalidImageFormat"));
  }
  if (sizeError.size) {
    message.error(t("validations.invalidImageSize", { size: ": 2048px" }));
  }

  return (
    <Drawer
      title={
        ` ${bannerForUpdate ? t("common.buttonsText.edit") : t("common.buttonsText.create")}` +
        " " +
        t("marketing.banner.entity").toLowerCase()
      }
      closable={false}
      destroyOnClose={true}
      onClose={() => !isChanged && closeDrawer()}
      visible={visible}
      width={560}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(ppp) => {
          syncFieldsForm(ppp, form, setFormValues);
          if (!isChanged) {
            setIsChanged(true);
          }
        }}
      >
        <Form.Item
          name={"name"}
          label={t("common.title")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max: formsConstantsValidation.entity.banner.max,
              message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.banner.max })
            },
            {
              validator: async (_, value) => {
                if (!/^[^\s]/.test(value) && value.length > 0) {
                  return Promise.reject(new Error(t("validations.startBySpace")));
                } else {
                  return Promise.resolve();
                }
              }
            }
          ]}
          initialValue={bannerForUpdate?.name}
        >
          <Input maxLength={300} />
        </Form.Item>
        <Form.Item
          required={false}
          name={["additionalInfo", "image"]}
          initialValue={bannerForUpdate?.additionalInfo?.image}
          rules={[
            {
              required: !bannerForUpdate?.additionalInfo?.image,
              message: t("validations.required")
            }
          ]}
        >
          <div>
            <ButtonForImage formValues={formValues} srcData={srcData} imageHeight={imageHeight} />
            <StoryInputImg
              src={srcData.src}
              storyForUpdateImage={bannerForUpdate?.additionalInfo?.image}
              imgText={t("marketing.banner.form.imageWidth") + " 2048px"}
              setSizeError={setSizeError}
              setAcceptError={setAcceptError}
              setSrsData={setSrcData}
              form={form}
              fieldName={["additionalInfo", "image"]}
              bannerImg
            />
          </div>
        </Form.Item>
        <Form.List name={["additionalInfo", "bannerInfo"]} initialValue={bannerForUpdate?.additionalInfo?.bannerInfo}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Collapse defaultActiveKey={[index]}>
                    <Panel
                      header={t("common.button") + " " + `${index + 1}`}
                      key={index}
                      style={{
                        marginBottom: 10,
                        background:
                          isValidErrors?.[index] &&
                          !Object.entries(isValidErrors?.[index])
                            ?.filter((elem) => elem[0] !== "fullWidth" && elem[0] !== "transparentBackGround")
                            .every((elem) => elem[1] !== undefined && elem[1] !== "")
                            ? "#fff1f0"
                            : ""
                      }}
                      extra={
                        <DeleteOutlined
                          style={{ color: theme.colors.red, fontSize: 14 }}
                          onClick={() => {
                            resetFields(index);
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <SpaceWrapper key={field.key} align="center">
                        <FirstItemsWrapper>
                          <Form.Item
                            {...field}
                            name={[field.name, "title"]}
                            label={t("common.text")}
                            style={{ width: "72%" }}
                            required={false}
                            rules={[
                              {
                                required: true,
                                message: t("validations.required")
                              },
                              {
                                max: formsConstantsValidation.entity.default.max,
                                message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.entity.default.max })
                              },
                              {
                                validator: async (_, value) => {
                                  if (!/^[^\s]/.test(value) && value.length > 0) {
                                    return Promise.reject(new Error(t("validations.startBySpace")));
                                  } else {
                                    return Promise.resolve();
                                  }
                                }
                              }
                            ]}
                          >
                            <Input maxLength={50} />
                          </Form.Item>
                          {fields.length === 1 && (
                            <Form.Item {...field} name={[field.name, "fullWidth"]} valuePropName="checked">
                              <Checkbox>{t("marketing.banner.halfScreen")}</Checkbox>
                            </Form.Item>
                          )}
                        </FirstItemsWrapper>
                        <FirstItemsWrapper>
                          <Form.Item
                            {...field}
                            name={[field.name, "xPoint"]}
                            label={t("marketing.banner.indent") + " X"}
                            style={{ width: "30%" }}
                            required={false}
                            rules={[{ required: true, message: t("validations.required") }]}
                            initialValue={
                              formValues?.additionalInfo?.bannerInfo?.[0]?.xPoint
                                ? formValues?.additionalInfo?.bannerInfo[0]?.xPoint
                                : undefined
                            }
                          >
                            <CustomInputNumber
                              min={0}
                              max={
                                fields.length === 2
                                  ? 32
                                  : formValues?.additionalInfo?.bannerInfo && formValues?.additionalInfo?.bannerInfo[0]?.fullWidth
                                  ? 25
                                  : 54
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "yPoint"]}
                            label={t("marketing.banner.indent") + " Y"}
                            style={{ width: "30%" }}
                            required={false}
                            rules={[{ required: true, message: t("validations.required") }]}
                            initialValue={
                              formValues?.additionalInfo?.bannerInfo?.[0]?.yPoint ? formValues?.additionalInfo?.bannerInfo[0]?.yPoint : null
                            }
                          >
                            <CustomInputNumber min={0} max={100} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "length"]}
                            label={t("marketing.banner.height") + " " + t("marketing.banner.button")}
                            style={{ width: "30%" }}
                            required={false}
                            rules={[{ required: true, message: t("validations.required") }]}
                            initialValue={
                              formValues?.additionalInfo.bannerInfo?.[0]?.length ? formValues?.additionalInfo?.bannerInfo[0]?.length : null
                            }
                          >
                            <CustomInputNumber min={0} max={100} />
                          </Form.Item>
                        </FirstItemsWrapper>
                        <FirstItemsWrapper>
                          <Form.Item
                            {...field}
                            name={[field.name, "backGroundColor"]}
                            label={t("marketing.banner.backgroundColor")}
                            required={false}
                            style={{ width: "30%" }}
                            rules={[{ validator: validationColor }]}
                          >
                            <InputColor>
                              <Input
                                value={
                                  formValues?.additionalInfo?.bannerInfo
                                    ? formValues?.additionalInfo?.bannerInfo?.[index]?.backGroundColor
                                    : undefined
                                }
                                suffix={
                                  <Input
                                    type="color"
                                    value={
                                      formValues?.additionalInfo?.bannerInfo
                                        ? formValues?.additionalInfo?.bannerInfo?.[index]?.backGroundColor
                                        : undefined
                                    }
                                  />
                                }
                              />
                            </InputColor>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "transparentBackGround"]}
                            valuePropName="checked"
                            style={{ paddingBottom: 5 }}
                          >
                            <Checkbox>{t("marketing.banner.transparent")}</Checkbox>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "color"]}
                            label={t("marketing.banner.textColor")}
                            style={{ width: "30%" }}
                            required={false}
                            rules={[{ validator: validationColor }]}
                          >
                            <InputColor>
                              <Input
                                value={
                                  formValues?.additionalInfo?.bannerInfo
                                    ? formValues?.additionalInfo?.bannerInfo?.[index]?.color
                                    : undefined
                                }
                                suffix={
                                  <Input
                                    type="color"
                                    value={
                                      formValues?.additionalInfo?.bannerInfo
                                        ? formValues?.additionalInfo?.bannerInfo?.[index]?.color
                                        : undefined
                                    }
                                  />
                                }
                              />
                            </InputColor>
                          </Form.Item>
                        </FirstItemsWrapper>
                        <Form.Item
                          {...field}
                          name={[field.name, "linkType"]}
                          required={false}
                          rules={[{ required: true, message: t("validations.required") }]}
                        >
                          <Radio.Group
                            onChange={() => form.resetFields([["additionalInfo", "bannerInfo", index, "linkValue"]])}
                            buttonStyle="solid"
                          >
                            <StyledTooltip title={t("common.links.screen")}>
                              <Radio.Button value="DeepLink">DeepLink</Radio.Button>
                            </StyledTooltip>
                            <StyledTooltip title={t("common.links.hyperLink")}>
                              <Radio.Button value="HyperLink">HyperLink</Radio.Button>
                            </StyledTooltip>
                          </Radio.Group>
                        </Form.Item>
                        {formValues?.additionalInfo?.bannerInfo?.[index]?.linkType === "DeepLink" ? (
                          <Form.Item
                            {...field}
                            name={[field.name, "linkValue"]}
                            rules={[{ required: true, message: t("validations.required") }]}
                          >
                            <Select showSearch={false} getPopupContainer={(trigger: any) => trigger.parentElement}>
                              {deepLinksOptions}
                            </Select>
                          </Form.Item>
                        ) : formValues?.additionalInfo?.bannerInfo?.[index]?.linkType === "HyperLink" ? (
                          <Form.Item
                            {...field}
                            name={[field.name, "linkValue"]}
                            rules={[
                              {
                                required: true,
                                message: t("validations.required")
                              },
                              {
                                type: "url",
                                message: t("validations.invalidUri")
                              },
                              {
                                max: formsConstantsValidation.link.max,
                                message: t("validations.maxLengthExceeded", { max: formsConstantsValidation.link.max })
                              }
                            ]}
                          >
                            <Input maxLength={500} />
                          </Form.Item>
                        ) : (
                          <></>
                        )}
                      </SpaceWrapper>
                    </Panel>
                  </Collapse>
                ))}
                {fields.length !== 2 && (
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {t("marketing.banner.form.buttonsText.add")}
                    </Button>
                  </Form.Item>
                )}
              </>
            );
          }}
        </Form.List>
      </Form>
    </Drawer>
  );
});

const FirstItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
`;

const SpaceWrapper = styled(Space)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  .ant-space-item {
    width: 100%;
  }
`;

const InputColor = styled.div`
  span:nth-child(2) {
    width: 25%;
    input {
      padding: 0;
      cursor: pointer;
    }
  }
`;

const CustomInputNumber = styled(InputNumber)`
  display: flex;
  ::after {
    content: "%";
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    right: -20px;
  }
`;
