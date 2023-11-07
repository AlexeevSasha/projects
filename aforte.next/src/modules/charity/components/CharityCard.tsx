import Link from "next/link";
import { NextImage } from "../../../common/components/NextImage";
import styled from "astroturf/react";
import { CharityT } from "../interfaces/charity";
import { Articles } from "../../articles/components/Articles";

export const CharityCard = (props: CharityT) => {
  return (
    <Link href={`/charity/${props.id}`}>
      <Container>
        <ContainerImage>
          <NextImage
            style={{ objectFit: "cover", borderRadius: "32px 32px 0 0" }}
            src={props.image}
            alt={"blog"}
          />
        </ContainerImage>
        <Content>
          <Title>{props.title}</Title>
          <ContainerDate>
            <Articles.DateAndView date={props.date} view={props.view} time={props.time} />
            {props.date ? (
              <DateMobile>
                {new Date(props.date).toLocaleString("ru", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DateMobile>
            ) : null}
          </ContainerDate>
        </Content>
      </Container>
    </Link>
  );
};

const ContainerDate = styled.div`
  @import "variables";

  margin-top: 22px;
  transition: all 0.3s ease-in-out;

  @include respond-to(small) {
    margin-top: 12px;

    & > div:first-child {
      display: none;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  transition: all 0.3s ease-in-out;
  position: relative;
  margin-top: -32px;
  z-index: 1;
  border-radius: 32px;

  padding: 32px;
  background: $white;

  @include respond-to(small) {
    padding: 20px;
  }
`;

const Title = styled.h4`
  @import "variables";

  display: -webkit-box;
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  color: $black;
  height: 100px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @include respond-to(small) {
    font-size: 14px;
    height: 60px;
    -webkit-line-clamp: 3;
  }
`;

const Container = styled.div`
  @import "variables";

  position: relative;
  max-width: 500px;
  width: 100%;
  border-radius: 32px;
  cursor: pointer;

  div[class~="only-hover-charity"] {
    opacity: 0;
  }

  &:hover {
    box-shadow: $shadowHoverCard;
    ${Content} {
      margin-top: -62px;
    }
    ${ContainerDate} {
      margin-top: 52px;
    }
    div[class~="only-hover-charity"] {
      opacity: 1;
    }
  }

  @include respond-to(small) {
    &:hover {
      box-shadow: none;
      ${Content} {
        margin-top: -32px;
      }
      ${ContainerDate} {
        margin-top: 12px;
      }
    }
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  height: 200px;

  @include respond-to(small) {
    height: 170px;
  }
`;

const DateMobile = styled.div`
  @import "variables";

  display: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 126%;
  color: rgb($black, 0.4);

  @include respond-to(small) {
    display: block;
  }
`;
