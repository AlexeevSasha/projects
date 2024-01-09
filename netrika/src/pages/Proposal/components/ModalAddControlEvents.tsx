import React, { useCallback, useState } from "react";
import { Input } from "common/ui/Input/Input";
import { IOrderControlEvent } from "../../../common/interfaces/order/IOrderControlEvent";
import { useSelector } from "react-redux";
import { proposalControlEventsSelector } from "../../../module/proposalControlEvents/proposalControlEventsSelector";
import { IOrderControlEventListItem } from "../../../common/interfaces/order/IOrderControlEventListItem";
import { useController, useForm } from "react-hook-form";
import { DatePicker } from "../../../common/ui/Input/DatePicker";
import { LabelStyle } from "../../../common/ui/Input/styles/labelStyles";
import styled from "styled-components";
import { theme } from "../../../common/styles/theme";
import { ModalContainer } from "../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../common/ui/Button/ButtonsModalForm";
import { modal } from "../../../common/helpers/event/modalEvent";

interface IProps {
  save: (data: IOrderControlEvent) => void;
  orderId: number;
  currentEventID: number | null;
  disabled: boolean;
}

export const ModalAddControlEvents: React.FC<IProps> = (props) => {
  const state = useSelector(proposalControlEventsSelector);
  const [currentEven, setCurrentEvent] = useState<IOrderControlEventListItem>(
    state.controlEventsList.items?.find((item) => item.id === props.currentEventID) ||
      ({} as IOrderControlEventListItem)
  );

  const { register, errors, handleSubmit, control } = useForm<{
    name: string;
    eventDate: Date | null;
  }>({
    defaultValues: {
      name: currentEven.name || "",
      eventDate: currentEven?.eventDate ? new Date(currentEven.eventDate) : null,
    },
  });

  const closeModal = useCallback(() => {
    setCurrentEvent({} as IOrderControlEventListItem);
    modal.close();
  }, []);

  const { field: eventDate } = useController({
    control,
    name: "eventDate",
    rules: { required: "Обязательное поле" },
  });

  const clickSave = async (data: { name: string; eventDate: Date }) => {
    const m = data.eventDate.getMonth();
    const d = data.eventDate.getDate();
    const y = data.eventDate.getFullYear();

    const newDate = new Date(y, m, d, -data.eventDate.getTimezoneOffset() / 60, 0);
    await props.save({
      eventDate: newDate,
      orderId: props.orderId,
      id: currentEven.id,
      name: data.name,
    } as IOrderControlEvent);
    closeModal();
  };

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm disabledSubmit={props.disabled} onSubmit={handleSubmit(clickSave)} onClose={closeModal} />
      }
      title={props.disabled ? "Просмотр события" : currentEven.id ? "Редактирование события" : "Добавление события"}
      width={800}
    >
      <Input
        label={"Название"}
        id={"input_name"}
        isRequired
        fullWidth
        placeholder={"Название"}
        name="name"
        ref={register({
          required: "Обязательное поле",
          maxLength: { value: 200, message: "Максимально допустимое число символов: 200" },
          validate: (event) => {
            if (!event.trim()) {
              return "Название не может состоять только из пробелов";
            } else return true;
          },
        })}
        disabled={props.disabled}
        error={!!errors.name}
        errorMsg={errors?.name?.message}
      />
      <DateWrapper>
        <LabelStyle error={!!errors.eventDate} isRequired>
          Дата события
        </LabelStyle>
        <DatePicker
          disabled={props.disabled}
          dateFormat="dd.MM.yyyy"
          value={eventDate.value}
          onChange={(date) => {
            eventDate.onChange(date);
          }}
          error={!!errors.eventDate}
          placeholderText={"Дата события"}
          id={"DatePicker_eventDate"}
        />
        {errors.eventDate?.message && <ErrorText>{errors.eventDate.message}</ErrorText>}
      </DateWrapper>
    </ModalContainer>
  );
};

const DateWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .react-datepicker-popper {
    position: fixed !important;
    z-index: 100001 !important;
  }
`;

const ErrorText = styled.div`
  color: ${theme.colors.lightRed};
`;
