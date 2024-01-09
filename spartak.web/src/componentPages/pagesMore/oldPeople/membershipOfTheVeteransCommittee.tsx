import { useRouter } from "next/router";
import styled from "styled-components";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { BigCardOfVeteran } from "./bigCardOfVeteran";
import { SmallCardOfVeteran } from "./smallCardOfVeteran";

interface IProps {
  membershipOfTheVeteransCommittee: any;
}

export const MembershipOfTheVeteransCommittee = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return (
    <CustomContainerContent>
      <Title>{getLocalValue(props.membershipOfTheVeteransCommittee?.dataCommitteeTitle, locale)}</Title>
      <ContainerBigCardOfVeteran>
        {props.membershipOfTheVeteransCommittee?.dataCommittee.filter((el: any) => el.selectPosition === "lead").map((veteran: any) => (
          <BigCardOfVeteran key={getLocalValue(veteran.fullName, locale)} veteran={veteran} />
        ))}
      </ContainerBigCardOfVeteran>
      <ContainerSmallCardOfVeteran>
        {props.membershipOfTheVeteransCommittee?.dataCommittee.filter((el: any) => el.selectPosition === "member").map((veteran: any) => (
          <SmallCardOfVeteran key={getLocalValue(veteran.fullName, locale)} veteran={veteran} />
        ))}
      </ContainerSmallCardOfVeteran>
    </CustomContainerContent>
  );
};

const CustomContainerContent = styled(ContainerContent)`
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 3.23vw;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    margin-bottom: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
    margin-bottom: 4.27vw;
  }
`;

const ContainerBigCardOfVeteran = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1.25vw;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
  }
`;

const ContainerSmallCardOfVeteran = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.25vw;
  grid-row-gap: 1.25vw;
  width: 100%;

  margin-top: 1.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
    grid-row-gap: 3.13vw;
    margin-top: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 4.27vw;
  }
`;
