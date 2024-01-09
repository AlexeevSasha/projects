import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IAmplua } from "../../../api/dto/IAmplua";
import { ICoach } from "../../../api/dto/ICoach";
import { IPlayer } from "../../../api/dto/IPlayer";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { PersonsDropdown } from "../../../components/personsDropdown";

interface IProps {
  players?: IPlayer[];
  coaches?: ICoach[];
  amplua?: IAmplua[];
}

export const TeamLineUp = ({ players, coaches, amplua }: IProps) => {
  const { locale = "ru" } = useRouter();
  const familyName = (p: IPlayer) => {
    const names = getLocalValue(p.FullName, locale).split(" ");
    return names[names.length === 3 ? 2 : 1];
  };
  const playerSortFunc = (a: IPlayer, b: IPlayer) =>
    familyName(a)?.toLocaleLowerCase() > familyName(b)?.toLocaleLowerCase() ? 1 : -1;

  return (
    <CustomContainer>
      {!!coaches?.length && (
        <PersonsDropdown
          persons={coaches}
          title={lang[locale].academy.trainers}
          profilePath="/academy/employees"
          locationAcademy
          showBirthday
          showPosition
          defaultState
        />
      )}

      {amplua
        ?.sort((a, b) => a.SortOrder - b.SortOrder)
        ?.map(({ Id, Name }) => ({ Name, list: players?.filter(({ Amplua }) => Amplua?.Id === Id) }))
        .filter((elem) => !!elem.list?.length)
        .map(({ list = [], Name }, i) => (
          <PersonsDropdown
            key={i}
            persons={list.sort(playerSortFunc)}
            title={getLocalValue(Name, locale)}
            defaultState={!coaches?.length && !i}
            locationAcademy
            showBirthday
          />
        ))}
    </CustomContainer>
  );
};

const CustomContainer = styled(ContainerContent)`
  flex-direction: column;
  padding-bottom: 6.67vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-bottom: 10.04vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-bottom: 18.67vw;
  }
`;
