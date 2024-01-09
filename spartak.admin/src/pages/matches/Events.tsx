import { Button, Divider } from "antd";
import { gameEvents, tempEvents, withDefaultTimeObjects } from "common/constants/matches";
import { EventType, Match, MatchEvent } from "common/interfaces/matches";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { deleteMatchEvents, getMatchEvents, saveMatchEvents } from "store/match/matchActionAsync";
import styled from "styled-components";
import { RowLabel } from "ui/RowLabel";
import { SelectField } from "ui/SelectField";
import { EventForm } from "./EventForm";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { noticeActions } from "../../store/notice/notice";
import { Loader } from "../../ui/Loader";
import { useSelector } from "react-redux";
import { noticeSelector } from "../../store/notice/noticeSelector";

interface IProps {
  match?: Match;
  isLoading: boolean;
}

export const Events = ({ match, isLoading }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();
  const isCreate = pathname.includes("create");
  const [ownEvents, setOwnEvents] = useState<MatchEvent[]>([]);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const notice = useSelector(noticeSelector);

  const tempEventOptions = useMemo(
    () =>
      tempEvents.map((value) => ({
        label: t(`matches.events.${value}`),
        value,
      })),
    []
  );
  const gameEventOptions = useMemo(
    () =>
      gameEvents.map((value) => ({
        label: t(`matches.events.${value}`),
        value,
      })),
    []
  );

  const handleAdd = (Type: EventType) => {
    if (
      isCreate ||
      !((match?.infoGuest?.Team && match?.infoHome?.Team) || match?.MatchInfoStat?.every((elem) => elem.Team?.Id))
    ) {
      !notice.length &&
        dispatch(
          noticeActions.add({
            message: t("validations.fillMatchFieldsMessage"),
            type: "error",
          })
        );
    } else {
      setEvents([
        {
          Type,
          ...withDefaultTimeObjects[Type],
          key: (+new Date()).toString(),
          MatchId: id,
        } as MatchEvent,
        ...events,
      ]);
    }
  };

  const handleAddTextTranslation = () => {
    setEvents([
      {
        Type: EventType.textTranslation,
        key: (+new Date()).toString(),
        MatchId: id,
      } as MatchEvent,
      ...events,
    ]);
  };

  const handleRemove = (event: MatchEvent) => {
    !event.Id && setEvents(events.filter(({ key }) => key !== event.key));
    event.Id &&
      dispatch(deleteMatchEvents(event.Id))
        .unwrap()
        .then(() => setEvents(events.filter(({ key }) => key !== event.key)));
  };

  const handleSave = (event: MatchEvent) => {
    if (id) {
      dispatch(saveMatchEvents(event))
        .unwrap()
        .then((res) => {
          const changedEvents = (own: boolean) =>
            events.map((item) =>
              item.key === event.key
                ? {
                    ...res,
                    OtherPlayerId: res.OtherPlayer?.Id,
                    PlayerId: res.Player?.Id,
                    TeamId: res.Team?.Id,
                    key: res.Id,
                  }
                : own
                ? {
                    ...item,
                    Comment: ownEvents.find((elem) => elem.Id === item.Id)?.Comment || item.Comment,
                  }
                : item
            );
          setEvents(changedEvents(false));
          setOwnEvents(changedEvents(true));
        });
    } else {
      dispatch(
        noticeActions.add({
          message: t("validations.fillMatchFieldsMessage"),
          type: "error",
        })
      );
    }
  };

  const updateMatchEvents = () => {
    id &&
      dispatch(getMatchEvents(id))
        .unwrap()
        .then((res) => {
          setEvents(res);
          setOwnEvents(res);
        });
  };

  useEffect(() => {
    updateMatchEvents();
  }, [id]);

  const memoEvents = useMemo(
    () =>
      events.map((event) => (
        <EventForm
          key={event.key}
          ownEvent={ownEvents.find((elem) => elem.Id === event.Id)}
          setEvents={setEvents}
          event={event}
          match={match}
          onSave={handleSave}
          onRemove={handleRemove}
        />
      )),
    [ownEvents, events, match]
  );

  return (
    <>
      {match || isCreate ? (
        match?.MatchType === "InStat" ? (
          <Row style={{ gap: "8px", marginTop: isLoading ? 0 : "-40px" }}>
            <Button type={"primary"} icon={<PlusOutlined />} onClick={handleAddTextTranslation}>
              {t("matches.events.TextTranslation")}
            </Button>

            <Button icon={<ReloadOutlined />} onClick={updateMatchEvents}>
              {t("allPages.update")}
            </Button>
          </Row>
        ) : (
          <>
            <Row style={{ marginTop: isLoading ? "40px" : 0 }}>
              <RowLabel label={t("matches.broadcast")} />
            </Row>

            <Row>
              <SelectField
                value={t("matches.addTempEvent")}
                options={tempEventOptions}
                onChange={handleAdd}
                style={{ width: 256 }}
              />

              <SelectField
                value={t("matches.addGameEvent")}
                options={gameEventOptions}
                onChange={handleAdd}
                style={{ width: 256 }}
              />
            </Row>
          </>
        )
      ) : (
        <Loader />
      )}

      {memoEvents}

      {!isLoading && <Divider style={{ marginBottom: 40 }} />}
    </>
  );
};

const Row = styled.div`
  display: flex;
  grid-gap: 40px;
  margin-bottom: 40px;
  width: 1024px;
`;
