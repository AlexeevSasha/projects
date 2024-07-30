import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { Button, DatePicker, Drawer, Form, Input, message, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  addNotificationAwait,
  getNotificationsAwait,
  updateNotificationAwait
} from "../../../../modules/usersNotifications/notificationsActionAsync";
import type { IDeepLink } from "../../../../api/dto/IDeepLink";
import { getDeepLinks } from "../../../../api/requests/deepLinks";
import { FormLinksItem } from "../../../../ui/FormLinksItem";
import { validationDataPresent } from "../../../../common/helpers/commonValidators/validationDataPresent";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { useSelector } from "react-redux";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import type { INotificationFilters } from "../../../../api/dto/users/INotificationAwait";

interface IProps {
  notification?: { type: string } | null | any;
  projects: { label: string; value: string }[];
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

const getAllDeepLinks = (value: string, setDeepLinks: (v: IDeepLink[]) => void) => {
  getDeepLinks(value)
    .then((res) => setDeepLinks(res))
    .catch(() => setDeepLinks([]));
};

export const NotificationForm = ({ notification, projects, cities, onClose, filterValues, isHistory }: IProps) => {
  const [linkItemValue, setLinkValue] = useState<{ typeLink: string; linkValueUrl: string } | {}>({});
  const [deepLinks, setDeepLinks] = useState<IDeepLink[]>([]);

  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: StateType) => state.usersNotifications);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (notification?.projectId) {
      getAllDeepLinks(notification.projectId, setDeepLinks);
    }
    if (notification) {
      form.setFieldsValue({
        heading: notification?.heading,
        message: notification?.message,
        sendTime: notification?.sendTime ? moment(notification?.sendTime) : undefined,
        mobilePlatforms: notification?.topicConditionInfo?.mobilePlatforms,
        cityId: notification?.topicConditionInfo ? notification?.topicConditionInfo?.cityId : notification?.userFilter?.citiesList,
        projectId: notification?.projectId
      });
    }
    if (notification?.type === "Push" && notification?.typeLink && notification?.linkValueUrl) {
      setLinkValue({ typeLink: notification.typeLink, linkValueUrl: notification.linkValueUrl });
    } else {
      form.resetFields(["linkValue1", "linkValue2"]);
    }
  }, [notification]);

  const closeDrawer = () => {
    setDeepLinks([]);
    setLinkValue({});
    onClose();
  };

  function disabledDate(current: Moment) {
    return current && current < moment().endOf("minute").add(-1, "m");
  }

  const handleProjectChange = async (value: string) => {
    if (notification?.type === "Push") {
      form.resetFields(["linkValue1"]);
      getAllDeepLinks(value, setDeepLinks);
    }
  };

  const submitForm = () => {
    form.validateFields().then(async (values) => {
      const { linkValue1, linkValue2, mobilePlatforms, cityId, ...data } = values;
      const citiesList = typeof cityId === "string" ? [cityId] : cityId;
      const topicCondition =
        notification.type === "Push" || values.type === "Push"
          ? {
              topicConditionInfo: {
                mobilePlatforms,
                cityId
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
              projectId: data.projectId || notification.projectId,
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
    if (!linkValue) {
      setLinkValue({ typeLink: notification?.typeLink || "None", linkValueUrl: notification?.linkValueUrl });
      form?.resetFields(["linkValue1", "linkValue2"]);
    } else {
      setLinkValue({ typeLink, linkValueUrl: linkValue });
    }
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
        <Form.Item
          label={t("common.project")}
          name={"projectId"}
          rules={[
            {
              required: true,
              message: t("validations.required")
            }
          ]}
          required={false}
        >
          <Select
            onChange={handleProjectChange}
            options={projects}
            defaultValue={notification?.projectId}
            placeholder={t("common.selectPlaceholder")}
            disabled={!!notification?.projectId}
          />
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
            deepLinks={deepLinks}
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
            filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
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
      </Form>
    </Drawer>
  );
};
