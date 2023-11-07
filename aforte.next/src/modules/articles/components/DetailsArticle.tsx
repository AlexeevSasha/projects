import styled from "astroturf/react";
import { DateAndView } from "./DateAndView";
import { Share } from "../../../common/components/shareSocial/Share";
import { NextImage } from "../../../common/components/NextImage";
import { Author } from "./Author";
import { ArticleDetailsT } from "../interfaces/articleDetails";
import { XSSProtection } from "../../products/utils/XSSProtection";
import Link from "next/link";
import { IconList } from "../../../common/components/icons/IconList";
import { Button } from "../../../common/components/Button";
import { useContext } from "react";
import { AppContext } from "../../../common/components/ContextProvider";
import { ModalNames } from "../../../common/interfaces/modal";
import { AnchorOfArticle } from "./AnchorOfArticle";

export const DetailsArticle = (props: ArticleDetailsT) => {
  const { openModal } = useContext(AppContext);
  return (
    <Container>
      <div>
        <ContainerShare>
          <span>{props.label}</span>
          <Share />
        </ContainerShare>
        <Title>{props.title}</Title>
        <DateAndView view={props.view} date={props.date} time={props.time} />
        <CustomButton
          onClick={() =>
            openModal(ModalNames.POPUP_MODAL, {
              children: <AnchorOfArticle anchors={props.anchors} />,
            })
          }
          typeBtn={"lightBlue"}
        >
          <IconList /> Содержание статьи
        </CustomButton>
        <ContainerImage>
          <NextImage
            style={{ objectFit: "cover", borderRadius: 32 }}
            src={props.image}
            alt={"article-details"}
          />
        </ContainerImage>
      </div>
      <Content
        dangerouslySetInnerHTML={{
          __html: XSSProtection(props.description.replace(/(\r\n|\r|\n)/g, "<br>")),
        }}
      />
      <Link href={`/blog/author/${props.author.id}`}>
        <Author {...props.author} />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 40px;
  border-radius: 40px;
  background: $white;
  padding: 32px 40px 48px;
  color: $black;

  @include respond-to(small) {
    padding: 20px 20px 28px;
    grid-gap: 28px;
  }
`;

const ContainerShare = styled.div`
  @import "variables";

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  color: $blue1;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  @import "variables";

  margin: 0 0 20px 0;
  font-weight: 600;
  font-size: 28px;
  line-height: 137%;

  @include respond-to(small) {
    font-size: 20px;
    margin: 0 0 8px 0;
  }
`;

const ContainerImage = styled.div`
  @import "variables";

  margin-top: 20px;
  border-radius: 32px;
  max-width: 1920px;
  height: 380px;

  @include respond-to(small) {
    height: 190px;
    margin-top: 16px;
  }
`;

const Content = styled.div`
  @import "variables";

  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;

  & > :last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0 0 12px;
  }

  ul,
  ol {
    margin: 0 0 20px;
    padding: 0;
    display: grid;
    grid-gap: 6px;

    li::marker {
      color: $greenMain;
    }
  }

  li {
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
    margin-left: 16px;
    padding-left: 10px;
  }

  h3 {
    scroll-margin-top: 100px;
    margin: 40px 0 20px 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 137%;
  }

  @include respond-to(small) {
    h3 {
      scroll-margin-top: 109px;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  display: none;
  align-items: center;
  width: 100%;
  padding: 10px 24px;
  text-align: start;

  svg {
    margin-right: 16px;
  }

  @include respond-to(small) {
    display: flex;
    margin-top: 16px;
  }
`;
