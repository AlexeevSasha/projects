import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, Radio, Space } from "antd";
import { notificationsRepository } from "api/notificationsRepository";
import { routePaths } from "common/constants/routePaths";
import { requiredMinMax } from "common/helpers/validators/requiredMinMax";
import { DeepLinkList } from "common/interfaces/IDeepLinks";
import { LinkType, NoticeEntity, NoticeType } from "common/interfaces/notifications";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { notificationsActions } from "store/notifications/notifications";
import {
  getNotificationById,
  publishNotification,
  updateNotification,
} from "store/notifications/notificationsActionAsync";
import { deepLinksSelector, noticeSelector } from "store/notifications/notificationsSelectors";
import styled from "styled-components";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { UploadField } from "ui/UploadField";
import { theme } from "../../assets/theme/theme";
import { required } from "../../common/helpers/validators/required";
import { validationHyperLink } from "../../common/helpers/validators/validationHyperLink";
import { noticeActions } from "../../store/notice/notice";

const localization = [
  { label: "Русский", value: "ru" },
  { label: "English", value: "en" },
];

const initialFormValues = {
  PushType: "AllUser",
};

export const NotificationsForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id, tab, type = "Push" } = useParams<{ id: string; tab: string; type: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<NoticeEntity>();
  const { t } = useTranslation();
  const notice = useSelector(noticeSelector);
  const deepLinks = useSelector(deepLinksSelector);
  const [linkType, setLinkType] = useState<LinkType>(notice?.TypeLink || "Screen");
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(`/${routePaths.notifications(tab)}`), 150);
  };

  const [screenOptions, setScreenOptions] = useState<any>([]);
  useEffect(() => {
    setScreenOptions(deepLinks?.map((elem) => ({ label: DeepLinkList[`${elem.name}`], value: elem.link })) || []);
  }, [deepLinks]);

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      return;
    }

    (isCreate
      ? dispatch(
          publishNotification({
            TypeLink: linkType,
            ...form.getFieldsValue(),
            ExternalFileUrl:
              form.getFieldsValue().PushType === "AllUser" ? null : form.getFieldsValue().ExternalFileUrl,
          })
        )
      : dispatch(
          updateNotification({
            ...form.getFieldsValue(),
            TypeLink: linkType,
            Id: notice!.Id,
            ExternalFileUrl:
              form.getFieldsValue().PushType === "AllUser" ? null : form.getFieldsValue().ExternalFileUrl,
          })
        )
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`${isCreate ? "notifications.successCreate" : "notifications.successEdit"}`),
          })
        );
        closeDrawer();
      })
      .catch(() => dispatch(noticeActions.add({ message: t("notifications.errorAddNotification"), type: "error" })));
  };

  useEffect(() => {
    !isCreate && id && dispatch(getNotificationById(id));

    if (!deepLinks) {
      notificationsRepository
        .getDeepLink()
        .then((res) => dispatch(notificationsActions.setDeepLinks(res)))
        .catch(() => dispatch(noticeActions.add({ message: "", type: "error" })));
    }

    return () => {
      dispatch(notificationsActions.resetNotice());
    };
  }, []);

  useEffect(() => {
    setLinkType(notice?.TypeLink || "Screen");
  }, [notice?.TypeLink]);

  const addFile = async (file: File) => {
    return await notificationsRepository.addFile(file, "Users").then((res) => res);
  };

  return (
    <Drawer
      title={<Title>{t(`notifications.${isCreate ? "createType" : "editType"}`, { type })}</Title>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={submitForm} type="primary" htmlType={"submit"}>
            {t(`allPages.buttonsText.${isCreate ? "publish" : "save"}`)}
          </Button>
        </Footer>
      }
    >
      {!isCreate && !notice ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={notice || initialFormValues}
          validateTrigger="onBlur"
        >
          <Form.Item
            name="SendTime"
            rules={[{ validator: required }]}
            label={t("notifications.sendDateTime")}
            getValueFromEvent={(date) => date?.toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date) : undefined,
            })}
          >
            <DatePicker
              showTime
              style={{ width: 291 }}
              disabledDate={(date) => moment(date) < moment().set({ seconds: -1 })}
            />
          </Form.Item>

          <Form.Item
            name="Heading"
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
            label={t("media.header")}
          >
            <Input name="noticeHeader" />
          </Form.Item>

          <Form.Item
            name="Message"
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 150) }]}
            label={t("notifications.text")}
          >
            <Input.TextArea name="noticeText" rows={13} />
          </Form.Item>

          <Form.Item name="Lang" rules={[{ validator: required }]} label={t("matches.locale")}>
            <SelectField options={localization} style={{ width: 291 }} />
          </Form.Item>

          {type === NoticeType.push && (
            <>
              <Label>{t("calendar.eventLink")}</Label>
              <Form.Item shouldUpdate label={t("notifications.link")} noStyle>
                {() => (
                  <Radio.Group
                    onChange={({ target }) => {
                      setLinkType(target.value);
                      form.setFieldsValue({ LinkValueUrl: "" });
                    }}
                    value={linkType}
                  >
                    <Form.Item
                      {...(linkType === "Screen" && { name: "LinkValueUrl" })}
                      rules={[{ ...(linkType === "Screen" && { validator: required }) }]}
                      label={<Radio value={"Screen"}>{t("notifications.appScreen")}</Radio>}
                    >
                      <SelectField options={screenOptions} style={{ width: 291 }} disabled={linkType !== "Screen"} />
                    </Form.Item>
                    <Form.Item
                      {...(linkType === "HyperLink" && { name: "LinkValueUrl" })}
                      rules={[{ validator: (_, value) => validationHyperLink(_, value, linkType === "HyperLink") }]}
                      label={<Radio value={"HyperLink"}>{t("notifications.gyperLink")}</Radio>}
                    >
                      <Input name="NoticeLink" style={{ width: 291 }} disabled={linkType !== "HyperLink"} />
                    </Form.Item>
                  </Radio.Group>
                )}
              </Form.Item>
            </>
          )}

          <Form.Item name="PushType" rules={[{ validator: required }]}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={"AllUser"}>{t("loyalty.allUsers")}</Radio>
                <Radio value={"FromFile"}>{t("loyalty.fromCSV")}</Radio>

                <Form.Item shouldUpdate>
                  {() => {
                    const disabled = form.getFieldValue(["PushType"]) === "AllUser";

                    return (
                      <Form.Item
                        name="ExternalFileUrl"
                        rules={
                          disabled
                            ? []
                            : [
                                {
                                  validator: (_, value) =>
                                    value && value.includes(".csv") ? Promise.resolve() : Promise.reject(),
                                  message: t("validations.required"),
                                },
                              ]
                        }
                        // getValueFromEvent={(e) => {
                        //   return e;
                        // }}
                      >
                        <UploadField
                          uploadRequest={(file) => addFile(file)}
                          removeRequest={notificationsRepository.deleteFile}
                          placeholder={({ loading } = {}) => (
                            <Button disabled={disabled} icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>
                              {t("loyalty.import")}
                            </Button>
                          )}
                          disabled={disabled}
                          listType={undefined}
                          validate={(file: File) => {
                            const typeError = !file.type.includes("csv");
                            const sizeError = !(file.size / 1024 <= 1024);
                            if (typeError || sizeError) {
                              dispatch(noticeActions.add({ message: t("validations.errorLoadFile"), type: "error" }));
                            }

                            return !typeError && !sizeError;
                          }}
                        />
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
});

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Footer = styled.div`
  text-align: right;
`;

const Label = styled.div`
  font-family: "SF Pro Display", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${theme.colors.neroGray};
  margin: 4px 0;
`;
