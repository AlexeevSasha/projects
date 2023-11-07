import { NextImage } from "../../../common/components/NextImage";
import styled from "astroturf/react";
import { ArticleT } from "../interfaces/article";
import Link from "next/link";

export const ArticleSmallCard = (props: ArticleT) => {
  return (
    <Link href={`/blog/${props.id}`}>
      <Container>
        <ContainerImage>
          <NextImage
            style={{ objectFit: "cover", borderRadius: 20 }}
            src={props.image}
            alt={"alt"}
          />
        </ContainerImage>
        <ContainerText>
          <Title>{props.label}</Title>
          <Text>{props.title}</Text>
        </ContainerText>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: 20px;
  align-items: center;
  cursor: pointer;
`;

const ContainerImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Title = styled.span`
  @import "variables";

  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  color: $orange1;
`;

const Text = styled.p`
  @import "variables";

  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.02em;
  color: $black;
`;
