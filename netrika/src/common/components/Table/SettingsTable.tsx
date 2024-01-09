import React from "react";
import { Access } from "../../../pages/Proposal/helpers/access";
import { ButtonCreateElem } from "../../ui/Button/ButtonCreateElem";
import { StatementData } from "../Container/Container";
import { Pagination } from "../../ui/Pagination/Pagination";

interface IProps {
  nameButtonOpenModal?: string;
  openModal: (isEdit: boolean) => void;
  access: Access;
  pageCount: number;
  selectPageCount: (value: number | string) => void;
  total: number;
  pageNumber: number;
  newPageNumber: (value: number) => void;
  customId?: number;
}

export const SettingsTable: React.FC<IProps> = (props) => {
  return (
    <StatementData>
      {props.access === Access.Edit && props.nameButtonOpenModal ? (
        <ButtonCreateElem
          text={props.nameButtonOpenModal}
          customId={props.customId}
          onClick={() => props.openModal(false)}
        />
      ) : (
        <div />
      )}
      <Pagination
        allCount={props.total}
        countFromPage={props.pageCount}
        page={props.pageNumber}
        onClick={props.newPageNumber}
        selectPageCount={props.selectPageCount}
      />
    </StatementData>
  );
};
