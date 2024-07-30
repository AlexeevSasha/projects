import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { Button, Checkbox, DatePicker, Drawer, Form, Input, message, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  addNotificationAwait,
  getNotificationsAwait,
  updateNotificationAwait
} from "../../../../modules/usersNotifications/notificationsActionAsync";
import { FormLinksItem } from "../../../../ui/FormLinksItem";
import { validationDataPresent } from "../../../../common/helpers/commonValidators/validationDataPresent";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { useSelector } from "react-redux";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import type { INotificationFilters } from "../../../../api/dto/users/INotificationAwait";

interface IProps {
  notification?: { type: string } | null | any;
  cities: { value: string; label: string }[];
  onClose(): void;
  filterValues: INotificationFilters;
  isHistory: boolean;
}

const { Paragraph, Text } = Typography;

const osOptions = [
  { label: "Android", value: "Android" },
  { label: "iOS", value: "IOS" }
];

export const NotificationForm = ({ notification, cities, onClose, filterValues, isHistory }: IProps) => {
  const [linkItemValue, setLinkValue] = useState<{ typeLink: string; linkValueUrl: string } | {}>({});
  const [over18, setOver18] = useState<boolean>(false);
  const [policyAgreement, setPolicyAgreement] = useState(false);
  const { isLoading } = useSelector((state: StateType) => state.usersNotifications);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (notification) {
      form.setFieldsValue({
        heading: notification?.heading,
        message: notification?.message,
        sendTime: notification?.sendTime ? moment(notification?.sendTime) : undefined,
        mobilePlatforms: notification?.topicConditionInfo?.mobilePlatforms,
        cityId: notification?.topicConditionInfo ? notification?.topicConditionInfo?.cityId : notification?.userFilter?.citiesList
      });
      setOver18(notification?.topicConditionInfo?.over18);
      setPolicyAgreement(notification?.topicConditionInfo?.winline);
    }
    if (notification?.type === "Push" && notification?.typeLink && notification?.linkValueUrl) {
      setLinkValue({ typeLink: notification.typeLink, linkValueUrl: notification.linkValueUrl });
    } else {
      form.resetFields(["linkValue1", "linkValue2"]);
    }
  }, [notification]);

  const closeDrawer = () => {
    setLinkValue({});
    setOver18(false);
    setPolicyAgreement(false);
    onClose();
  };

  function disabledDate(current: Moment) {
    return current && current < moment().endOf("minute").add(-1, "m");
  }

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      const { linkValue1, linkValue2, mobilePlatforms, cityId, ...data } = values;
      const citiesList = typeof cityId === "string" ? [cityId] : cityId;
      const topicCondition =
        notification.type === "Push" || values.type === "Push"
          ? {
              topicConditionInfo: {
                mobilePlatforms,
                cityId,
                over18,
                winline: policyAgreement
              }
            }
          : {
              userFilter: { citiesList }
            };
      const dateNowOrFuture = values.sendTime < Date.now() ? moment(Date.now()) : values.sendTime;
      if (notification?.hasOwnProperty("id")) {
        if (!validationDataPresent(notification.sendTime)) {
          await dispatch(
            updateNotificationAwait({
              id: notification.id,
              type: notification.type,
              ...data,
              ...linkItemValue,
              sendTime: dateNowOrFuture.toISOString(),
              ...topicCondition
            })
          )
            .then(unwrapResult)
            .then(() => dispatch(getNotificationsAwait({ filters: filterValues, isHistory })));
        } else {
          message.error(i18next.t("validations.dateChangeNotificationError"));
        }
      } else {
        await dispatch(
          addNotificationAwait({
            ...data,
            type: notification?.type,
            ...linkItemValue,
            sendTime: dateNowOrFuture.toISOString(),
            ...topicCondition
          })
        )
          .then(unwrapResult)
          .then(() => dispatch(getNotificationsAwait({ filters: filterValues, isHistory })));
      }
      closeDrawer();
    });
  };

  const changeLinkValue = (typeLink: string, linkValue: string) => {
    if (typeLink === "HyperLink") {
      form?.setFieldValue("linkValue1", "");
    } else {
      form.setFieldValue("linkValue2", "");
    }
    if (!linkValue) {
      setLinkValue({ typeLink: notification?.typeLink || "None", linkValueUrl: notification?.linkValueUrl });
    } else {
      setLinkValue({ typeLink, linkValueUrl: linkValue });
    }
  };

  const handleOver18Changed = (e: CheckboxChangeEvent): void => {
    setOver18(e.target.checked);
  };

  const handlesetPolicyAgreementChanged = (e: CheckboxChangeEvent): void => {
    setPolicyAgreement(e.target.checked);
  };

  const max =
    notification?.type === "SMS"
      ? formsConstantsValidation.textarea.max.sms
      : notification?.type === "Email"
      ? formsConstantsValidation.textarea.max.email
      : formsConstantsValidation.textarea.max.default;

  const lengthHeading = notification?.type === "Email" ? 100 : formsConstantsValidation.entity.default.max;

  return (
    <Drawer
      title={
        notification?.id
          ? t("users.notifications.titles.updateNotification", { type: notification?.type ?? "none" })
          : t("users.notifications.titles.addNotification", { type: notification?.type ?? "none" })
      }
      closable={false}
      destroyOnClose={true}
      onClose={closeDrawer}
      visible={!!notification}
      width={332}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={t("common.sendTime")}
          name={"sendTime"}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
        >
          <DatePicker format={formsConstantsValidation.dateTimeFormat} style={{ width: "100%" }} disabledDate={disabledDate} showTime />
        </Form.Item>
        {notification?.type !== "SMS" && (
          <Form.Item
            label={t("common.heading")}
            required={false}
            rules={[
              {
                required: true,
                message: t("validations.required")
              },
              {
                max: lengthHeading,
                message: t("validations.maxLengthExceeded", { max: lengthHeading })
              }
            ]}
            name={"heading"}
          >
            <Input size={"middle"} />
          </Form.Item>
        )}
        <Form.Item
          label={t("common.text")}
          required={false}
          rules={[
            {
              required: true,
              message: t("validations.required")
            },
            {
              max,
              message: t("validations.maxLengthExceeded", { max })
            }
          ]}
          name={"message"}
        >
          <TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
        </Form.Item>
        {notification?.type === "Push" && (
          <FormLinksItem
            isUpdatedLink={"id" in notification}
            linkType={notification?.typeLink}
            linkValue={notification?.linkValueUrl}
            changeLinkValue={changeLinkValue}
          />
        )}
        <Paragraph>
          <Text strong>
            {t("users.notifications.auditoryFilter")} ({t("users.notifications.optional")})
          </Text>
        </Paragraph>
        <Form.Item required={false} label={t("users.notifications.city")} name={"cityId"}>
          <Select
            placeholder={t("common.selectPlaceholder")}
            defaultValue={notification?.type === "Push" ? notification?.topicConditionInfo?.cityId : notification?.userFilter?.citiesList}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
            options={cities}
          />
        </Form.Item>
        {notification?.type === "Push" && (
          <Form.Item required={false} label={t("users.notifications.deviceOS")} name={"mobilePlatforms"}>
            <Select
              mode="multiple"
              placeholder={t("common.selectPlaceholder")}
              defaultValue={notification?.topicConditionInfo?.mobilePlatforms}
              options={osOptions}
            />
          </Form.Item>
        )}
        {notification?.type === "Push" && (
          <>
            <Form.Item required={false} name={"over18"}>
              <Checkbox checked={over18} onChange={handleOver18Changed}>
                {t("users.notifications.over18")}
              </Checkbox>
            </Form.Item>
            <Form.Item required={false} name={"winline"}>
              <Checkbox checked={policyAgreement} onChange={handlesetPolicyAgreementChanged}>
                {t("users.notifications.policyAgreement")}
              </Checkbox>
            </Form.Item>
          </>
        )}
      </Form>
    </Drawer>
  );
};
