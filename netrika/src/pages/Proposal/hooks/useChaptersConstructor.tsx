import React, { useCallback, useMemo, useState } from "react";
import { IOrderConfAttribute } from "../../../common/interfaces/order/IOrderConfAttribute";
import { AttributeSettingDiseaseInfo } from "../components/DiseaseInfo/AttributeSettingDiseaseInfo";
import { IOrderConfSubGroup } from "../../../common/interfaces/order/IOrderConfSubGroup";
import { SubGroupSettingDiseaseInfo } from "../components/DiseaseInfo/SubGroupSettingDiseaseInfo";
import { IOrderConfGroup } from "../../../common/interfaces/order/IOrderConfGroup";
import { GroupSettingDiseaseInfo } from "../components/DiseaseInfo/GroupSettingDiseaseInfo";
import { IOrderConfBlock } from "../../../common/interfaces/order/IOrderConfBlock";
import { BlockSettingDiseaseInfo } from "../components/DiseaseInfo/BlockSettingDiseaseInfo";
import { ChaptersSettingDiseaseInfo } from "../components/DiseaseInfo/ChaptersSettingDiseaseInfo";
import { useDispatch, useSelector } from "react-redux";
import { proposalDiseaseCardSelector } from "../../../module/proposalDiseaseCard/proposalDiseaseCardSelector";
import { useOrderStatus } from "./useOrderStatus";
import styled from "styled-components";
import { theme } from "../../../common/styles/theme";
import { Access } from "../helpers/access";
import { ProposalDiseaseCardThunk } from "../../../module/proposalDiseaseCard/proposalDiseaseCardThunk";
import { IOrderConfInfo } from "../../../common/interfaces/order/IOrderConfInfo";

interface IProps {
  visibleModal: boolean;
  updateVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  customModal: { show: boolean; chapterId: number };
  updateCustomModal: React.Dispatch<React.SetStateAction<{ show: boolean; chapterId: number }>>;
  editElement: any;
  setEditElement: React.Dispatch<any>;
}

