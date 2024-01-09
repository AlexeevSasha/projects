import { Fragment } from "react";
import styled from "styled-components";
import { IBirthdayPeople } from "../api/dto/IBirthdayPeople";
import { ICoach } from "../api/dto/ICoach";
import { IPlayer } from "../api/dto/IPlayer";
import { IStaff } from "../api/dto/IStaff";
import { LocaleType } from "../api/dto/LocaleType";
import { theme } from "../assets/theme/theme";
import { DropdownList } from "./dropdownList/dropdownList";
import { HoverButton } from "./personButton";
import { PersonCard } from "./personCard";

type DataType = (IBirthdayPeople | ICoach | IStaff | IPlayer) & {
  Id?: string;
  Position?: LocaleType;
};

interface IProps {
  persons: DataType[];
  title?: string;
  profilePath?: string;
  locationAcademy?: boolean;
  showBirthday?: boolean;
  showPosition?: boolean;
  defaultState?: boolean;
  id?: string;
}

export const PersonsDropdown = ({
  persons,
  title,
  profilePath,
  defaultState,
  locationAcademy,
  showBirthday,
  showPosition,
  id,
}: IProps) => {
  return (
    <DropdownList title={title} defaultState={defaultState} id={id}>
      <Container>
        {persons.map((person, index) => (
          <Fragment key={index}>
            {profilePath && person.Id ? (
              <HoverButton url={`${profilePath}/${person.Id}`}>
                <PersonCard
                  data={person}
                  locationAcademy={locationAcademy}
                  showBirthday={showBirthday}
                  showPosition={showPosition}
                />
              </HoverButton>
            ) : (
              <PersonCard
                data={person}
                locationAcademy={locationAcademy}
                showBirthday={showBirthday}
                showPosition={showPosition}
              />
            )}
          </Fragment>
        ))}
      </Container>
    </DropdownList>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.25vw;
  align-items: flex-start;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3.13vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-column-gap: 2.67vw;
  }
`;
