import { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import styled from "styled-components";
import type { Moment } from "moment/moment";
import { range } from "lodash";
import { getFormatedDate } from "../getFormatedDate";
import { formsConstantsValidation } from "../../constants/formsConstantsValidation";

interface IProps {
  type: string;
  text: string;
  entity: any;
  isAccess: boolean;
  updateEndPublicationDate?: Function;
  updateBeginningPublicationDate?: Function;
}

export const PublishDataStory = ({ text, type, entity, isAccess, updateEndPublicationDate, updateBeginningPublicationDate }: IProps) => {
  const [isShowDateForm, setShowDateForm] = useState<boolean>(false);
  const dataPublish = moment(text);
  const [isToday, setIsToday] = useState<boolean>(false);

  useEffect(() => {
    setIsToday(dataPublish.date === moment(Date.now()).date);
  }, []);

  const changeShowDateForm = () => {
    if (isAccess) {
      setShowDateForm(!isShowDateForm);
    }
  };

  const changeEndDate = (date: Moment | null) => {
    if (date) {
      updateEndPublicationDate?.({ ...entity, endPublication: date.toISOString() });
    }
  };

  const changeBeginningDate = (date: Moment | null) => {
    if (date) {
      updateBeginningPublicationDate?.({ ...entity, beginningPublication: date.millisecond(451).toISOString() });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const disabledDate = (dateValue: Moment) => {
    // Can not select days before today and today
    return dateValue && dateValue < moment().add(-1, "day").endOf("day");
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const disabledTime = () => {
    const date = new Date();

    return {
      disabledHours: () => range(0, 24).splice(0, Number(date.getHours())),
      disabledMinutes: () => range(0, 60).splice(0, Number(date.getMinutes() + 1))
    };
  };

  return (
    (!isShowDateForm &&
      (entity.contentStatus === "Publish" || entity.contentStatus === "Published" ? (
        <ContainerTextIndefinitely isAccess={isAccess} onClick={changeShowDateForm}>
          {getFormatedDate(text, formsConstantsValidation.dateTimeFormat)}
        </ContainerTextIndefinitely>
      ) : (
        <ContainerText>-</ContainerText>
      ))) || (
      <DatePicker
        autoFocus={true}
        style={{ height: 22 }}
        onBlur={changeShowDateForm}
        defaultValue={dataPublish.isValid() ? dataPublish : undefined}
        showTime={{ format: formsConstantsValidation.timeFormat }}
        showNow={false}
        onChange={(e) => {
          if (type === "end") {
            changeEndDate(e);
          } else {
            changeBeginningDate(e);
          }
        }}
        onSelect={(e) => {
          setIsToday(e.date() === moment(Date.now()).date());
        }}
        disabledDate={disabledDate}
        disabledTime={isToday ? disabledTime : undefined}
        format={formsConstantsValidation.dateTimeFormat}
      />
    )
  );
};

const ContainerText = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
`;

const ContainerTextIndefinitely = styled(ContainerText)<{ isAccess: boolean }>`
  cursor: ${({ isAccess }) => (isAccess ? "pointer" : "auto")};
`;
