import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, DatePicker, Drawer, Form, Modal } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { theme } from "assets/theme/theme";
import { newDate } from "common/helpers/newDate";
import { required } from "common/helpers/validators/required";
import { viewDate } from "common/helpers/viewDate";
import { VotingEntity } from "common/interfaces/bestPlayer";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { bestPlayerActions } from "store/bestPlayer/bestPlayer";
import {
  getBestPlayer,
  getMainTeamPlayers,
  getSeasonForMvp,
  getVotingMatches,
  saveVoting,
} from "store/bestPlayer/bestPlayerActionAsync";
import {
  bestPlayerSelector,
  mainTeamPlayersSelector,
  seasonsSelector,
  votingMatchesSelector,
} from "store/bestPlayer/bestPlayerSelectors";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { noticeActions } from "../../store/notice/notice";

export const BestPlayerForm = memo(() => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const [form] = Form.useForm<VotingEntity>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "ru" ? "Ru" : "En";
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const promo = useSelector(bestPlayerSelector);
  const promoType = isCreate
    ? pathname.split("/").slice(-1)[0]
    : promo?.Month
    ? "month"
    : promo?.Match
    ? "match"
    : "season";
  const players = useSelector(mainTeamPlayersSelector);
  const matches = useSelector(votingMatchesSelector);
  const seasons = useSelector(seasonsSelector);

  const matchesOptions = useMemo(
    () =>
      isCreate
        ? matches.map(({ Id, Name, MatchStartDateTime }) => ({
            value: Id,
            label: `${Name[lang]} - ${moment(viewDate(MatchStartDateTime)).format("YYYY/MM/DD")}`,
            MatchStartDateTime,
          }))
        : // .sort((a, b) => +new Date(b.MatchStartDateTime) - +new Date(a.MatchStartDateTime))
          [{ value: promo?.Match?.Id, label: promo?.Match?.Name[lang] }],
    [matches, promo]
  );

  const seasonOptions = useMemo(
    () =>
      isCreate
        ? seasons.map(({ Id, Name }) => ({ value: Id, label: Name[lang] }))
        : // .sort((a, b) => +new Date(b.MatchStartDateTime) - +new Date(a.MatchStartDateTime))
          [{ value: promo?.SeasonId, label: promo?.SeasonName }],
    [matches, promo]
  );

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        title: <HeaderText>{t(`bestPlayer.saveChanges`)}</HeaderText>,
        icon: <QuestionCircleOutlined style={{ color: theme.colors.red1 }} />,
        content: t(`bestPlayer.closeConfirmText`),
        okText: t("allPages.buttonsText.save"),
        cancelText: t("allPages.buttonsText.cancel"),
        onOk: () => submitForm(),
        onCancel: () => closeDrawer(),
      });
    } else {
      closeDrawer();
    }
  };

  const submitForm = async () => {
    if (
      !(await form
        .validateFields()
        .then(() => true)
        .catch(() => false))
    ) {
      dispatch(noticeActions.add({ message: t("bestPlayer.formError"), type: "error" }));

      return;
    }

    dispatch(saveVoting({ ...promo, ...form.getFieldsValue() }))
      .unwrap()
      .then(() => {
        dispatch(noticeActions.add({ message: t(`bestPlayer.successPublish`) }));
        closeDrawer();
      });
  };

  useEffect(() => {
    if (!isCreate && id) {
      dispatch(getBestPlayer(id));
    }
    if (!players.length) {
      dispatch(getMainTeamPlayers());
    }
    if (!matches.length) {
      dispatch(getVotingMatches());
    }
    if (!seasons.length) {
      dispatch(getSeasonForMvp());
    }

    return () => {
      dispatch(bestPlayerActions.resetEntity());
    };
  }, [id]);

  return (
    <Drawer
      title={
        <HeaderText>{`${isCreate ? t("allPages.buttonsText.create") : t("allPages.buttonsText.edit")} - ${t(
          "bestPlayer." + promoType + "Player"
        )}`}</HeaderText>
      }
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={handleCancel}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px" }}
      footer={
        <Footer>
          <div>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              {t("allPages.buttonsText.cancel")}
            </Button>

            <Button onClick={submitForm} type="primary" htmlType="submit">
              {t("allPages.buttonsText.save")}
            </Button>
          </div>
        </Footer>
      }
    >
      {!isCreate && !promo ? (
        <Loader />
      ) : (
        <Form form={form} layout="vertical" requiredMark={false} initialValues={promo} validateTrigger="onBlur">
          <FormItem
            name="StartVoting"
            label={t("bestPlayer.startDate")}
            rules={[{ validator: required }]}
            getValueFromEvent={(date) => (date ? newDate(date).toISOString() : undefined)}
            getValueProps={(date) => ({ value: date ? moment(viewDate(date)) : undefined })}
          >
            <DatePicker
              format="YYYY/MM/DD HH:mm"
              showTime
              placeholder={t("bestPlayer.datePlaceholder")}
              disabledDate={(date) => moment(date) < moment(new Date().toISOString().split("T")[0])}
              disabled={!isCreate}
            />
          </FormItem>

          <FormItem
            name="EndVoting"
            label={t("bestPlayer.endDate")}
            rules={[{ validator: required }]}
            getValueFromEvent={(date) => (date ? newDate(date).toISOString() : undefined)}
            getValueProps={(date) => ({ value: date ? moment(viewDate(date)) : undefined })}
          >
            <DatePicker
              format="YYYY/MM/DD HH:mm"
              showTime
              placeholder={t("bestPlayer.datePlaceholder")}
              disabledDate={(date) => moment(date) < moment(form.getFieldValue("StartVoting"))}
            />
          </FormItem>

          {promoType === "match" && (
            <FormItem name="MatchId" label={t("bestPlayer.match")} rules={[{ validator: required }]}>
              <SelectField placeholder={t("bestPlayer.select")} options={matchesOptions} disabled={!isCreate} />
            </FormItem>
          )}

          {promoType === "month" && (
            <ItemGroup>
              <FormItem
                name="Month"
                label={t("bestPlayer.month")}
                rules={[{ validator: required }]}
                getValueFromEvent={(date) => (date ? newDate(date).toISOString().split("T")[0] : undefined)}
                getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
              >
                <DatePicker
                  placeholder={t("bestPlayer.select")}
                  picker="month"
                  locale={locale}
                  format="MMMM"
                  disabled={!isCreate}
                />
              </FormItem>

              <FormItem
                name="Month"
                label={t("bestPlayer.year")}
                rules={[{ validator: required }]}
                getValueFromEvent={(date) => (date ? newDate(date).toISOString().split("T")[0] : undefined)}
                getValueProps={(date) => ({ value: date ? moment(date) : undefined })}
              >
                <DatePicker placeholder={t("bestPlayer.select")} picker="year" locale={locale} disabled={!isCreate} />
              </FormItem>
            </ItemGroup>
          )}
          {promoType === "season" && (
            <FormItem name="SeasonId" label={t("bestPlayer.season")} rules={[{ validator: required }]}>
              <SelectField placeholder={t("bestPlayer.select")} options={seasonOptions} disabled={!isCreate} />
            </FormItem>
          )}

          <FormItem
            name="PlayerIds"
            label={
              <GroupLabel>
                {t("bestPlayer.playersList")}:{" "}
                <span
                  onClick={() =>
                    form.setFieldsValue({ ...form.getFieldsValue(), PlayerIds: players.map(({ Id }) => Id) })
                  }
                >
                  {t("bestPlayer.selectAll")}
                </span>{" "}
                <span onClick={() => form.setFieldsValue({ ...form.getFieldsValue(), PlayerIds: [] })}>
                  {t("bestPlayer.unselectAll")}
                </span>
              </GroupLabel>
            }
          >
            <CheckboxGroup>
              {players.map(({ Id, FullName }) => (
                <Checkbox key={Id} value={Id}>
                  {FullName[lang]}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </FormItem>
        </Form>
      )}
    </Drawer>
  );
});

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
`;

const ItemGroup = styled.div`
  display: flex;
  & > *:first-child {
    flex: 1;
  }

  & > *:last-child {
    width: 121px;
    margin-left: 8px;
  }
`;

const FormItem = styled(Form.Item)`
  .ant-picker {
    width: 100%;
  }
`;

const GroupLabel = styled.div`
  font-weight: 700;

  & > span {
    color: ${theme.colors.red1};
    text-decoration: underline;
    cursor: pointer;
    font-weight: 400;
  }
`;

const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-flow: column;
  margin-top: 8px;

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin: 8px 0 0;
  }
`;
