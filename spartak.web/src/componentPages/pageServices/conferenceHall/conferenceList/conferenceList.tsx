import React from "react";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { useRouter } from "next/router";
import { LocaleType } from "../../../../api/dto/LocaleType";

interface IProps {
  listData: LocaleType[];
}

export const ConferenceList = (props: IProps) => {
  const { locale } = useRouter();

  return (
    <ContainerContent>
      <StyledList>
        {props.listData.map((elem: any, index: number) => (
          <ListItem key={`l${index}`}>
            <IconRedPoint />
            <p>{getLocalValue(elem, locale)}</p>
          </ListItem>
        ))}
      </StyledList>
    </ContainerContent>
  );
};

const StyledList = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: start;
  color: ${({ theme }) => theme.colors.white_black};
  padding: 4.17vw 0 5.21vw;
  font-family: "FCSM Text", sans-serif;
  font-size: 0.94vw;
  gap: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    padding: 5.22vw 0 10.43vw;
    font-size: 2.35vw;
    gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 4.27vw 0 10.67vw;
    font-size: 3.73vw;
    gap: 6.4vw;
  }
`;

const ListItem = styled.div`
  display: grid;
  grid: auto / auto 1fr;
  padding: 1.25vw 0.83vw;
  gap: 0.42vw;

  p {
    margin: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0 0 6.4vw;
    gap: 1.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 0;
    gap: 2.13vw;
  }
`;
