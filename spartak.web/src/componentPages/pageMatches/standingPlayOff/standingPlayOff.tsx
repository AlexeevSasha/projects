import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { IMatchDto } from "../../../api/dto/IMatchDto";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { DropdownList } from "../../../components/dropdownList/dropdownList";
import { RowMatchInfo } from "../matchTableInfo/rowMatchInfo";

interface IProps {
  matchList?: IMatchDto[];
  teamId?: string;
}

export const StandingPlayOff = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  const objEvent = useMemo(() => {
    const event: { [key: string]: IMatchDto[] } = {};
    props.matchList?.forEach((elem: IMatchDto) => {
      const name = getLocalValue(elem.Round?.Name, locale);
      event[name] = [...(event[name] || []), elem];
    });

    return event;
  }, [props.matchList]);

  return (
    <ContainerTableMatch>
      {Object.keys(objEvent)
        .reverse()
        .map((eventKey, index) => (
          <DropdownList title={eventKey} key={eventKey} defaultState={!index}>
            {objEvent[eventKey].map((match) => (
              <RowMatchInfo key={match.Id} currentMatch={match} typeMatch={"old"} teamId={props.teamId} />
            ))}
          </DropdownList>
        ))}
    </ContainerTableMatch>
  );
};

const ContainerTableMatch = styled(ContainerContent)`
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3.54vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-bottom: 5.22vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 5.53vw;
  }
`;
