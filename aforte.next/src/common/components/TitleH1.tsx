import styled from "astroturf/react";

type Props = {
  title: string;
  smallText?: string;
};

export const TitleH1 = ({ title, smallText }: Props) => {
  return (
    <Title>
      <b>{title}</b> {smallText ? <span>{smallText}</span> : null}
    </Title>
  );
};

const Title = styled.h1`
  @import "variables";

  font-size: 28px;
  line-height: 137%;
  margin: 0;
  color: $black;

  span {
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 0.02em;
    white-space: nowrap;
    color: rgb($black, 0.3);
  }

  b {
    font-weight: 700;
    margin-right: 6px;
  }

  @include respond-to(small) {
    font-size: 20px;
    span {
      font-size: 14px;
    }
  }
`;
