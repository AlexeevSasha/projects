import { useState } from "react";
import { Button, DatePicker } from "antd";
import styled from "styled-components";
import type { Moment } from "moment/moment";
import { range } from "lodash";
import { dateControl } from "../../../../common/helpers/dateControl";
import { getFullFormatedDate } from "../../../../common/helpers/getFormatedDate";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import moment from "moment/moment";

interface IProps {
  text: string;
  entity: any;
  isAccess: boolean;
  updatePublishDataCurrentStoryWithToken: Function;
}

export const PublishDataStory = ({ text, entity, isAccess, updatePublishDataCurrentStoryWithToken }: IProps) => {
  const { t } = useTranslation();
  const [isShowDateForm, setShowDateForm] = useState<boolean>(false);
  const dataPublish = moment(text);
  const changeShowDateForm = () => {
    if (isAccess) {
      setShowDateForm(!isShowDateForm);
    }
  };

  const changeDate = (date: Moment | null) => {
    if (date) {
      updatePublishDataCurrentStoryWithToken({ ...entity, publishBefore: date.toISOString() });
    }
  };

  const indefinitely = (date: any) => {
    if (date) {
      updatePublishDataCurrentStoryWithToken({ ...entity, publishBefore: "" });
      changeShowDateForm();
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
          {dateControl(entity?.publishBefore) ? t("marketing.indefinitely") : getFullFormatedDate(text)}
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
        onChange={(e) => changeDate(e)}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        format={formsConstantsValidation.dateTimeFormat}
        renderExtraFooter={() => {
          return (
            <IndefButton type="link" onClick={(date) => indefinitely(date)}>
              {t("marketing.indefinitely")}
            </IndefButton>
          );
        }}
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

const IndefButton = styled(Button)`
  padding: 0;
`;
