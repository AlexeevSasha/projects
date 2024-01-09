import styled from "styled-components";
import React from "react";
import { theme } from "../../../../assets/theme/theme";
import { formatDate } from "../../../../assets/constants/date";
import { useRouter } from "next/router";
import { IMatchDto } from "../../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";

interface IProps {
  date: string;
  tournament?: string;
  old?: boolean;
  round?: IMatchDto["Round"];
}

export const ColumnTur = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <Container>
      <TexDate old={props.old}>{formatDate(props.date, "dd MMMM, HH:mm", locale)}</TexDate>
      {props.round ? (
        <TextTur>
          {[getLocalValue(props.round?.Name, locale), props.tournament].filter((value) => value).join(" | ")}
        </TextTur>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 0.94vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    text-align: center;
  }
`;

const TexDate = styled.p<{ old?: boolean }>`
  font-size: 1.25vw;
  margin: 0 0 0.42vw 0;
  color: ${(props) => (props.old ? props.theme.colors.gray_grayDark1 : props.theme.colors.white_black)};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;

const TextTur = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray_grayDark1};
`;
