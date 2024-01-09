import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React from "react";
import { ButtonCreateElem } from "common/ui/Button/ButtonCreateElem";
import { StatementData } from "common/components/Container/Container";
import { Access } from "../../helpers/access";

interface IProps {
  title: string;
  access?: Access;
  chapterId: number;
  clickAddCustomBlock?: ({ show, chapterId }: { show: boolean; chapterId: number }) => void;
  showBtnAddCustomBlock?: boolean;
}

export const ChaptersSettingDiseaseInfo: React.FC<IProps> = (props) => {
  return (
    <>
      <CustomTitle style={{ margin: "8px 0" }}>{props.title}</CustomTitle>
      {props.access === Access.Edit ? (
        <StatementData style={{ marginBottom: "8px", marginTop: "0" }}>
          {props.showBtnAddCustomBlock ? (
            <ButtonCreateElem
              onClick={() => props.clickAddCustomBlock?.({ show: true, chapterId: props.chapterId })}
              text="Добавить новый блок"
              customId={props.chapterId}
            />
          ) : null}
        </StatementData>
      ) : null}
      {props.children}
    </>
  );
};

const CustomTitle = styled.h3`
  font-weight: 600;
  color: ${theme.colors.black};
  margin-top: 16px;
`;
