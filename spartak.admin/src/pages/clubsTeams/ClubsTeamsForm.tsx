import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, Form, Input, InputNumber, Modal, Switch, Tabs, Tag } from "antd";
import { theme } from "assets/theme/theme";
import { accessNames } from "common/constants/accessNames";
import { statusColors } from "common/constants/status";
import { getClubSection } from "common/constants/teams";
import { deepMerge } from "common/helpers/deepMerge";
import { haveAccess } from "common/helpers/haveAccess";
import { fullNameValidator } from "common/helpers/validators/fullNameValidator";
import { required } from "common/helpers/validators/required";
import { Team, TeamType } from "common/interfaces/teams";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { rightsSelector } from "store/auth/authSelectors";
import { clubsTemasActions } from "store/clubsTeams/clubsTeams";
import { draftClubsTeam, getClubsTeamById, publishClubsTeam } from "store/clubsTeams/clubsTeamsActionAsync";
import { clubsTeamSelector } from "store/clubsTeams/clubsTeamsSelectors";
import { noticeActions } from "store/notice/notice";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { ImageField } from "ui/ImageField";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { IMenu } from "ui/Sidebar/SidebarList";
import { UploadDesc } from "ui/UploadDesc";
import { requiredMinMax } from "../../common/helpers/validators/requiredMinMax";

const { confirm } = Modal;

