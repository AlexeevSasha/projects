import React from "react";
import { styled } from "../../../../common/styles/styled";
import { ICoverage } from "../../../../common/interfaces/ICoverage";
import { FlexContainer } from "common/ui/FlexContainer";
import { theme } from "common/styles/theme";
interface IProps {
  coverage: ICoverage[];
}

export const CoverageBlock = (props: IProps) => {
  return (
    <FlexContainer alignItems="start" fullWidth spacing={10}>
      <CoverageTitle>Информация о прикреплении</CoverageTitle>
      <FlexContainer justify="start" alignItems="start" spacing={5} fullWidth>
        {props.coverage.map((cover, index) => (
          <FlexContainer key={`networkName_${index}`} direction="row" justify="space-between" fullWidth>
            <CoverageItem style={{ width: "30%" }}>{cover.issuer}</CoverageItem>
            <CoverageItem style={{ width: "65%" }}>{cover.networkName}</CoverageItem>
          </FlexContainer>
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};

const CoverageItem = styled.span<{ noWrap?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.colors.textPrimary};
  white-space: ${({ noWrap }) => noWrap && "nowrap"};
`;
const CoverageTitle = styled.div`
  color: ${theme.colors.hightBlue};
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`;
