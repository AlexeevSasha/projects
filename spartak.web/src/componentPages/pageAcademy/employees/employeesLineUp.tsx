import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { ICoach } from "../../../api/dto/ICoach";
import { ILeadership } from "../../../api/dto/ILeadership";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { PersonsDropdown } from "../../../components/personsDropdown";

interface IProps {
  leadership?: ILeadership[];
  coaches?: ICoach[];
  staff?: ICoach[];
}

export const TeamLineUp = ({ leadership, coaches, staff }: IProps) => {
  const { locale = "ru", asPath } = useRouter();
  const [type, setType] = useState<string>("leadership");

  useEffect(() => {
    // Если нет указателя на блок, то открывает первый не пустой
    setType(asPath.split("#")[1] || (!!leadership?.length ? "leadership" : !!coaches?.length ? "coaches" : "staff"));
  }, [leadership, coaches, staff]);

  return (
    <CustomContainer>
      {!!leadership?.length && (
        <PersonsDropdown
          id="leadership"
          persons={leadership}
          title={lang[locale].academy.title.leadership}
          locationAcademy
          showBirthday
          showPosition
          profilePath="/academy/employees"
          defaultState={type === "leadership"}
        />
      )}
      {!!coaches?.length && (
        <PersonsDropdown
          id="coaches"
          persons={coaches}
          title={lang[locale].academy.trainers}
          profilePath="/academy/employees"
          locationAcademy
          showBirthday
          showPosition
          defaultState={type === "coaches"}
        />
      )}
      {!!staff?.length && (
        <PersonsDropdown
          id="staff"
          persons={staff}
          title={lang[locale].academy.title.staff}
          locationAcademy
          showBirthday
          showPosition
          defaultState={type === "staff"}
        />
      )}
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
