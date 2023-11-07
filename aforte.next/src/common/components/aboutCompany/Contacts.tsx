import styled from "astroturf/react";
import { IconPhone } from "../icons/IconPhone";
import { IconEmail } from "../icons/IconEmail";
import { CompanyT } from "../../interfaces/company";
import { XSSProtection } from "../../../modules/products/utils/XSSProtection";

type Props = Pick<CompanyT, "contacts">;

export const Contacts = ({ contacts }: Props) => {
  return (
    <Container>
      <h3>{contacts.title}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: XSSProtection(contacts.description.replace(/(\r\n|\r|\n)/g, "<br>")),
        }}
      />
      <ContainerCards>
        {contacts?.info.map((el, i) => (
          <ContainerCard key={i}>
            <CircleIcon icon={el.type}>
              {el.type === "phone" ? <IconPhone /> : <IconEmail />}
            </CircleIcon>
            <div>
              <div>{el.title}</div>
              <span>{el.description}</span>
            </div>
          </ContainerCard>
        ))}
      </ContainerCards>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  border-radius: 40px;
  padding: 40px;
  background: $white;
  color: $black;

  h3 {
    font-weight: 600;
    font-size: 20px;
    margin: 0;
  }

  p {
    margin: 20px 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0.02em;
  }

  @include respond-to(small) {
    padding: 24px 20px 28px;

    h3 {
      font-size: 18px;
    }

    p {
      margin: 16px 0 24px;
      font-size: 14px;
    }
  }
`;

const ContainerCards = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 20px;

  @include respond-to(small) {
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
  }
`;

const ContainerCard = styled.div`
  @import "variables";

  cursor: pointer;
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  grid-column-gap: 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;

  span {
    margin-top: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 137%;
    letter-spacing: 0.02em;
    opacity: 0.4;
  }
  @include respond-to(small) {
    align-items: start;
  }
`;

const CircleIcon = styled.div<{ icon?: "phone" | "email" }>`
  @import "variables";

  width: 48px;
  height: 48px;
  padding: 16px;
  background: rgba(83, 131, 199, 0.1);
  border-radius: 50%;

  svg {
    opacity: 0.6;
    display: block;
    width: 16px;
    height: 16px;

    path {
      fill: $blue1;
    }
  }

  &.icon-phone {
    rotate: 270deg;
  }
`;
