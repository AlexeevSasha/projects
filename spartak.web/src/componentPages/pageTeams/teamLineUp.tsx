import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { lang } from "../../../public/locales/lang";
import type { IAmplua } from "../../api/dto/IAmplua";
import { ICoach } from "../../api/dto/ICoach";
import type { IPlayer } from "../../api/dto/IPlayer";
import { IStaff } from "../../api/dto/IStaff";
import { getLocalValue } from "../../assets/helpers/getLocalValue";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../../components/containers/containerContent";
import { PersonsDropdown } from "../../components/personsDropdown";

interface IProps {
  players?: IPlayer[];
  coaches?: ICoach[];
  staff?: IStaff[];
  medical?: IStaff[];
  amplua?: IAmplua[];
}

export const TeamLineUp = ({ players, coaches, staff, medical, amplua }: IProps) => {
  const { locale = "ru" } = useRouter();

  const teamArr: { name: string; id: number; list: IPlayer[]; profilePath?: string }[] =
    amplua
      ?.sort((a, b) => a.SortOrder - b.SortOrder)
      ?.map(({ Id, Name }) => ({
        name: getLocalValue(Name, locale),
        id: Math.floor(Math.random() * 1000000),
        list: players?.filter(({ Amplua }) => Amplua?.Id === Id).sort((a, b) => a.PlayerNumber - b.PlayerNumber) || [],
        profilePath: "/player",
      }))
      .filter((elem) => elem.list?.length > 0) || [];

  const newArr: { name: string; id: number; list: ICoach[] | IStaff[] | IPlayer[]; profilePath?: string }[] = [
    {
      name: lang[locale].pageTeams.trainers,
      id: Math.floor(Math.random() * 1000000),
      list: coaches || [],
      profilePath: "/coaches",
    },
    { name: lang[locale].pageTeams.medical, id: Math.floor(Math.random() * 1000000), list: medical || [] },
    { name: lang[locale].pageTeams.staff, id: Math.floor(Math.random() * 1000000), list: staff || [] },
    ...teamArr,
  ].filter((elem) => elem?.list?.length > 0);

  return (
    <CustomContainer>
      {newArr?.map((item, i) => (
        <React.Fragment key={item.id}>
          <PersonsDropdown
            profilePath={item.profilePath}
            persons={item.list}
            title={item.name}
            defaultState={i === 0}
            locationAcademy={item.name.includes("штаб") || item.name.includes("staff")}
            showPosition={item.name.includes("штаб") || item.name.includes("staff")}
          />
        </React.Fragment>
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
