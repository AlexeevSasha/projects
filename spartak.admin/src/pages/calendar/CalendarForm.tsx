import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, Modal, Tabs, Tag, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { deepMerge } from "common/helpers/deepMerge";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { CalendarEntity } from "common/interfaces/calendar";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { calendarActions } from "store/calendar/calendar";
import { draftCalendar, getCalendarById, publishCalendar } from "store/calendar/calendarActionAsync";
import { calendarItemSelector } from "store/calendar/calendarSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";

const { Text } = Typography;

const { confirm } = Modal;

type Props = {
  onDelete?: (id: CalendarEntity["Id"]) => void;
};

export const CalendarForm = memo(({ onDelete }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm<CalendarEntity>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<CalendarEntity | undefined>();
  const dispatch = useAppDispatch();
  const item = useSelector(calendarItemSelector);

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const hanldleDelete = () => {
    id && onDelete?.(id);
    closeDrawer();
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
  };

  const showConfirm = (draft?: boolean) => {
    confirm({
      title: <HeaderText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`calendar.${draft ? "draftConfirm" : "publishConfirm"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  const submitForm = async (draft?: boolean) => {
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
      (draft ? draftCalendar : publishCalendar)(deepMerge<CalendarEntity>({ ...values, Id: id }, form.getFieldsValue()))
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(
              `${draft ? "calendar.draftSuccess" : isCreate ? "calendar.publishSuccess" : "allPages.saveSuccess"}`
            ),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getCalendarById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(calendarActions.resetItem());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("calendar.addEvent") : t("calendar.editEvent")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px 130px" }}
      footer={
        <Footer>
          <div>{!isCreate && <Delete onClick={hanldleDelete} />}</div>

          <div>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              {t("allPages.buttonsText.cancel")}
            </Button>

            <Button
              onClick={() => showConfirm(true)}
              style={{
                marginRight: 8,
                color: theme.colors.red1,
                borderColor: theme.colors.red1,
              }}
            >
              {t("allPages.buttonsText.draft")}
            </Button>

            <Button
              onClick={() => (isCreate || item?.Status === "Draft" ? showConfirm : submitForm)()}
              type="primary"
              htmlType="submit"
            >
              {isCreate || item?.Status === "Draft"
                ? t("allPages.buttonsText.publish")
                : t("allPages.buttonsText.save")}
            </Button>
          </div>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !item ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={item} validateTrigger="onBlur">
          {item && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[item?.Status || "None"]}>{t(`allPages.statuses.${item?.Status || "None"}`)}</Tag>
            </Status>
          )}

          <Form.Item
            name="EventDate"
            label={t("calendar.addEventDate") + " *"}
            getValueFromEvent={(date) => date?.toISOString()}
            getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
            rules={[{ validator: required }]}
          >
            <DatePicker
              getPopupContainer={(triggerNode) => triggerNode}
              name="calendarEventUtc"
              placeholder={t("allPages.selectData")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("calendar.eventName") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="calendarFullName" placeholder={t("clubsStaff.fioPlaceholder")} />
          </Form.Item>

          <Form.Item name="EventUrl" label={t("calendar.eventLink")}>
            <Input name="Link" />
          </Form.Item>

          <Form.Item name="ImageUrl" label={t("allPages.photo") + " *"} rules={[{ validator: required }]}>
            <ImageField
              withCrop
              validation={{
                width: 796,
                height: 721,
                size: 2048,
                format: ["png", "jpeg"],
              }}
            />
          </Form.Item>

          <Text>
            {t("allPages.form.uploadDesc", {
              format: "png",
              width: "796",
              height: "721",
              size: "2",
            })}
          </Text>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;
