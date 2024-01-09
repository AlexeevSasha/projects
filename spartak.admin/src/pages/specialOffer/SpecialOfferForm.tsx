import { ArrowLeftOutlined, CopyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Layout, Modal, Tag, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { specialOfferRepository } from "api/specialOffer";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { localeOptions } from "common/enum/localeOptions";
import i18n from "i18next";
import moment, { Moment } from "moment";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { userLevelsSelector } from "store/dictionary/dictionarySelectors";
import { noticeActions } from "store/notice/notice";
import { specialOfferSelector } from "store/specialOffer/specialOfferSelectors";
import styled from "styled-components";
import { CustomDivider } from "ui/CustomDivider";
import { FromBaseLocal } from "ui/FromBaseLocale";
import { HeaderText } from "ui/HeaderText";
import { imageRepository } from "../../api/imageRepository";
import { deepMerge } from "../../common/helpers/deepMerge";
import { required } from "../../common/helpers/validators/required";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { SpecialOffer } from "../../common/interfaces/specialOffer";
import {
  draftSpecialOffer,
  getSpecialOfferById,
  publishSpecialOffer,
} from "../../store/specialOffer/specialOfferActionAsync";
import { specialOffersActions } from "../../store/specialOffer/specialOfferSlice";
import { ImageField } from "../../ui/ImageField";
import { Loader } from "../../ui/Loader";
import { RowLabel } from "../../ui/RowLabel";
import { SelectField } from "../../ui/SelectField";
import { UploadDesc } from "../../ui/UploadDesc";
import { Wysiwyg } from "../../ui/Wisiwyg/Wysiwyg";
import { specialOfferType } from "./options";

const { Header, Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;

export const SpecialOfferForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const locale = i18n.language === "ru" ? "Ru" : "En";
  const isCreate = pathname.includes("create");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const specialOffer = useSelector(specialOfferSelector);
  const fanLevelOptions = useSelector(userLevelsSelector);
  const [form] = Form.useForm<SpecialOffer>();
  const [values, setValues] = useState<SpecialOffer | undefined>();
  const [lang, setLang] = useState("Ru");

  const handleLangChange = (key: string) => {
    setValues(deepMerge({ ...values }, form.getFieldsValue()));
    setLang(key);
  };

  const fillFromBasicLocale = () => {
    values &&
      form.setFieldsValue({
        ...values,
        Header: { ...values.Header, En: values.Header.Ru },
        Announce: { ...values.Announce, En: values.Announce.Ru },
        Text: { ...values.Text, En: values.Text.Ru },
      });
  };
  const currentValues = useRef<SpecialOffer>();
  const initialValues = useMemo(() => {
    const formValues = (specialOffer && { ...specialOffer }) || ({} as SpecialOffer);
    currentValues.current = formValues;

    return formValues;
  }, [specialOffer]);

  const showConfirm = (draft: boolean = false) => {
    confirm({
      title: <HeaderText>{t(draft ? "allPages.hideConfirmTitle" : "allPages.confirmTitle")}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`tournaments.${draft ? "hideConfirm" : "publishConfirm"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  const submitForm = async (draft: boolean = false) => {
    if (
      !draft &&
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("allPages.formError"), type: "error" }));

      return;
    }
    dispatch(
      (draft ? draftSpecialOffer : publishSpecialOffer)(
        deepMerge<SpecialOffer>({ ...values, Id: id, SortOrder: 10 }, form.getFieldsValue())
      )
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`allPages.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );

        navigate(`/${routePaths.specialOffer}`);
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getSpecialOfferById(id))
        .unwrap()
        .then((res) => setValues(res));
    }

    return () => {
      dispatch(specialOffersActions.resetSpecialOffer());
    };
  }, [id]);

  return !isCreate && !specialOffer ? (
    <Loader />
  ) : (
    <>
      <Form form={form} requiredMark={false} labelAlign="left" validateTrigger="onBlur" initialValues={initialValues}>
        <HeaderContent>
          <HeaderTop>
            <TitleContainer>
              <CustomLink to={`/${routePaths.specialOffer}`}>
                <ArrowLeftOutlined />
                <span>{t("media.back")}</span>
              </CustomLink>

              <CustomDivider type="vertical" />

              {specialOffer ? (
                <CardTitle level={4}>
                  <CustomTitle title={specialOffer?.Header?.Ru || t("specialOffer.headingSpecialOffer")}>
                    {specialOffer?.Header?.Ru || t("specialOffer.headingSpecialOffer")}
                  </CustomTitle>

                  <Status>
                    <Tag color={specialOffer?.IsDraft ? "cyan" : specialOffer?.Status === "Planned" ? "gold" : "green"}>
                      {t(
                        `allPages.statuses.${
                          specialOffer?.IsDraft ? "Draft" : specialOffer?.Status === "Planned" ? "Planned" : "Published"
                        }`
                      )}
                    </Tag>
                  </Status>
                </CardTitle>
              ) : isCreate ? (
                <CardTitle level={4}>{t("specialOffer.headingSpecialOffer")}</CardTitle>
              ) : null}
            </TitleContainer>

            <ButtonContainer>
              <Button onClick={() => navigate(`/${routePaths.specialOffer}`)}>
                {t(`allPages.buttonsText.cancel`)}
              </Button>

              <Button
                style={{
                  color: theme.colors.red1,
                  borderColor: theme.colors.red1,
                }}
                onClick={() => showConfirm(true)}
              >
                {t(`allPages.buttonsText.draft`)}
              </Button>

              <Button type="primary" onClick={() => showConfirm()}>
                {t(`allPages.buttonsText.publish`)}
              </Button>
            </ButtonContainer>
          </HeaderTop>
        </HeaderContent>

        <Content style={{ padding: 24, margin: 0 }}>
          <FormWrapper>
            <div style={{ display: "flex", gap: "40px" }}>
              <FormItem
                name={"StartDate"}
                label={<RowLabel label={t("specialOffer.promotionPeriod")} prompt={t("allPages.dateTimeHelp")} />}
                rules={[{ validator: required }]}
                getValueFromEvent={(date: Moment) => date?.zone(-180).toISOString()}
                getValueProps={(date) => ({
                  value: date ? moment(date).zone(-180) : undefined,
                })}
              >
                <DatePicker showTime placeholder={t("specialOffer.promotionStart")} style={{ width: 256 }} />
              </FormItem>
              <FormItem
                name={"EndDate"}
                rules={[
                  { validator: required },
                  {
                    validator: async (_, value) => {
                      if (!value) {
                        return Promise.resolve();
                      }

                      const startDatetime = form.getFieldValue("StartDate");
                      if (startDatetime != null) {
                        if (value <= startDatetime) {
                          return Promise.reject("Дата окончания должна быть больше даты начала");
                        }
                      }
                    },
                  },
                ]}
                getValueFromEvent={(date: Moment) => date?.zone(-180).toISOString()}
                getValueProps={(date) => ({
                  value: date ? moment(date).zone(-180) : undefined,
                })}
              >
                <DatePicker showTime placeholder={t("specialOffer.promotionEnd")} style={{ width: 256 }} />
              </FormItem>
            </div>

            <FormItem
              label={<RowLabel label={t("specialOffer.fanLevel")} />}
              name="SpecialOfferAccess"
              rules={[{ validator: required }]}
            >
              <SelectField mode="multiple" options={fanLevelOptions || []} style={{ width: 256 }} />
            </FormItem>
            <FormItem
              label={<RowLabel label={t("specialOffer.promotionType")} />}
              name="Type"
              rules={[{ validator: required }]}
            >
              <SelectField options={specialOfferType(locale) || []} style={{ width: 256 }} />
            </FormItem>
            <div style={{ display: "flex", alignItems: "baseline", gap: "40px" }}>
              <FormItem
                label={<RowLabel label={t("specialOffer.previewPicture")} />}
                name="PreviewPhoto"
                rules={[{ validator: required }]}
              >
                <ImageField
                  validation={{
                    width: 512,
                    height: 367,
                    size: 1024,
                    format: ["png", "jpeg"],
                    exact: true,
                  }}
                  uploadRequest={specialOfferRepository.uploadImage}
                  removeRequest={specialOfferRepository.removeImage}
                />
              </FormItem>
              <UploadDescription width={270}>
                {t("allPages.form.uploadDesc", {
                  width: "512",
                  height: "367",
                  size: "1",
                  format: "jpeg, png",
                })}
              </UploadDescription>
            </div>

            <FormItem
              name={"locale"}
              label={<RowLabel label={t("specialOffer.localization")} />}
              style={{ marginBottom: "16px" }}
            >
              <SelectField
                onChange={handleLangChange}
                defaultValue={{ value: "Ru", label: "Ru" }}
                options={localeOptions}
                style={{ width: 256 }}
              />
            </FormItem>
            <div style={{ paddingLeft: "240px", height: "38px" }}>
              {form.getFieldValue("locale") === "En" && (
                <FromBaseLocal onClick={fillFromBasicLocale}>
                  <CopyOutlined color={theme.colors.middleGray} style={{ fontSize: "16px" }} />
                  {t("specialOffer.fromBaseLocal")}
                </FromBaseLocal>
              )}
            </div>

            <div style={{ width: "980px" }}>
              <Divider style={{ margin: "40px 0" }} />
            </div>

            <FormItem
              label={
                <RowLabel
                  label={t("specialOffer.promotionsHeading") + "*"}
                  prompt={t("specialOffer.headingPromotionValidationText")}
                />
              }
              name={["Header", lang]}
              rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 70) }]}
            >
              <Input style={{ width: "740px" }} placeholder={t("specialOffer.text")} />
            </FormItem>
            <FormItem
              label={
                <RowLabel
                  label={t("specialOffer.announcePromotion")}
                  prompt={t("specialOffer.announceValidationText")}
                />
              }
              name={["Announce", lang]}
              rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 160) }]}
            >
              <TextArea placeholder={t("specialOffer.text")} style={{ width: "740px" }} />
            </FormItem>
            <FormItem
              label={<RowLabel label={t("specialOffer.announceText")} />}
              name={["Text", lang]}
              rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 4000) }]}
            >
              <Wysiwyg uploadRequest={imageRepository.upload} placeholder={"Введите текст акции"} />
            </FormItem>
          </FormWrapper>
        </Content>
      </Form>
    </>
  );
});

const HeaderContent = styled(Header)`
  padding: 12px 24px;
  background: ${theme.colors.white};
  height: auto;

  #root & > div:nth-child(2) > div:first-child {
    margin: 0;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  height: 36px;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const CardTitle = styled(Title)`
  margin-bottom: 0 !important;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px !important;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CustomTitle = styled.div`
  height: 28px;
  cursor: help;
  overflow: hidden;
`;

const FormWrapper = styled.div`
  background: ${theme.colors.white};
  padding: 24px 128px 24px 24px;
  overflow: auto;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ButtonContainer = styled(Form.Item)`
  display: flex;
  gap: 16px;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const FormItem = styled(Form.Item)`
  display: flex;
  column-gap: 40px;
  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }

    & > label {
      height: auto;
      text-align: left;
      & span {
        white-space: normal;
      }
    }
  }

  #root & {
    margin-bottom: 40px;
  }

  & > div:first-child {
    display: flex;
    align-items: flex-start;

    & > label::after {
      display: none;
    }
  }

  & label > div:first-child::after {
    display: none;
  }
  .ant-form-item-control-input-content {
    display: flex;
    gap: 40px;
  }
`;

const UploadDescription = styled(UploadDesc)`
  display: flex;
  align-items: center;
`;
