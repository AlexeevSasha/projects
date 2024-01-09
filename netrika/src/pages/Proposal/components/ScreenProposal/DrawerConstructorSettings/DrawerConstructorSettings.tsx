import { MoveContainer } from "common/components/Container/MoveContainer";
import React, { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CommonSettings } from "./CommonSettings";
import { SettingsButtons } from "./SettingsButtons";
import { DescriptionCheckList } from "./DescriptionCheckList";
import { IAddOrderControlListRequest } from "../../../../../common/interfaces/order/IAddOrderControlListRequest";
import { filterConstructorSelector } from "../../../../../module/filter/filterConstructorSelector";
import { proposalCheckListSelector } from "../../../../../module/proposalCheckList/proposalCheckListSelector";
import { ConstructorFilterContainer } from "../../../../Register/component/RegisterCheckList/ConstructorFilterContainer";
import { Access } from "../../../helpers/access";
import { DrawerContainer } from "../../../../../common/components/Popup/components/DrawerContainer";
import { drawer } from "../../../../../common/helpers/event/modalEvent";

interface IProps {
  onClose: () => void;
  proposalId: number;
  isCreate?: boolean;
  disabled: boolean;
  access: Access;
}

export const DrawerConstructorSettings: FC<IProps> = ({ onClose, isCreate, disabled, access, proposalId }) => {
  const { setting, loading } = useSelector(proposalCheckListSelector);
  const [nameError, setNameError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const filters = useSelector(filterConstructorSelector);

  const requestData: IAddOrderControlListRequest = {
    name: setting.name,
    orderId: proposalId,
    description: setting.description,
    filters: filters.conditions,
  };

  const hendelError = useCallback((name: boolean, description: boolean) => {
    setNameError(name);
    setDescriptionError(description);
  }, []);

  return (
    <DrawerContainer
      loading={loading}
      width={90}
      unitOfMeasureWidth={"vw"}
      callbackAfterClose={onClose}
      title={
        setting.id
          ? access === Access.Edit
            ? "Настройки контрольного списка"
            : "Просмотр контрольного списка"
          : "Добавление контрольного списка"
      }
      footer={
        !disabled ? (
          <SettingsButtons
            handleError={hendelError}
            onClose={() => drawer.close()}
            isCreate={isCreate}
            data={requestData}
            editId={setting.id || null}
          />
        ) : null
      }
    >
      <Content>
        <CommonSettings
          disabled={disabled}
          handelError={() => setNameError(false)}
          isError={nameError}
          name={setting.name || ""}
        />

        <MoveContainer
          firstBlock={
            <FilterContainer>
              <ConstructorFilterContainer disabled={disabled} type="filterCheckList" />
            </FilterContainer>
          }
          secondBlock={
            <DescriptionCheckList
              disabled={disabled}
              handelError={() => setDescriptionError(false)}
              isError={descriptionError}
              text={setting.description}
            />
          }
        />
      </Content>
    </DrawerContainer>
  );
};

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .MoveContainer {
    flex: 1;
  }
`;

const FilterContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