export const useChaptersConstructor = (props: IProps) => {
  const dispatch = useDispatch();
  const state = useSelector(proposalDiseaseCardSelector);
  const [open, setOpen] = useState<string[]>([]);

  const access = useOrderStatus();

  const openModal = useCallback(
    (element: "group" | "subGroup" | "attribute", type: "edit" | "add", id: number, info?: any) => {
      if (type === "edit") {
        props.setEditElement({ ...props.editElement, type, element, id, info });
      } else {
        props.setEditElement({ ...props.editElement, type, element, id, info });
      }
      props.updateVisibleModal(true);
    },
    // eslint-disable-next-line
    [props.setEditElement, props.editElement, props.updateVisibleModal]
  );

  const clickOpen = useCallback(
    (name: string) => {
      setOpen([...open, name]);
    },
    [open]
  );

  const clickClose = useCallback(
    (name: string) => {
      setOpen(open.filter((item) => item !== name));
    },
    [open]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAll = (orderConfInfo: IOrderConfInfo) => {
    dispatch(ProposalDiseaseCardThunk.updateVisibleAllBlock(orderConfInfo));
  };

  const attribute = useCallback(
    (orderConfAttributes: IOrderConfAttribute[], subGroupId: number, lastSubGroup?: boolean, lastGroup?: boolean) => {
      if (orderConfAttributes) {
        return orderConfAttributes.map((item, index) => (
          <AttributeSettingDiseaseInfo
            key={`attribute_${item.id}`}
            attribute={item}
            access={access}
            openModal={openModal}
            subGroupId={subGroupId}
            first={index === 0}
            last={index === orderConfAttributes.length - 1}
            lastGroup={lastGroup}
            lastSubGroup={lastSubGroup}
            idNewAttribute={state.idNewAttribute}
          />
        ));
      }
      return null;
    },
    [access, openModal, state.idNewAttribute]
  );

  const subGroup = useCallback(
    (orderConfSubGroups: IOrderConfSubGroup[], lastGroup?: boolean, groupID?: number) => {
      if (orderConfSubGroups) {
        return orderConfSubGroups.map((item, index) => (
          <SubGroupSettingDiseaseInfo
            groupID={groupID}
            key={`subGroup_${item.id}`}
            subGroup={item}
            access={access}
            openModal={openModal}
            openChild={() => clickOpen("subGroup_" + item.id)}
            closeChild={() => clickClose("subGroup_" + item.id)}
            open={!!open.find((el) => el === "subGroup_" + item.id)}
            first={index === 0}
            last={index === orderConfSubGroups.length - 1}
            lastGroup={lastGroup}
            showIconOpenBlock={!!item.orderConfAttributes.length}
            idNewSubGroup={state.idNewSubGroup}
          >
            {attribute(item.orderConfAttributes, item.id, index === orderConfSubGroups.length - 1, lastGroup)}
          </SubGroupSettingDiseaseInfo>
        ));
      }
      return null;
    },
    [access, openModal, clickClose, clickOpen, open, attribute, state.idNewSubGroup]
  );

  const group = useCallback(
    (orderConfGroups: IOrderConfGroup[], blockID?: number) => {
      if (orderConfGroups) {
        return orderConfGroups.map((item, index) => (
          <GroupSettingDiseaseInfo
            adjacentTop={orderConfGroups[index - 1]}
            adjacentBottom={orderConfGroups[index + 1]}
            blockID={blockID}
            key={`group_${item.id}`}
            group={item}
            access={access}
            openModal={openModal}
            openChild={() => clickOpen("group_" + item.id)}
            closeChild={() => clickClose("group_" + item.id)}
            open={!!open.find((el) => el === "group_" + item.id)}
            first={index === 0}
            last={index === orderConfGroups?.length - 1}
            showAddDefaultSubGroup={!item.orderConfSubGroups?.find((item) => item.isDefault)}
            showIconOpenBlock={!!item.orderConfSubGroups?.length}
            idNewGroup={state.idNewGroup}
          >
            {subGroup(item.orderConfSubGroups, index === orderConfGroups.length - 1, item.id)}
          </GroupSettingDiseaseInfo>
        ));
      }
      return null;
    },
    [access, openModal, clickClose, clickOpen, open, state.idNewGroup, subGroup]
  );

  const block = useCallback(
    (orderConfBlocks: IOrderConfBlock[]) => {
      if (orderConfBlocks) {
        return orderConfBlocks.map((item, index) => (
          <BlockSettingDiseaseInfo
            adjacentTop={orderConfBlocks[index - 1]}
            adjacentBottom={orderConfBlocks[index + 1]}
            key={`block_${item.id}`}
            block={item}
            access={access}
            openModal={openModal}
            openChild={() => clickOpen("block_" + item.id)}
            closeChild={() => clickClose("block_" + item.id)}
            open={!!open.find((el) => el === "block_" + item.id)}
            idNewBlock={state.idNewBlock}
            showIconOpenBlock={!!item.orderConfGroups.length}
          >
            {group(item.orderConfGroups, item.id)}
          </BlockSettingDiseaseInfo>
        ));
      }
      return null;
    },
    [access, openModal, group, clickClose, clickOpen, open, state.idNewBlock]
  );

  return useMemo(() => {
    if (state.data.orderConfChapters) {
      return state.data.orderConfChapters.map((elem, i) => (
        <ChaptersSettingDiseaseInfo
          key={elem.id}
          title={elem.description}
          clickAddCustomBlock={props.updateCustomModal}
          access={access}
          chapterId={elem.id}
          showBtnAddCustomBlock={state.showBtnAddCustomBlock}
        >
          {access === Access.Edit && i === 0 ? (
            <div style={{ position: "relative" }}>
              {block(elem.orderConfBlocks)}
              <Button onClick={() => checkAll(state.data)}>Отметить все</Button>
            </div>
          ) : (
            block(elem.orderConfBlocks)
          )}
        </ChaptersSettingDiseaseInfo>
      ));
    }
    return null;
  }, [access, state.data, block, state.showBtnAddCustomBlock, props.updateCustomModal, checkAll]);
};

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  top: -8px;
  transform: translateY(-100%);
  right: 0;
  background: none;
  border: none;
  outline: none;
  color: ${theme.colors.hightBlue};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${theme.colors.green};
  }
`;
