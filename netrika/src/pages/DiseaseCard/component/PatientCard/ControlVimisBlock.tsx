import React from "react";
import { styled } from "../../../../common/styles/styled";
import moment from "moment";
import { theme } from "../../../../common/styles/theme";
import { RemdVimisControlStatusEnum } from "../../../../common/interfaces/RemdVimisControlStatusEnum";
import { FlexContainer } from "common/ui/FlexContainer";

interface IProps {
  controlVimis:
    | { recipientSystem: string; vimisControlDate: Date | string; status: RemdVimisControlStatusEnum }[]
    | null;
}

export const ControlVimisBlock = (props: IProps) => {
  return (
    <FlexContainer alignItems="start" spacing={10}>
      <CoverageTitle>Контроль ВИМИС</CoverageTitle>
      <FlexContainer alignItems="start" spacing={5}>
        {props.controlVimis &&
          props.controlVimis.map((vimis, index) => (
            <span key={`controlVimis_${index}`}>
              <CoverageItem>
                <span>{vimis.recipientSystem} поставлен </span>
                {moment(vimis.vimisControlDate).format("DD MMMM YYYY")}
              </CoverageItem>
              <br />
            </span>
          ))}
      </FlexContainer>
    </FlexContainer>
  );
};

const CoverageItem = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.colors.textPrimary};
`;
const CoverageTitle = styled.div`
  color: ${theme.colors.hightBlue};
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`;
