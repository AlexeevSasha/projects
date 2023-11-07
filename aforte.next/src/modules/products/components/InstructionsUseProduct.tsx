import styled from "astroturf/react";
import { XSSProtection } from "../utils/XSSProtection";
import Link from "next/link";
import { ProductT } from "../interfaces/product";
import { DescriptionSections } from "./DescriptionSections";

type Props = Pick<ProductT, "description" | "descriptionSections">;

export const InstructionsUseProduct = ({ description, descriptionSections }: Props) => {
  return (
    <Container>
      <Wrapper>
        {description ? (
          <Description
            dangerouslySetInnerHTML={{
              __html: XSSProtection(description.replace(/(\r\n|\r|\n)/g, "<br>")),
            }}
          />
        ) : null}
        <Header>Инструкция по применению</Header>
        <DescriptionSections descriptionSections={descriptionSections} />
      </Wrapper>
      <TextFooter>
        Купить Фарингосепт 10 мг 10 шт. таблетки для рассасывания в Москве можно в удобной для вас
        аптеке, сделав заказ на polza.ru. <Link href={"#"}>Доступно в 568 аптеках.</Link> Цена на
        Фарингосепт 10 мг 10 шт. таблетки для рассасывания в Москве — от 156 рублей.{" "}
        <Link href={"#"}>
          Инструкция по применению для Фарингосепт 10 мг 10 шт. таблетки для рассасывания.
        </Link>
      </TextFooter>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  color: $black;
  background: $white;
  border-radius: 32px;

  @include respond-to(small) {
    background: transparent;
  }
`;

const Wrapper = styled.div`
  @import "variables";

  background: $white;
  padding: 40px;
  border-radius: 32px;

  @include respond-to(small) {
    padding: 20px 16px 16px;
  }
`;

const TextFooter = styled.div`
  @import "variables";

  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  padding: 0 40px 40px;

  a {
    color: $blue1;
  }

  @include respond-to(small) {
    padding: 20px 16px 16px;
  }
`;

const Description = styled.div`
  @import "variables";

  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.02em;
  margin-bottom: 40px;

  @include respond-to(small) {
    margin: 0 0 20px;
    line-height: 160%;
  }
`;

const Header = styled.h3`
  @import "variables";

  margin: 0 0 40px;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  letter-spacing: 0.02em;

  @include respond-to(small) {
    font-size: 18px;
    margin: 0 0 16px;
  }
`;
