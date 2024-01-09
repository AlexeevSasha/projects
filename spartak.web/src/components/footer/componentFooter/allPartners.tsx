import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styled from "styled-components";
import { IPartner } from "../../../api/dto/IPartner";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../containers/containerContent";
import { getLocalValue } from "../../../assets/helpers/getLocalValue";
import { NextImage } from "../../../ui/nextImage/nextImage";

interface IProps {
  partners?: IPartner[] | null;
}

export const AllPartners = (props: IProps) => {
  const { locale } = useRouter();
  const staticPartners = useMemo(() => props.partners?.filter((partner) => partner.Layout == "Rotation"), [props]);

  return (
    <Container>
      <PartnersColumn>
        {staticPartners?.map((elem) => (
          <a key={elem.Id} href={getLocalValue(elem.PartnerUrl, locale)} target="_blank" rel="noreferrer">
            <StyledPartner>
              <NextImage src={elem.ImageUrl} />
            </StyledPartner>
          </a>
        ))}
      </PartnersColumn>
    </Container>
  );
};

const Container = styled(ContainerContent)`
  display: none;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: block;
  }
`;

const StyledPartner = styled.div`
  width: 20.5vw;
  height: 10.17vw;
`;

const PartnersColumn = styled.div`
  display: none;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    display: grid;
    gap: 3.2vw;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto, min-content);
  }
`;
