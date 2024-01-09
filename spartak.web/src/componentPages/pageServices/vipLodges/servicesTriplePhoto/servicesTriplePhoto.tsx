import React from "react";
import styled from "styled-components";
import { theme } from "../../../../assets/theme/theme";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { BlockTriplePhoto } from "../../../../components/blockTriplePhoto/blockTriplePhoto";
import { useRouter } from "next/router";
import { getLocalValue } from "../../../../assets/helpers/getLocalValue";
import { IServicesVip } from "../../../../api/dto/IServicesVip";

interface IProps {
  triplePhoto?: IServicesVip["triplePhoto"];
}

export const ServicesTriplePhoto = (props: IProps) => {
  const { locale } = useRouter();

  return props.triplePhoto ? (
    <StyledContainer>
      <BlockTriplePhoto
        first={getLocalValue(props.triplePhoto?.photo1, locale)}
        second={getLocalValue(props.triplePhoto?.photo2, locale)}
        main={getLocalValue(props.triplePhoto?.mainPhoto, locale)}
      />
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled(ContainerContent)`
  padding-top: 5.21vw;
  section:first-of-type {
    direction: rtl;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 10.95vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 10.67vw;
  }
`;
