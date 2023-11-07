import { NextImage } from "../../../common/components/NextImage";
import styled from "astroturf/react";
import { AuthorT } from "../interfaces/author";

export const Author = (props: AuthorT) => {
  return (
    <Container>
      <ContainerImage>
        <NextImage
          style={{ objectFit: "cover", borderRadius: "50%" }}
          src={props.image}
          alt={"alt"}
        />
      </ContainerImage>
      <ContainerText>
        <Profession>{props.profession}</Profession>
        <Name>{props.name}</Name>
      </ContainerText>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 68px 1fr;
  grid-column-gap: 20px;
  align-items: center;

  @include respond-to(small) {
    grid-template-columns: 52px 1fr;
    grid-column-gap: 16px;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  width: 68px;
  height: 68px;
  border-radius: 50%;

  @include respond-to(small) {
    width: 52px;
    height: 52px;
  }
`;

const ContainerText = styled.div`
  display: grid;
  grid-gap: 8px;
`;

const Profession = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  color: $blue1;
`;

const Name = styled.p`
  @import "variables";

  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: $black;
`;
