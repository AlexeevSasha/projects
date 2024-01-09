import { Button, DatePicker, Drawer, Form, Select } from "antd";
import i18n from "i18next";
import moment, { Moment } from "moment";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { matchingActions } from "store/matching/matching";
import styled from "styled-components";
import { HeaderText } from "ui/HeaderText";
import { Loader } from "ui/Loader";
import { SelectField } from "ui/SelectField";
import { theme } from "../../assets/theme/theme";
import { MatchingFiltersType, MatchingItem } from "../../common/interfaces/matching";
import {
  getMatchingById,
  getMatchingEvents,
  getMatchingListByFilter,
  getMatchingWinlineCoefficient,
  updateMatching,
} from "../../store/matching/matchingActionAsync";
import {
  matchingCoefficientsSelector,
  matchingEventsSelector,
  matchingSelector,
} from "../../store/matching/matchingSelector";
import { noticeActions } from "../../store/notice/notice";

export const MatchingForm = memo(({ filters }: { filters: MatchingFiltersType }) => {
  const locale = i18n.language === "ru" ? "Ru" : "En";
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<MatchingItem>();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch();
  const matching = useSelector(matchingSelector);
  const ticketOptions = useSelector(matchingEventsSelector)?.map((elem) => ({
    label: elem.FullName[locale],
    value: elem.Id,
    ExternalTicketId: elem.CrmEventId,
  }));
  const winlineOptions = useSelector(matchingCoefficientsSelector)?.map((elem) => ({
    label: elem.Name,
    value: elem.Id,
  }));

  const closeDrawer = () => {
    form.resetFields();
    setVisible(false);
    setTimeout(() => navigate(-1), 150);
  };

  const submitForm = async () => {
    if (id) {
      dispatch(
        updateMatching({
          MatchId: id,
          ExternalTicketId: ticketOptions?.find((elem) => form.getFieldValue("EventId") === elem.ExternalTicketId)
            ?.ExternalTicketId,
          ...form.getFieldsValue(["EventId", "WinlineId", "MatchStartDateTime"]),
        })
      )
        .unwrap()
        .then(() => {
          closeDrawer();
          dispatch(getMatchingListByFilter(filters));
          dispatch(noticeActions.add({ message: "Изменения сохранены" }));
        });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getMatchingById(id))
        .unwrap()
        .then((val) => {
          dispatch(getMatchingWinlineCoefficient(val.MatchStartDateTime));
          dispatch(getMatchingEvents(val.MatchStartDateTime));
        });
    }

    return () => {
      dispatch(matchingActions.resetMatching());
      dispatch(matchingActions.resetCoefficients());
    };
  }, [id]);

  const getTeamFunc = useCallback(
    (teamType: "OwnTeam" | "OppositeTeam") => {
      const findingTeam = matching?.MatchInfoStat.find((elem) => elem.Team?.Type === teamType)?.Team;

      return { label: findingTeam?.Name?.[locale], value: findingTeam?.Id };
    },
    [matching, locale]
  );

  return (
    <Drawer
      title={<HeaderText>{t("matching.editTitle")}</HeaderText>}
      closable={false}
      destroyOnClose={true}
      getContainer={false}
      onClose={closeDrawer}
      visible={visible}
      width="440px"
      bodyStyle={{ padding: "0 30px 130px" }}
      footer={
        <Footer>
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            {t("allPages.buttonsText.cancel")}
          </Button>

          <Button onClick={submitForm} type="primary" htmlType="submit">
            {t("allPages.buttonsText.save")}
          </Button>
        </Footer>
      }
    >
      {!matching ? (
        <Loader />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            ...matching,
            OwnTeam: getTeamFunc("OwnTeam"),
            OppositeTeam: getTeamFunc("OppositeTeam"),
          }}
          validateTrigger="onBlur"
        >
          <Form.Item style={{ marginTop: "18px" }} required={true} name="OwnTeam" label={t("matching.ownTeam")}>
            <Select options={[]} disabled={true} showArrow={false} />
          </Form.Item>

          <Form.Item required={true} name="OppositeTeam" label={t("matching.oppositeTeam")}>
            <Select options={[]} disabled={true} showArrow={false} />
          </Form.Item>

          <Form.Item
            name="MatchStartDateTime"
            label={t("allPages.dateTime")}
            getValueFromEvent={(date: Moment) => date.zone(-180).toISOString()}
            getValueProps={(date) => ({ value: date ? moment(date).zone(-180) : undefined })}
            required={true}
          >
            <DatePicker style={{ width: "100%" }} showTime suffixIcon={null} />
          </Form.Item>

          <Form.Item required={true} name="WinlineId" label={t("matching.winline")}>
            <SelectField
              allowClear
              options={winlineOptions || []}
              onClear={() => form.setFieldsValue({ ...form.getFieldsValue, EventId: undefined })}
              placeholder={t("allPages.choose")}
              dropdownRender={(menu) =>
                winlineOptions?.length ? menu : <CustomEmpty>Доступных матчей нет</CustomEmpty>
              }
            />
          </Form.Item>

          <Form.Item required={true} name="EventId" label={t("matching.ticket")}>
            <SelectField
              allowClear
              options={ticketOptions || []}
              placeholder={t("allPages.notChosen")}
              dropdownRender={(menu) =>
                ticketOptions?.length ? menu : <CustomEmpty>Доступных матчей нет</CustomEmpty>
              }
            />
          </Form.Item>
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

const CustomEmpty = styled.div`
  height: 40px;
  padding: 9px 12px;
  color: ${theme.colors.black};
  font-size: 14px;
`;
