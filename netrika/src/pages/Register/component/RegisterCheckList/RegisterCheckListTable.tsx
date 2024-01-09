import { scrollToElem } from "common/helpers/scrollToElem";
import { UserRolesEnum } from "common/interfaces/user/UserRolesEnum";
import { styled } from "common/styles/styled";
import { authorizationSelector } from "module/authorization/authorizationSelector";
import { selectActiveList, selectControlList } from "module/registerCheckList/registerCheckListSelector";
import { checkListSessionSelector } from "module/registerCheckListSession/registerCheckListSessionActionSelector";
import { RegisterCheckListSessionThunk } from "module/registerCheckListSession/registerCheckListSessionThunk";
import { RegisterSettingsCheckListThunk } from "module/registerSettingsCheckList/registerSettingsCheckListThunk";
import React, { FC, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { errorPopup } from "common/helpers/toast/error";
import { IControlTable, TableBody } from "common/components/Table/TableBody";
import { TableHead } from "common/components/Table/TableHead";
import { RegisterCheckListThunk } from "../../../../module/registerCheckList/registerCheckListThunk";
import { IControlList } from "../../../../common/interfaces/control/IControlList";
import { Title } from "../../../../common/ui/Title/Title";

const tableHead = [
  { name: "Название", value: "name" },
  { name: "Пациентов", value: "itemsCount" },
];

interface IProps {
  clickAddList: () => void;
  clickOpen: (id: number) => void;
  clickRecalculation: (id: number) => void;
  registerId: number;
  loadSettings: (id: number) => void;
}

export const RegisterCheckListTable: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const sessionIdList = useSelector(checkListSessionSelector);
  const { login } = useSelector(authorizationSelector);
  const controlList = useSelector(selectControlList);
  const activeList = useSelector(selectActiveList);

  const [idScrollingElement, setIdScrollingElement] = useState(0);

  const deleteControlList = useCallback(
    (id?: string) => {
      const elem = controlList.find((item) => item.id === Number(id));

      if (elem && elem.isDefault) {
        errorPopup("Невозможно удалить дефолтный список.");
      } else {
        dispatch(RegisterSettingsCheckListThunk.deleteCheckList(props.registerId, Number(id)));
      }
    },
    [dispatch, controlList, props.registerId]
  );

  const checkDone = useCallback(
    (id?: string) => {
      const elem = controlList.find((item) => item.id === Number(id));
      dispatch(RegisterSettingsCheckListThunk.setIsDone(props.registerId, Number(id), !elem?.isDone));
    },
    [dispatch, controlList, props.registerId]
  );

  const clickStop = useCallback(
    (event: MouseEvent<HTMLElement>, id: number) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(RegisterCheckListSessionThunk.stopSessionInfo(id));
    },
    [dispatch]
  );

  const control = useMemo(() => {
    return login === UserRolesEnum.RegistrySuperUsr ||
      login === UserRolesEnum.RegistryAdmin ||
      login === UserRolesEnum.RegistrySuperExpert
      ? ([
          { name: "update", onClick: props.clickRecalculation, value: "id" },
          { name: "edit", onClick: props.loadSettings, value: "id" },
          { name: "delete", onClick: deleteControlList, value: "id" },
          { name: "check", onClick: checkDone, value: "isDone" },
          { name: "clickRow", onClick: props.clickOpen, value: "id" },
        ] as IControlTable[])
      : ([
          { name: "update", onClick: props.clickRecalculation, value: "id" },
          { name: "clickRow", onClick: props.clickOpen, value: "id" },
        ] as IControlTable[]);
  }, [login, checkDone, props, deleteControlList]);

  // Скролл к активному элементу списка
  useEffect(() => {
    if (idScrollingElement !== activeList) {
      scrollToElem("row_" + activeList + "_active");
    }
    setIdScrollingElement(activeList);
  }, [controlList, activeList, idScrollingElement]);
  const sortingTable = useCallback(
    (sortArr: IControlList[], errorReset: () => void) => {
      const newSortArr = sortArr.map((item, index) => ({ id: item.id, sort: index }));
      dispatch(RegisterCheckListThunk.sortControlList(newSortArr, errorReset));
    },
    [dispatch]
  );

  return (
    <Container id={"control_list"}>
      <TitleContainer>
        <Title level={2}>Контрольные списки</Title>
        {login === UserRolesEnum.RegistrySuperUsr ||
        login === UserRolesEnum.RegistryAdmin ||
        login === UserRolesEnum.RegistrySuperExpert ? (
          <ButtonCreateElem onClick={props.clickAddList} text={"Добавить новый список"} />
        ) : null}
      </TitleContainer>

      <TableHead numbering tableHead={tableHead} control={control.length !== 1} isDraggable>
        <TableBody
          rowFloatingText={"Открыть список"}
          sortingTable={sortingTable}
          isDraggable
          tableHead={tableHead}
          tableBody={controlList}
          control={control}
          activeLine={activeList}
          clickRow={true}
          loadingValue={sessionIdList.map((item) => ({ line: item.id, column: "itemsCount" }))}
          closeLoading={clickStop}
          numbering
        />
      </TableHead>
    </Container>
  );
};

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  h2 {
    margin: 15px 0;
  }
`;

const TitleContainer = styled.div`
  h2 {
    margin-right: 15px;
  }

  display: flex;
  align-items: center;
`;