export const ClubsTeamsForm = React.memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.endsWith("create");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [lang, setLang] = useState("Ru");
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<Team | undefined>();
  const dispatch = useAppDispatch();
  const team = useSelector(clubsTeamSelector);
  const rights = useSelector(rightsSelector);
  const section = getClubSection(rights);
  const canView = (access: IMenu["policy"]) => haveAccess(rights, access);

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
    console.log("form.getFieldsValue()", form.getFieldsValue());
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
      (draft ? draftClubsTeam : publishClubsTeam)(
        deepMerge<Team>(
          {
            ...values,
            Id: id,
            TeamType: TeamType.own,
            CityId: "8b1ded60-2979-4728-a0f6-eb69f43eb44a",
            CountryId: "cdb39311-ead8-470f-b3ab-c7b8f6d227d2",
          },
          form.getFieldsValue()
        )
      )
    )
      .unwrap()
      .then(() => {
        dispatch(
          noticeActions.add({
            message: t(`clubsTeams.${draft ? "successHide" : "successPublish"}`),
            closable: true,
          })
        );
        closeDrawer();
      });
  };

  const showConfirm = (draft?: boolean) => {
    confirm({
      title: <HeaderText>{t(`allPages.${draft ? "hideConfirmTitle" : "confirmTitle"}`)}</HeaderText>,
      icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
      content: t(`clubsTeams.${draft ? "hideConfirmText" : "confirmText"}`),
      okText: t("allPages.buttonsText.confirm"),
      cancelText: t("allPages.buttonsText.cancel"),
      onOk: () => submitForm(draft),
    });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getClubsTeamById(id)).unwrap().then(setValues);
    }

    return () => {
      dispatch(clubsTemasActions.resetTeam());
    };
  }, [id]);

  return (
    <Drawer
      title={<HeaderText>{isCreate ? t("clubsTeams.teamCreate") : t("clubsTeams.teamEdit")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer>
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
            onClick={() => (isCreate || team?.Status === "Draft" ? showConfirm : submitForm)()}
            type="primary"
            htmlType="submit"
          >
            {isCreate || team?.Status === "Draft" ? t("allPages.buttonsText.publish") : t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      <Tabs defaultActiveKey={lang} onChange={handleTabClick}>
        <Tabs.TabPane tab={t("allPages.ru")} key="Ru" />
        <Tabs.TabPane tab={t("allPages.en")} key="En" />
      </Tabs>

      {!isCreate && !team ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            DisplayTeamInfoOnTheSite: canView(accessNames.clubAcademy),
            ...team,
          }}
          validateTrigger="onBlur"
        >
          {team && (
            <Status>
              {t("allPages.status")}:{" "}
              <Tag color={statusColors[team?.Status || "None"]}>{t(`allPages.statuses.${team?.Status || "None"}`)}</Tag>
            </Status>
          )}

          <Form.Item name="SortOrder" label={t("allPages.form.sortOrder")} rules={[{ validator: required }]}>
            <InputNumber
              min={1}
              name="sortOrder"
              style={{ width: 145 }}
              placeholder={t("allPages.form.orderPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            name={["ShortName", lang]}
            label={t("clubsTeams.shortName") + " *"}
            rules={[{ validator: (_, value) => requiredMinMax(_, value, 1, 50) }]}
          >
            <Input name="clubsTeamShortName" placeholder={t("clubsTeams.namePlaceholder")} />
          </Form.Item>

          <Form.Item
            name={["FullName", lang]}
            label={t("clubsTeams.fullName") + " *"}
            rules={[{ validator: (_, value) => fullNameValidator(_, value) }]}
          >
            <Input name="clubsTeamFullName" placeholder={t("clubsTeams.namePlaceholder")} />
          </Form.Item>

          <Form.Item name="InStatId" label="InStat">
            <Input name="InStatId" placeholder={t("clubsTeams.teamId")} />
          </Form.Item>

          <FormItem
            required={true}
            rules={[{ validator: required }]}
            name="Section"
            label={t("media.section") + " *"}
            initialValue={section}
          >
            <SelectField
              disabled={!!section}
              options={[
                { value: "Academy", label: t("media.academy") },
                { value: "Site", label: t("media.site") },
              ]}
            />
          </FormItem>

          <StyledDivider />

          <UploadWrapper>
            <div>
              <Form.Item name="ImageUrl" label={t("clubsTeams.teamLogo") + " *"} rules={[{ validator: required }]}>
                <ImageField
                  validation={{
                    width: 220,
                    height: 220,
                    size: 2048,
                    format: ["png", "jpeg"],
                    exact: true,
                  }}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "220",
                  height: "220",
                  size: "2",
                  format: "jpeg, png",
                })}
              </UploadDesc>
            </div>

            <div>
              <Form.Item name="TeamImageUrl" label={t("clubsTeams.teamImage") + " *"} rules={[{ validator: required }]}>
                <ImageField
                  validation={{
                    width: 1920,
                    height: 600,
                    size: 6144,
                    format: ["png", "jpeg"],
                    exact: true,
                  }}
                />
              </Form.Item>

              <UploadDesc>
                {t("allPages.form.uploadDesc", {
                  width: "1920",
                  height: "600",
                  size: "6",
                  format: "jpeg, png",
                })}
              </UploadDesc>
            </div>
          </UploadWrapper>

          <Divider />

          {/* {canView(accessNames.clubSite) && ( */}
          <SwitchBlock
            style={{
              display: canView([accessNames.clubSite, accessNames.clubAcademy]) ? "block" : "none",
            }}
          >
            <FormItem
              name="DisplayMatchesOnTheSite"
              valuePropName="checked"
              label={t("clubsTeams.switches.previewMatches")}
            >
              <Switch />
            </FormItem>
            <FormItem
              name="DisplayTeamInfoOnTheSite"
              valuePropName="checked"
              label={t("clubsTeams.switches.previewTeamInfo")}
            >
              <Switch />
            </FormItem>
            <FormItem
              name="DisplayTeamInTheMedia"
              valuePropName="checked"
              label={t("clubsTeams.switches.previewInMedia")}
            >
              <Switch />
            </FormItem>
          </SwitchBlock>
          {/* )} */}
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Status = styled.div`
  margin-bottom: 8px;

  & > *:last-child {
    margin-left: 8px;
  }
`;

const StyledDivider = styled(Divider)`
  margin-top: 0;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

const SwitchBlock = styled.div`
  display: flex;
  flex-direction: column;
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
  .ant-row {
    width: inherit;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const UploadWrapper = styled.div`
  display: flex;
`;
