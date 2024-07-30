import { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Divider, Drawer, Form, Input, message, Select } from "antd";
import { addNotificationAwait, updateNotificationAwait } from "../../../../modules/usersNotifications/notificationsActionAsync";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { unwrapResult } from "@reduxjs/toolkit";
import { FormLinksItem } from "../../../../ui/FormLinksItem";
import { StateType, useAppDispatch } from "../../../../core/redux/store";
import { useSelector } from "react-redux";
import { validationDataPresent } from "../../../../common/helpers/commonValidators/validationDataPresent";
import { validationWithSpaces } from "../../../../common/helpers/commonValidators/validationWithSpaces";
import TextArea from "antd/lib/input/TextArea";
import { selectProps } from "../../../../common/helpers/customMulti";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { getAllUsers } from "../../../../modules/users/usersActionAsync";
import { IFiltersUser } from "../../../../api/dto/users/IUser";
import { getUserEntities } from "../../../../modules/users/usersSelector";
import { osOptions } from "../../conteins/osOptions";

interface IProps {
  notification?: { type: string } | null | any;
  selectOptions: { label: string; value: string }[];
  multiOptions: { label: string; value: string }[];
  onClose(): void;
}

function disabledDate(current: Moment) {
  return current && current < moment().endOf("minute").add(-1, "m");
}

export const NotificationForm = ({ notification, onClose, selectOptions, multiOptions }: IProps) => {
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: StateType) => state.usersNotifications);
  const [linkItemValue, setLinkValue] = useState<{ typeLink: string; linkValue: string } | {}>({});
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [filterValues, setFilterValues] = useState<IFiltersUser>({
    pagination: 0,
    name: "",
    date: null,
    sorting: ""
  });
  const allUsers = useSelector(getUserEntities).map((user) => ({
    label: `${user.firstName
      } ${user.lastName}`, value: user.id
  }));;

  useEffect(() => {
    if (notification?.typeLink && notification?.linkValue) {
      setLinkValue({ typeLink: notification.typeLink, linkValue: notification.linkValue });
    }
    form.resetFields();
  }, [notification]);

  useEffect(() => {
    dispatch(getAllUsers(filterValues));
  }, []);

  const closeDrawer = () => {
    setLinkValue({});
    form.resetFields();
    setMultiValue([]);
    onClose();
  };
  const submitForm = () => {
    form.validateFields().then(async (values) => {
      const { linkValue1, linkValue2, ...data } = values;
      const dateNowOrFuture = values.sendTime < Date.now() ? moment(Date.now()) : values.sendTime;
      if (notification?.hasOwnProperty("id")) {
        if (!validationDataPresent(notification.sendTime)) {
          await dispatch(
            updateNotificationAwait({
              ...notification,
              ...data,
              userIds: undefined,
              projectId: data.projectId || notification.projectId,
              userTopicList: data.userTopicList ?? notification.userTopicList,
              ...linkItemValue,
              sendTime: dateNowOrFuture.toISOString()
            })
          ).then(unwrapResult);
        } else {
          message.error(t("validations.dateChangeNotificationError"));
        }
      } else {
        await dispatch(
          addNotificationAwait({
            ...data,
            type: notification?.type,
            ...linkItemValue,
            sendTime: dateNowOrFuture.toISOString()
          })
        ).then(unwrapResult);
      }
      closeDrawer();
    });
  };

  const changeLinkValue = (typeLink: string, linkValue: string) => {
    if (!linkValue) {
      setLinkValue({ typeLink: notification?.typeLink || "None", linkValue: notification?.linkValue });
      form?.resetFields(["linkValue1", "linkValue2"]);
    } else {
      setLinkValue({ typeLink, linkValue });
    }
  };

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
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            {t("common.buttonsText.cancel")}
          </Button>
          <Button disabled={isLoading} onClick={submitForm} type="primary" htmlType={"submit"}>
            {t("common.buttonsText.save")}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          heading: notification?.heading,
          message: notification?.message,
          sendTime: notification?.sendTime ? moment(notification?.sendTime) : undefined,
        }}
      >
        {notification?.type !== "SMS" && (
          <Form.Item
            name={"heading"}
            label={t("common.heading")}
            rules={[{ validator: async (valid, value) => validationWithSpaces(valid, value, 50) }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name={"message"}
          label={t("common.text")}
          rules={[{ validator: async (valid, value) => validationWithSpaces(valid, value, 150) }]}
        >
          <TextArea />
        </Form.Item>
        {notification?.type === "Push" && (
          <FormLinksItem
            isUpdatedLink={"id" in notification}
            linkType={notification?.typeLink}
            linkValue={notification?.linkValue}
            changeLinkValue={changeLinkValue}
          />
        )}
        <Divider />
        {/* <Form.Item name={"userFilter"} label={t("users.notifications.userFilter")}>
          <Select disabled options={selectOptions} placeholder={t("users.notifications.userFilter")} />
        </Form.Item> */}
        <Form.Item
          name={["userFilter", "userIds"]}
          initialValue={notification ? notification.userIds : []}
          label={t("users.notifications.form.fields.userList.label")}
          required={false}
          rules={[{ required: true, message: t("validations.required") }]}
        >
          <Select
            {...selectProps(
              "userIds",
              allUsers,
              multiValue,
              setMultiValue,
              form,
              t("users.notifications.form.fields.userList.placeholder"),
              undefined
            )}
          />
        </Form.Item>
        {notification?.type === "Push" && (
          <>
            <Form.Item
              label={"OS:"}
              required={false}
              name={"os"}
              rules={[
                {
                  required: true,
                  message: "Обязательное поле."
                }
              ]}
              initialValue={notification?.os ? notification?.os : ""}
            >
              <Checkbox.Group style={{ display: "flex", justifyContent: "space-between" }} options={osOptions} />
            </Form.Item>
            <Divider />
          </>
        )}
        <Divider />
        <Form.Item
          name={"sendTime"}
          label={t("common.sendTime") + ":"}
          rules={[
            {
              required: true,
              type: "date",
              message: t("validations.required")
            }
          ]}
          required={false}
        >
          <DatePicker disabledDate={disabledDate} style={{ width: "100%" }} format={formsConstantsValidation.dateTimeFormat} showTime />
        </Form.Item>
      </Form>
    </Drawer >
  );
};
