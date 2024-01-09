import { useRouter } from "next/router";
import styled from "styled-components";
import { lang } from "../../../../../public/locales/lang";
import { IServicesVip } from "../../../../api/dto/IServicesVip";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";

interface IProps {
  exclusiveConditions?: IServicesVip["exclusiveConditions"];
}

export const ExclusiveConditions = (props: IProps) => {
  const { locale = "ru" } = useRouter();

  return props.exclusiveConditions?.length ? (
    <StyledContainer>
      <Package>
        <Title>{lang[locale].pageVipLodge.packagesHospitality.exclusive}</Title>

        <PackageList>
          {props.exclusiveConditions.map((el, index) => (
            <li key={`k${index}`}>
              <IconRedPoint />
              {getLocalValue(el, locale)}
            </li>
          ))}
        </PackageList>
      </Package>
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white_black};
`;

const Package = styled.div<{ redBg?: boolean }>`
  width: 100%;
  border: 0.05vw solid ${theme.colors.red};
  background: rgba(204, 18, 45, 0.1);

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
  }

  &:not(:first-child) svg > path {
    stroke: ${theme.colors.white};
  }

  &:not(:last-child) svg > path {
    stroke: ${({ theme }) => theme.colors.white_red};
  }
`;

const Title = styled.h1`
  display: block;
  margin: 0 2.08vw 1.25vw;
  padding: 2.08vw 0 1.25vw;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.71vw;
  border-bottom: 0.05vw solid ${({ theme }) => theme.colors.red_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    padding: 2.09vw 0 1.56vw;
    margin: 0 2.09vw 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
    padding: 4.27vw 0 3.2vw;
    margin: 0 4.27vw 3.73vw;
  }
`;

const PackageList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  padding: 0 2.08vw 0 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-template-columns: 1fr;
  }

  li {
    display: grid;
    grid: auto / auto 1fr;
    align-items: center;
    gap: 0.63vw;
    list-style: none;
    padding: 0.83vw 0;
    font-family: Roboto, sans-serif;
    font-size: 0.94vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 1.83vw;
      padding: 1.3vw 0;
      gap: 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 3.73vw;
      padding: 2.67vw 0;
      gap: 2.13vw;
    }
  }
`;
