import { ProposalCheckListThunk } from "module/proposalCheckList/proposalCheckListThunk";
import moment from "moment";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { IconEdit } from "common/components/Icon/IconEdit";
import { ru } from "common/lang/ru";
import {
  ContainerControl,
  IconContainerFloatingmes,
  Tbody,
  Td,
  Tr,
} from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../helpers/access";
import { IOrderControlListItem } from "../../../common/interfaces/order/IOrderControlListItem";
import { IPaginateItems } from "../../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IconEye } from "../../../common/components/Icon/IconEye";
import { ModalDeleteWIthIcon } from "../../../common/components/Modal/ModalDeleteWIthIcon";

interface IProps {
  controlCheckList: IPaginateItems<IOrderControlListItem[]>;
  access: Access;
  onUpdateRow: () => void;
  handlerModal: (isEdit: boolean) => void;
}

export const ProposalCheckListTableBody = (props: IProps) => {
  const dispatch = useDispatch();

  const onDelete = useCallback(
    async (id: number) => {
      await dispatch(ProposalCheckListThunk.delete(id));
      props.onUpdateRow();
    },
    [props, dispatch]
  );

  const clickEdit = async (body: IOrderControlListItem) => {
    dispatch(ProposalCheckListThunk.getSettings(body.id));
    props.handlerModal(true);
  };

  return (
    <Tbody>
      {props.controlCheckList.items?.map((body, index) => {
        return (
          body && (
            <Tr key={"tr" + index}>
              <Td id={`column_number_${body.id || index + 1}`}>{index + 1}</Td>
              <Td id={`column_name_${body.id || index + 1}`}>{body.name}</Td>
              <Td id={`column_description_${body.id || index + 1}`}>{body.description}</Td>
              <Td id={`column_createdAt_${body.id || index + 1}`} noWrapText>
                {moment(body.updatedAt).format("DD MMMM YYYY")}
              </Td>
              {props.access === Access.Edit ? (
                <Td key={`control_${body.id || index + 1}`}>
                  <ContainerControl>
                    <IconContainerFloatingmes
                      onClick={() => clickEdit(body)}
                      id={`edit_${body.id || index + 1}`}
                      title={ru.floatingmes.edit}
                    >
                      <IconEdit />
                    </IconContainerFloatingmes>

                    <ModalDeleteWIthIcon id={`delete_${body.id || index + 1}`} onDelete={() => onDelete(body.id)} />
                  </ContainerControl>
                </Td>
              ) : (
                <Td key={`control_${body.id || index + 1}`}>
                  <ContainerControl>
                    <IconContainerFloatingmes
                      onClick={() => clickEdit(body)}
                      id={`watch_${body.id || index + 1}`}
                      title={ru.floatingmes.view}
                    >
                      <IconEye />
                    </IconContainerFloatingmes>
                  </ContainerControl>
                </Td>
              )}
            </Tr>
          )
        );
      })}
    </Tbody>
  );
};
