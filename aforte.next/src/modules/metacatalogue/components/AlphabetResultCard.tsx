import styled from "astroturf/react";
import Link from "next/link";
import { AlphabetSearchResultT } from "../interfaces/metaCatalogue";
import { IconArraySmall } from "../../../common/components/icons/IconArraySmall";

export const AlphabetResultCard = ({ title, children }: AlphabetSearchResultT) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Result>
        {children.map((el) => (
          <LinkStyle key={el.id} href={`/product/metacatalogue/medicinal-product?id=${el.id}`}>
            {el.title}
            <IconContainer>
              <IconArraySmall size={"md"} rotate={"-90deg"} />
            </IconContainer>
          </LinkStyle>
        ))}
      </Result>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  margin: 0;
  padding: 24px;
  border-radius: 28px;
  background: $white;
  color: $black;
  font-weight: 500;
  font-size: 14px;
  line-height: 137%;
  break-inside: avoid-column;
`;

const Title = styled.div`
  @import "variables";

  font-weight: 500;
  font-size: 28px;
  line-height: 137%;
  color: $blue1;
  margin-bottom: 12px;
`;

const Result = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 8px;
`;

const IconContainer = styled.div`
  @import "variables";

  @include transition();

  opacity: 0;
  position: absolute;
  height: 16px;
  width: 16px;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
`;

const LinkStyle = styled(Link)`
  @import "variables";

  @include transition();

  position: relative;
  padding-right: 24px;

  &:hover {
    color: $blue1;
    font-weight: 600;

    ${IconContainer} {
      opacity: 1;
    }
  }
`;
