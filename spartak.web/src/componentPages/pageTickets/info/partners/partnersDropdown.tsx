import styled from "styled-components";
import { ITicketsPartners } from "../../../../../pages/tickets/info/partners";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { NextLink } from "../../../../components/nextLink/nextLink";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { ClubsDropdownList } from "../../../pageClub/clubsDropdownList";

interface IProps {
  partnersData?: ITicketsPartners[];
}

export const PartnersDropdown = (props: IProps) => {
  return (
    <Container>
      {props.partnersData?.map((partner, index) => (
        <ClubsDropdownList
          defaultState={!index}
          customTitle={
            <NextLinkStyled url={partner.partnerUrl}>
              <PartnerLogoContainer>
                <NextImage src={partner.image} alt={partner.partnerName} />
              </PartnerLogoContainer>
            </NextLinkStyled>
          }
          description={partner.info}
          key={index}
        />
      ))}
    </Container>
  );
};

const Container = styled(ContainerContent)`
  flex-direction: column;
  margin: 2.08vw auto 4.17vw;

  section > div:first-of-type {
    padding: 0;
  }
  > img:first-of-type {
    padding-top: 0;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 5.22vw auto 7.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 10.67vw auto;
  }
`;

const PartnerLogoContainer = styled.div`
  padding: 2.08vw 0 10px;
  filter: ${({ theme }) => theme.colors.none_invert};
  position: relative;
  width: 12.71vw;
  height: 6.35vw;
  filter: ${({ theme }) => theme.colors.none_invert};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 0;
    width: 20.33vw;
    height: 10.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 3.2vw 0;
    width: 31.81vw;
    height: 15.91vw;
  }
`;
const NextLinkStyled = styled(NextLink)`
  width: 100%;
  height: 100%;
`;
