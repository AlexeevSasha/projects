import styled from "astroturf/react";
import { Button } from "../../../../common/components/Button";
import { Comment } from "./Comment";
import { Filters } from "../../../filters/components/Filters";
import { ArticleCommentsT } from "../../interfaces/articleComments";
import { useState } from "react";
import { Forms } from "../../../forms/components";

export const Comments = (props: ArticleCommentsT) => {
  const [showMore, setShowMore] = useState(3);
  const handleClick = () => setShowMore((prev) => prev + 3);

  return (
    <Container>
      <Head>
        <Title>
          Комментарии <span>{props.count}</span>
        </Title>
        <Forms.AddComment />
        <Filters.Sorting />
      </Head>
      <Content>
        {props.comments.slice(0, showMore).map((el) => (
          <Comment key={el.id} {...el} />
        ))}
      </Content>
      {showMore <= props.count && (
        <CustomButton onClick={handleClick} typeBtn={"lightBlue"}>
          Показать больше комментарий
        </CustomButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  background: $white;
  color: $black;
  padding: 40px;
  border-radius: 32px;

  @include respond-to(small) {
    padding: 20px;
  }
`;

const Head = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr fit-content(250px);

  & > div:nth-child(2) {
    grid-row-start: 2;
    grid-column-start: 1;
    grid-column-end: 3;
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid rgba(22, 30, 37, 0.1);
    width: 100%;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    & > div:nth-child(2) {
      grid-row-start: 2;
      grid-column-start: 1;
      grid-column-end: 1;
      padding-top: 0;
      margin: 16px 0 24px;
      border-top: none;
      width: 100%;
    }
    margin-bottom: 16px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 18px;
  line-height: 137%;
  letter-spacing: 0.02em;

  span {
    color: rgb($black, 0.5);
  }

  & > div:last-child {
    display: none;
  }

  @include respond-to(small) {
    & > div:last-child {
      display: block;
    }
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  padding: 20px 0;
  width: 100%;
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 40px;
  margin: 40px 0;

  & > div:last-child {
    border: none;
    padding: 0;
  }

  @include respond-to(small) {
    margin: 24px 0;
    grid-gap: 24px;
  }
`;
