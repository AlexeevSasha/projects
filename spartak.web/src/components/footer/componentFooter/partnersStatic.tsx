import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import { IPartner } from "../../../api/dto/IPartner";
import { theme } from "../../../assets/theme/theme";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  partners?: IPartner[] | null;
}

export const PartnersStatic = (props: IProps) => {
  const { locale } = useRouter();
  const staticPartners = useMemo(
    () =>
      props.partners
        ?.filter((partner) => partner.Layout == "Static")
        .filter((partner) => partner.Status === "Published")
        .splice(0, 4),
    [props]
  );

  return staticPartners?.length ? (
    <Container>
      {staticPartners?.map((elem) => (
        <NativeLink href={getLocalValue(elem.PartnerUrl, locale)} key={elem.Id} target="_blank">
          <PartnerIconContainer>
            <NextImage src={elem.ImageUrl} alt={getLocalValue(elem.FullName, locale)} />
          </PartnerIconContainer>
        </NativeLink>
      ))}
    </Container>
  ) : null;
};

const Container = styled.nav`
  display: grid;
  width: 82.5vw;
  padding: 1.67vw 0;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    grid-template-columns: repeat(2, 40.76vw);
    padding: 4.27vw 0 3.2vw;
  }
`;

const NativeLink = styled.a`
  display: grid;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PartnerIconContainer = styled.div`
  height: 6.35vw;
  width: 21.67vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 21.67vw;
    height: 6.35vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 44.33vw;
    height: 22.16vw;
  }  
`;
