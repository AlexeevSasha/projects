import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../../../../common/ui/FlexContainer";
import { useController, useForm } from "react-hook-form";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { OrderStatusEnum } from "../../../../common/interfaces/order/OrderStatusEnum";
import { OrderApiRequest } from "../../../../api/orderApiRequest";
import { OrderAutoCompleteColumnNameEnum } from "../../../../common/interfaces/order/OrderAutoCompleteColumnNameEnum";
import { ModalText } from "../../../../common/components/Popup/ui/ModalText";
import { DatePickerRange } from "../../../../common/ui/Input/DatePickerRange";
import { useSelector } from "react-redux";
import { proposalGeneralInfoSelector } from "../../../../module/proposalGeneralInfo/proposalGeneralInfoSelector";
import { InputAutoComplete } from "../../../../common/ui/Input/InputAutoComplete";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { DrawerContainer } from "../../../../common/components/Popup/components/DrawerContainer";

export interface IProposalFilter {
  name?: string;
  status?: ICustomSelect[];
  userName?: string;
  BDate?: Date | null;
  EDate?: Date | null;
  networkName?: ICustomSelect[];
}

interface IProps {
  onClear: () => void;
  defaultValue: IProposalFilter;
  onSave: (value: IProposalFilter) => void;
}

const statusOptions = [
  { value: OrderStatusEnum.New, label: "Новая заявка" },
  { value: OrderStatusEnum.Validation, label: "В обработке" },
  { value: OrderStatusEnum.Completed, label: "Регистр готов" },
  { value: OrderStatusEnum.Editing, label: "Редактирование" },
];

export const ProposalFilter: React.FC<IProps> = (props) => {
  const { avalableRegisterNetworkList } = useSelector(proposalGeneralInfoSelector);
  const { control, handleSubmit, reset } = useForm<IProposalFilter>({ defaultValues: {} as IProposalFilter });

  const { field: name } = useController({
    control,
    name: "name",
    defaultValue: props.defaultValue.name || "",
  });

  const { field: status } = useController({
    control,
    name: "status",
    defaultValue: props.defaultValue.status || [],
  });
  const { field: BDate } = useController({
    control,
    name: "BDate",
    defaultValue: props.defaultValue?.BDate || null,
  });
  const { field: EDate } = useController({
    control,
    name: "EDate",
    defaultValue: props.defaultValue?.EDate || null,
  });

  const { field: userName } = useController({
    control,
    name: "userName",
    defaultValue: props.defaultValue.userName || "",
  });

  const { field: networkName } = useController({
    control,
    name: "networkName",
    defaultValue: props.defaultValue.networkName || [],
  });

  return (
    <DrawerContainer
      closeBackdropClick
      width={725}
      footer={
        <ButtonsModalForm
          onSubmit={handleSubmit(props.onSave)}
          onClose={() => {
            reset({ BDate: null, EDate: null, name: "", userName: "", status: [], networkName: [] });
          }}
          textSubmit={"Применить"}
          textClose={"Сбросить"}
        />
      }
      title={"Расширенный поиск"}
    >
      <Content>
        <FlexContainer>
          <FilterRow direction={"row"} justify={"space-between"} fullWidth>
            <StyledTextModal style={{ width: "30%" }}>Название заявки:</StyledTextModal>
            <InputAutoComplete
              containerWidth={"100%"}
              inputStyle={{ width: "100%" }}
              defaultValue={name.value || ""}
              onChange={(value: string) => name.onChange(value)}
              onLoadSearch={async (search) => {
                return new OrderApiRequest()
                  .getOrderAutoComplete(OrderAutoCompleteColumnNameEnum.name, search)
                  .then((r) => r.result);
              }}
            />
          </FilterRow>
          <FilterRow direction={"row"} justify={"space-between"} fullWidth>
            <StyledTextModal style={{ width: "30%" }}>Статус:</StyledTextModal>
            <CustomSelect
              className={"select"}
              htmlID={"status"}
              options={statusOptions}
              SelectValue={status.value}
              isMulti
              isSearchable
              closeMenuOnSelect={false}
              onChange={(v) => status.onChange(v)}
            />
          </FilterRow>
          <FilterRow direction={"row"} justify={"space-between"} fullWidth>
            <StyledTextModal style={{ width: "30%" }}>Дата создания:</StyledTextModal>
            <DatePickerRange
              endValue={EDate.value}
              startValue={BDate.value}
              onChangeEndDate={(date) => EDate.onChange(date)}
              onChangeStartDate={(date) => BDate.onChange(date)}
            />
          </FilterRow>
          <FilterRow direction={"row"} justify={"space-between"} fullWidth>
            <StyledTextModal style={{ width: "30%" }}>Заявитель:</StyledTextModal>
            <InputAutoComplete
              containerWidth={"100%"}
              inputStyle={{ width: "100%" }}
              defaultValue={userName.value}
              onChange={(value: string) => userName.onChange(value)}
              onLoadSearch={async (search) => {
                return new OrderApiRequest()
                  .getOrderAutoComplete(OrderAutoCompleteColumnNameEnum.userName, search)
                  .then((r) => r.result);
              }}
            />
          </FilterRow>
          <FilterRow direction={"row"} justify={"space-between"} fullWidth>
            <StyledTextModal style={{ width: "30%" }}>Сеть МО:</StyledTextModal>
            <CustomSelect
              isSearchable
              closeMenuOnSelect={false}
              className={"select"}
              htmlID={"networkName"}
              options={avalableRegisterNetworkList.filter((i) => i.label !== "...")}
              SelectValue={networkName.value}
              isMulti
              onChange={(v) => networkName.onChange(v)}
            />
          </FilterRow>
        </FlexContainer>
      </Content>
    </DrawerContainer>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .RightTable {
    padding-bottom: 20px;
  }

  transition: width 1s ease;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const FilterRow = styled(FlexContainer)`
  .select {
    width: 100%;
  }
`;

const StyledTextModal = styled(ModalText)`
  font-weight: 400;
`;
