import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, InputNumber, Typography } from "antd";
import { theme } from "assets/theme/theme";
import {
  commandFieldTypes,
  halfFieldTypes,
  halfs,
  halfsMinuteObj,
  minuteFieldTypes,
  otherPlayerFieldTypes,
  playerFieldTypes,
  sendPushTypes,
} from "common/constants/matches";
import { deepMerge } from "common/helpers/deepMerge";
import { EventType, Match, MatchEvent } from "common/interfaces/matches";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { required } from "../../common/helpers/validators/required";
import { validationComment, validationCommentRequired } from "../../common/helpers/validators/validationComment";
import { noticeActions } from "../../store/notice/notice";
import { useAppDispatch } from "../../store";
import { noticeSelector } from "../../store/notice/noticeSelector";
import { lineUpSelector } from "../../store/match/matchsSelectors";

const { Text } = Typography;

type Props = {
  event: MatchEvent;
  ownEvent?: MatchEvent;
  onRemove: (event: MatchEvent) => void;
  onSave: (event: MatchEvent) => void;
  setEvents: Function;
  match?: Match;
};

export const EventForm = ({ event, onRemove, onSave, ownEvent, setEvents, match }: Props) => {
  useEffect(() => {
    form.resetFields();
  }, [event]);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [form] = Form.useForm<MatchEvent>();
  const [isForm, setIsForm] = useState(!event.Id);
  const [isCommentForm, setIsCommentForm] = useState(!event.Id);
  const [team, setTeam] = useState<string | undefined>(event.TeamId);
  const notice = useSelector(noticeSelector);

  const teamOptions = useMemo(
    () =>
      (match?.MatchInfoStat?.length ? match?.MatchInfoStat : [match?.infoHome, match?.infoGuest])?.map((info) => ({
        value: info?.Team?.Id,
        label: info?.Team?.Name?.Ru,
      })),
    [match]
  );

  const playerList = useSelector(lineUpSelector)?.Teams?.find((elem) => (team ? elem.Id === team : elem))?.Players;
  const coachList = useSelector(lineUpSelector)?.Teams?.find((elem) => (team ? elem.Id === team : elem))?.Coach;

  const coachOptions = useMemo(() => {
    return coachList ? [{ value: coachList.Id, label: coachList.FullName.Ru }] : [];
  }, [coachList]);

  const playerOptions = useMemo(() => {
    return (
      playerList?.map?.((player) => ({
        value: player.Id,
        label: player.Name.Ru,
      })) || []
    );
  }, [playerList]);

  const showHalfField = halfFieldTypes.includes(event.Type);
  const showMinuteField = minuteFieldTypes.includes(event.Type) || event.Type === EventType.penaltyShootoutStart;
  const showCommandField = commandFieldTypes.includes(event.Type);
  const showPlayerField = playerFieldTypes.includes(event.Type);
  const showOtherPlayerField = otherPlayerFieldTypes.includes(event.Type);
  const showSendPush = sendPushTypes.includes(event.Type);
  const showAddedTimeField = event.Type === EventType.timeAddStart;
  const isReplace = event.Type === EventType.replace;

  const halfsOptions = useMemo(
    () =>
      Object.entries(
        event.Type === EventType.matchEnd
          ? halfs
          : {
              ...halfs,
              1: "halfOne",
              3: "firstOvertime",
            }
      ).map(([value, label]) => ({
        label: t(`matches.halfs.${label}`),
        value: +value,
      })),
    [EventType]
  );

  const handleCancel = () => {
    if (event.Id) {
      setIsForm(false);
      setIsCommentForm(false);
      form.resetFields();
      setTeam(undefined);
      setEvents((prev: MatchEvent[]) =>
        prev.map((elem) => (elem.Id === ownEvent?.Id ? { ...elem, Comment: ownEvent.Comment } : elem))
      );
    } else {
      onRemove(event);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((val) => {
      if (val.PlayerId && val.PlayerId === val.OtherPlayerId) {
        !notice.length &&
          dispatch(
            noticeActions.add({
              message: t("validations.sameMatchTeamsEventsLineUp"),
              type: "error",
            })
          );
      } else {
        onSave(
          deepMerge(
            event,
            event.Type === EventType.timeAddStart
              ? {
                  ...form.getFieldsValue(),
                  Minute: halfsMinuteObj[form.getFieldValue("Half")],
                  CoachStaffId: [coachList].find((elem) => form.getFieldsValue().PlayerId === elem?.Id)?.Id,
                  PlayerId: playerList?.find((elem) => form.getFieldsValue().PlayerId === elem?.Id)?.Id,
                }
              : {
                  ...form.getFieldsValue(),
                  CoachStaffId: [coachList].find((elem) => form.getFieldsValue().PlayerId === elem?.Id)?.Id,
                  PlayerId: playerList?.find((elem) => form.getFieldsValue().PlayerId === elem?.Id)?.Id,
                }
          )
        );
        setIsForm(false);
        setIsCommentForm(false);
      }
    });
  };

  const handleChangeTeam = (value: string) => {
    setTeam(value);
    form.setFieldsValue({ PlayerId: undefined, OtherPlayerId: undefined });
  };

  const findPenaltyShootoutStartTypeMinutes =
    event.Type === EventType.penaltyShootoutStart && (event.Minute < 120 ? 2 : 4);

  return (
    <Form form={form} requiredMark={false} labelAlign="left" initialValues={{ ...event, NeedSendPush: true }}>
      {isForm || JSON.stringify(ownEvent?.Comment) !== JSON.stringify(event.Comment) ? (
        <>
          <Row>
            <DeleteBtn>
              <Delete color={theme.colors.middleGray} onClick={() => onRemove(event)} />

              <span style={{ marginTop: "5px" }}>{t(`matches.events.${event.Type}`)}</span>
            </DeleteBtn>

            <FieldsContainer>
              <SaveEvent>
                <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                <BtnContainer>
                  <Button type="primary" onClick={handleSubmit}>
                    {t("allPages.buttonsText.save")}
                  </Button>

                  <Button onClick={handleCancel}>{t("allPages.buttonsText.cancel")}</Button>
                </BtnContainer>
              </SaveEvent>

              <EventFields>
                {showHalfField && (
                  <Form.Item rules={[{ validator: required }]} name="Half" label={t("matches.half")}>
                    <SelectField options={halfsOptions} style={{ width: 120 }} />
                  </Form.Item>
                )}

                {showMinuteField && (
                  <Form.Item rules={[{ validator: required }]} name="Minute" label={t("matches.minute")}>
                    <InputNumber style={{ width: 120 }} min={0} />
                  </Form.Item>
                )}

                {showAddedTimeField && (
                  <Form.Item rules={[{ validator: required }]} name="AddedTime" label={t("matches.additionalTime")}>
                    <InputNumber style={{ width: 120 }} />
                  </Form.Item>
                )}
              </EventFields>

              <EventFields>
                {showCommandField && (
                  <Form.Item rules={[{ validator: required }]} name="TeamId" label={t("matches.team")}>
                    <SelectField options={teamOptions || []} onChange={handleChangeTeam} style={{ width: 256 }} />
                  </Form.Item>
                )}

                {showPlayerField && (
                  <Form.Item
                    rules={[{ validator: required }]}
                    name="PlayerId"
                    label={t(`matches.${isReplace ? "playerLeft" : "player"}`)}
                  >
                    <SelectField
                      disabled={!form.getFieldValue("TeamId")}
                      options={
                        event?.Type === EventType.yellowCard ||
                        event?.Type === EventType.secondYellowCard ||
                        event?.Type === EventType.redCard
                          ? [...playerOptions, ...coachOptions]
                          : playerOptions || []
                      }
                      style={{ width: 256 }}
                    />
                  </Form.Item>
                )}

                {showOtherPlayerField && (
                  <Form.Item name="OtherPlayerId" label={t(`matches.${isReplace ? "playerIn" : "assistant"}`)}>
                    <SelectField
                      disabled={!form.getFieldValue("TeamId")}
                      options={playerOptions || []}
                      style={{ width: 256 }}
                    />
                  </Form.Item>
                )}
              </EventFields>

              <Form.Item
                name={["Comment", "Ru"]}
                rules={[{ validator: validationCommentRequired }]}
                label={t("matches.comment", { lang: "РУ" }) + " *"}
              >
                <Input.TextArea style={{ width: 800 }} rows={1} />
              </Form.Item>
              <Text type={"secondary"}>{t("allPages.form.upToCharacters")}</Text>

              <Form.Item
                name={["Comment", "En"]}
                rules={[{ validator: validationComment }]}
                label={t("matches.comment", { lang: "EN" })}
              >
                <Input.TextArea style={{ width: 800 }} rows={1} />
              </Form.Item>
              <Text type={"secondary"}>{t("allPages.form.upToCharacters")}</Text>
              {showSendPush && isCommentForm && (
                <Form.Item
                  name="NeedSendPush"
                  valuePropName="checked"
                  style={{
                    flexDirection: "row-reverse",
                    gap: "8px",
                    paddingTop: "16px",
                  }}
                >
                  <Checkbox defaultChecked>{t("allPages.form.sendPush")} </Checkbox>
                </Form.Item>
              )}
            </FieldsContainer>
          </Row>
        </>
      ) : (
        <Row>
          <EventLeft>
            <Text strong>
              {event.Minute < halfsMinuteObj[findPenaltyShootoutStartTypeMinutes || event.Half]
                ? event.Minute
                : halfsMinuteObj[findPenaltyShootoutStartTypeMinutes || event.Half]}
              '
              {event.AddedTime
                ? `+${event.AddedTime}`
                : event.Minute - halfsMinuteObj[findPenaltyShootoutStartTypeMinutes || event.Half] > 0
                ? `+${event.Minute - halfsMinuteObj[findPenaltyShootoutStartTypeMinutes || event.Half]}`
                : ""}
            </Text>
            <Img src={`/images/matchEvents/${event.Type}.svg`} />
          </EventLeft>

          <EventRight>
            <Text strong>{event.Description?.Ru}</Text>

            <Text style={{ margin: "16px 0" }}>{event.Comment?.Ru}</Text>

            {isCommentForm ? (
              <>
                <SaveEvent>
                  <RowLabel label={t("matches.saveChanges")} prompt={t("matches.unsavedChanges")} />

                  <BtnContainer>
                    <Button type="primary" onClick={handleSubmit}>
                      {t("allPages.buttonsText.save")}
                    </Button>

                    <Button onClick={handleCancel}>{t("allPages.buttonsText.cancel")}</Button>
                  </BtnContainer>
                </SaveEvent>
                <Form.Item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "16px",
                  }}
                  name={["Comment", "Ru"]}
                  rules={[{ validator: validationCommentRequired }]}
                  label={t("matches.comment", { lang: "RU" }) + " *"}
                >
                  <Input.TextArea style={{ width: 432 }} rows={1} />
                </Form.Item>
                <Text type={"secondary"}>{t("allPages.form.upToCharacters")}</Text>
                <Form.Item
                  style={{ display: "flex", flexDirection: "column" }}
                  name={["Comment", "En"]}
                  rules={[{ validator: validationComment }]}
                  label={t("matches.comment", { lang: "EN" })}
                >
                  <Input.TextArea style={{ width: 432 }} rows={1} />
                </Form.Item>
                <Text type={"secondary"}>{t("allPages.form.upToCharacters")}</Text>
              </>
            ) : (
              <Text
                type="danger"
                onClick={() =>
                  event.Type !== EventType.textTranslation && match?.MatchType === "InStat"
                    ? setIsCommentForm(true)
                    : setIsForm(true)
                }
                style={{ cursor: "pointer" }}
              >
                <EditOutlined /> {t("allPages.change")}
              </Text>
            )}
          </EventRight>
        </Row>
      )}
    </Form>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1050px;
`;

const DeleteBtn = styled.div`
  width: 100%;
  display: flex;
`;

const BtnContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`;

const SaveEvent = styled.div`
  display: flex;
  grid-gap: 40px;
`;

const FieldsContainer = styled.div`
  width: 100%;

  & > * {
    margin-bottom: 16px;
  }
`;

const EventFields = styled.div`
  display: flex;
  grid-gap: 16px;

  #root & > div.ant-row.ant-form-item {
    flex-flow: column;
  }

  #root & .ant-form-item-label > label::after {
    display: none;
  }
`;

const EventLeft = styled.div`
  width: 230px;
  display: flex;

  & > *:first-child {
    width: 80px;
  }
`;

const Img = styled.img`
  height: 24px;
  width: 24px;
`;

const EventRight = styled.div`
  width: 1050px;
  display: flex;
  flex-flow: column;
`;
