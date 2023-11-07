import styled from "astroturf/react";
import { NextImage } from "../../../common/components/NextImage";
import { ArticleT } from "../interfaces/article";
import { DateAndView } from "./DateAndView";
import Link from "next/link";

export const ArticleCard = (props: ArticleT) => {
  return (
    <Link href={`/blog/${props.id}`}>
      <Container>
        <Tag>{props.label}</Tag>
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
            <DateAndView date={props.date} view={props.view} time={props.time} />
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

  margin-top: 30px;
  transition: all 0.3s ease-in-out;

  @include respond-to(small) {
    margin-top: 16px;
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
  height: 75px;
  overflow: hidden;
  -webkit-line-clamp: 3;
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
  max-width: 420px;
  width: 100%;
  border-radius: 32px;
  cursor: pointer;

  &:hover {
    box-shadow: $shadowHoverCard;
    ${Content} {
      margin-top: -62px;
    }
    ${ContainerDate} {
      margin-top: 60px;
    }
  }

  @include respond-to(small) {
    &:hover {
      box-shadow: none;
      ${Content} {
        margin-top: -42px;
      }
      ${ContainerDate} {
        margin-top: 26px;
      }
    }
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  height: 200px;

  @include respond-to(small) {
    height: 124px;
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

const Tag = styled.div`
  @import "variables";

  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  color: $white;
  border-radius: 28px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: $orange1;

  @include respond-to(small) {
    padding: 8px 12px;
  }
`;
