import { MinusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, Modal, Tabs, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { theme } from "assets/theme/theme";
import { statusColors } from "common/constants/status";
import { getClubSection } from "common/constants/teams";
import { birthdayValidator } from "common/helpers/validators/birthdayValidator";
import { countryValidator } from "common/helpers/validators/countryValidator";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { rightsSelector } from "store/auth/authSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { SelectField, SelectFieldOption } from "ui/SelectField";
import { deepMerge } from "../../common/helpers/deepMerge";
import { Trainer } from "../../common/interfaces/trainers";
import { useAppDispatch } from "../../store";
import { countriesOptionsSelector, ownTeamsOptionsSelector } from "../../store/dictionary/dictionarySelectors";
import { draftTrainer, getTrainer, publishTrainer } from "../../store/trainers/trainersActionAsync";
import { trainerSelector } from "../../store/trainers/trainersSelectors";
import { trainersActions } from "../../store/trainers/trainersSlice";
import { Loader } from "../../ui/Loader";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";
import { UploadDesc } from "ui/UploadDesc";
import { Wysiwyg } from "ui/Wisiwyg/Wysiwyg";
import { imageRepository } from "api/imageRepository";

const { confirm } = Modal;

export const ClubsTrainersForm = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCreate = pathname.endsWith("create");
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm<Trainer>();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [values, setValues] = useState<Trainer | undefined>();
  const trainer = useSelector(trainerSelector);
  const countriesOptions = useSelector(countriesOptionsSelector);
  const teams = useSelector(ownTeamsOptionsSelector);
  const dispatch = useAppDispatch();
  const rights = useSelector(rightsSelector);
  const section = getClubSection(rights);

  const teamsOptions = useMemo(
    () =>
      teams.reduce(
        (acc: { Site: SelectFieldOption[]; Academy: SelectFieldOption[] }, team) => {
          team.Section === "Site" && acc.Site.push(team);
          team.Section === "Academy" && acc.Academy.push(team);

          return acc;
        },
        { Site: [], Academy: [] }
      ),
    [teams]
  );

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleTabClick = (key: string) => {
    setValues(form.getFieldsValue());
    setLang(key);
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
    const formValues = deepMerge<Trainer>({ ...values, Id: id }, form.getFieldsValue());
    dispatch((draft ? draftTrainer : publishTrainer)(formValues))
      .unwrap()
      .then(() => {
        closeDrawer();
        dispatch(
          noticeActions.add({
            message: t(
              (trainer?.Status === "Draft" && draft) || (trainer?.Status === "Published" && !draft)
                ? "allPages.saveSuccess"
                : `clubsTrainers.${draft ? "successHide" : "successPublish"}`
            ),
            closable: true,
          })
        );
      });
  };

  const showConfirm = (draft?: boolean) => {
    confirm({
      title: <HeaderText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`clubsTrainers.${draft ? "hideConfirmText" : "confirmText"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getTrainer(id))
        .unwrap()
        .then((value) => setValues(value));
    }

    return () => {
      dispatch(trainersActions.resetTrainer());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("clubsTrainers.addTrainer") : t("clubsTrainers.editTrainer")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer>
          <div>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              {t("allPages.buttonsText.cancel")}
            </Button>

            <Button
              onClick={() => (trainer?.Status === "Draft" ? submitForm(true) : showConfirm(true))}
              style={{
                marginRight: 8,
                color: theme.colors.red1,
                borderColor: theme.colors.red1,
              }}
            >
              {t("allPages.buttonsText.draft")}
            </Button>

            <Button
              onClick={() => (isCreate || trainer?.Status === "Draft" ? showConfirm : submitForm)()}
              type="primary"
              htmlType="submit"
            >
              {t("allPages.buttonsText.publish")}
            </Button>
          </div>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !trainer ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={trainer} validateTrigger="onBlur">
          {trainer && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[trainer?.Status || "None"]}>
                {t(`allPages.statuses.${trainer?.Status || "None"}`)}
              </Tag>
            </Status>
          )}

          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder") + " *"} rules={[{ validator: required }]}>
            <InputNumber min={1} placeholder={t("allPages.form.orderPlaceholder")} style={{ width: 169 }} />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("clubsTrainers.form.trainerFio") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input placeholder={t("clubsTrainers.form.trainerFioPlaceholder")} />
          </Form.Item>

          <Form.Item
            name={["Position", lang]}
            label={t("allPages.position") + " *"}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 2, 100) }]}
          >
            <Input placeholder={t("allPages.form.positionPlaceholder")} />
          </Form.Item>

          <Form.Item
            name="Section"
            label={t("clubsLeadership.section") + " *"}
            rules={[{ validator: required }]}
            initialValue={section}
          >
            <SelectField
              disabled={!!section}
              options={[
                { value: "Site", label: "Сайт" },
                { value: "Academy", label: "Академия" },
              ]}
            />
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) =>
              getFieldValue("Section") === "Site" && (
                <Form.Item
                  name="TeamIds"
                  label={t("allPages.form.teamBinding") + " *"}
                  rules={[{ validator: required }]}
                >
                  <SelectField options={teamsOptions.Site} mode="multiple" />
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item
            name="Birthday"
            label={t("allPages.form.dateOfBirth") + " *"}
            getValueFromEvent={(data) => data?.toISOString()}
            getValueProps={(date) => ({
              value: date ? moment(date) : undefined,
            })}
            rules={[{ validator: birthdayValidator }]}
          >
            <DatePicker
              getPopupContainer={(triggerNode) => triggerNode}
              showToday={false}
              placeholder={t("allPages.form.dateOfBirthPlaceholder")}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="CitizenshipId"
            label={t("allPages.form.citizenship") + " *"}
            rules={[{ validator: countryValidator }]}
          >
            <SelectField placeholder={t("allPages.form.citizenshipPlaceholder")} options={countriesOptions} />
          </Form.Item>

          <Form.Item name={["Biography", lang]} label={t("allPages.form.biography")}>
            {/* <TextArea rows={8} /> */}
            <Wysiwyg uploadRequest={imageRepository.upload} />
          </Form.Item>

          <Form.Item name="ImageUrl" label={t("allPages.photo") + " *"} rules={[{ validator: required }]}>
            <ImageField
              validation={{
                width: 914,
                height: 836,
                size: 2048,
                format: ["png"],
                exact: true,
              }}
            />
          </Form.Item>

          <UploadDesc>
            {t("allPages.form.uploadDesc", {
              width: "914",
              height: "836",
              format: "png",
              size: "2",
            })}
          </UploadDesc>

          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) =>
              getFieldValue("Section") === "Academy" && (
                <>
                  <Title>
                    Kарьера&nbsp; (
                    <AddText
                      onClick={() =>
                        form.setFieldsValue({
                          Teams: [...(form.getFieldValue("Teams") || []), {}],
                        })
                      }
                    >
                      Добавить
                    </AddText>
                    )
                  </Title>

                  <Form.List name="Teams">
                    {(fields, { remove }) =>
                      fields.map(({ key, name, ...field }, i) => {
                        return (
                          <Career key={key}>
                            <div>
                              <Form.Item
                                name={[name, "SortOrder"]}
                                label={t("Сортировка") + " *"}
                                rules={[{ validator: required }]}
                                style={{ width: 90 }}
                              >
                                <InputNumber min={1} />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                name={[name, "Position", lang]}
                                label={t("allPages.position") + " *"}
                                rules={[{ validator: required }]}
                                style={{ width: 264 }}
                              >
                                <Input />
                              </Form.Item>
                            </div>

                            <div>
                              <Form.Item
                                {...field}
                                name={[name, "TeamId"]}
                                label={t("allPages.form.teamBinding") + " *"}
                                rules={[{ validator: required }]}
                                style={{ width: 324 }}
                              >
                                <SelectField options={teamsOptions.Academy} />
                              </Form.Item>

                              <ActionBlock>
                                <Tooltip title={t("allPages.add")}>
                                  <Button icon={<MinusOutlined />} onClick={() => remove(i)} />
                                </Tooltip>
                              </ActionBlock>
                            </div>
                          </Career>
                        );
                      })
                    }
                  </Form.List>
                </>
              )
            }
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const Career = styled.div`
  display: grid;
  grid: auto / 1fr;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const ActionBlock = styled.div`
  min-width: 32px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

const AddText = styled.span`
  color: ${theme.colors.red1};
  font-weight: 600;
  cursor: pointer;
`;
