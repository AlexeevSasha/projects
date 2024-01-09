import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOrderConfAttribute } from "../../../../common/interfaces/order/IOrderConfAttribute";
import { IAddDiseaseInfo } from "../../../../common/interfaces/IAddDiseaseInfo";
import { proposalDiseaseCardSelector } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardSelector";
import { ProposalDiseaseCardThunk } from "../../../../module/proposalDiseaseCard/proposalDiseaseCardThunk";
import { CheckBox } from "../../../../common/ui/Input/CheckBox";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { ModalContainer } from "../../../../common/components/Popup/components/ModalContainer";
import { ButtonsModalForm } from "../../../../common/ui/Button/ButtonsModalForm";
import { LabelStyle } from "../../../../common/ui/Input/styles/labelStyles";
import { modal } from "../../../../common/helpers/event/modalEvent";

interface IProps {
  id: number;
  element: "group" | "subGroup" | "attribute";
  type: "edit" | "add";
  info?: any;
  orderId: number;
  callbackAfterClose: () => void;
}

export const ModalAddDiseaseInfo: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(proposalDiseaseCardSelector);

  const [element, setElement] = useState<ICustomSelect>({} as ICustomSelect);
  const [checkHistory, setCheckHistory] = useState(props.info && props.info.useHistory ? props.info.useHistory : false);

  useEffect(() => {
    dispatch(ProposalDiseaseCardThunk.getListSection(props.id, props.element));
  }, [dispatch, props.id, props.element]);

  useEffect(() => {
    if (state.listAttribute.length > 0)
      if (props.type === "add") {
        setElement(state.listAttribute[0]);
      } else {
        setElement(state.listAttribute.find((item) => item.value === props.info.nsiCode) || state.listAttribute[0]);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, props.type]);

  const clickSave = async () => {
    if (element.value) {
      if (props.type === "add") {
        if (props.element === "group")
          await dispatch(
            ProposalDiseaseCardThunk.createGroup({
              idParent: props.id,
              id: element.value,
              description: element.label,
            } as IAddDiseaseInfo)
          );

        if (props.element === "subGroup") {
          await dispatch(
            ProposalDiseaseCardThunk.createSubGroup({
              idParent: props.id,
              id: element.value,
              description: element.label,
            } as IAddDiseaseInfo)
          );
        }

        if (props.element === "attribute")
          await dispatch(
            ProposalDiseaseCardThunk.createAttribute({
              idParent: props.id,
              id: element.value,
              description: element.label,
              useHistory: checkHistory,
            } as IAddDiseaseInfo)
          );
      }

      if (props.type === "edit") {
        if (props.element === "attribute")
          await dispatch(
            ProposalDiseaseCardThunk.updateAttribute({
              sort: props.info.sort,
              id: Number(props.info.id),
              idParent: props.id,
              nsiCode: element.value,
              description: element.label,
              useHistory: checkHistory,
              idOrderConfSubGroup: props.info.idOrderConfSubGroup,
            } as IOrderConfAttribute)
          );
      }
      setElement({} as ICustomSelect);
      setCheckHistory(false);
      modal.close();

      dispatch(ProposalDiseaseCardThunk.getList(props.orderId));
    }
  };

  const onSelectElement = (value: ICustomSelect) => {
    setElement(value);
  };

  const onCheckHistory = () => {
    setCheckHistory(!checkHistory);
  };

  const closeModal = () => {
    if (!state.loadingAttribute) {
      setElement({} as ICustomSelect);
      setCheckHistory(false);
      modal.close();
    }
  };

  const title = useMemo(() => {
    const action = props.type === "add" ? "Добавление " : "Редактирвоание ";
    const name = props.element === "group" ? "группы" : props.element === "subGroup" ? "подгруппы" : "элемента";
    return action + name;
  }, [props.type, props.element]);

  return (
    <ModalContainer
      footer={
        <ButtonsModalForm
          disabledSubmit={state.loadingPopup || state.loadingAttribute}
          onSubmit={clickSave}
          onClose={closeModal}
        />
      }
      loading={state.loadingPopup || state.loadingAttribute}
      title={title}
      width={800}
      callbackAfterClose={props.callbackAfterClose}
    >
      <CustomSelect
        label={`Выбор ${
          props.element === "group" ? "группы" : props.element === "subGroup" ? "подгруппы" : "элемента"
        }`}
        htmlID={"selected"}
        SelectValue={element}
        options={state.listAttribute}
        onChange={onSelectElement}
        isRelative
        isSearchable
      />

      {props.element === "attribute" && (
        <>
          <LabelStyle style={{ margin: "30px 0 20px" }}>Исторические значения</LabelStyle>
          <CheckBox check={checkHistory} onCheck={onCheckHistory} checkId={0} id={"checkbox_history_value"}>
            Исторические значения
          </CheckBox>
        </>
      )}
    </ModalContainer>
  );
};
