import styled from "astroturf/react";
import { Button } from "../../../common/components/Button";
import { IconRightArray } from "../../../common/components/icons/IconArray";
import Link from "next/link";

export const ProductAnalogue = () => {
  return (
    <Container>
      <Title>
        Мы нашли <span>22 аналога</span> к этому товару
      </Title>
      <Link href={"/product/metacatalogue/analogs"}>
        <CustomButton typeBtn={"lightBlue"}>
          <span>Посмотреть</span>
          <IconRightArray />
        </CustomButton>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  color: $black;
  padding: 20px 30px;
  border-radius: 32px;
`;

const Title = styled.div`
  @import "variables";

  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;

  span {
    color: $blue1;
    font-weight: 600;
  }
`;

const CustomButton = styled(Button)`
  @import "variables";

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 50px;
  margin-left: 10px;

  svg {
    display: none;
  }

  @include respond-to(small) {
    border-radius: 50%;
    padding: 0;
    min-width: 40px;
    height: 40px;
    svg {
      display: block;
      width: 16px;
      height: 12px;
    }
    span {
      display: none;
    }
  }
`;
