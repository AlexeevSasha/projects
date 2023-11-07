import styled from "astroturf/react";
import { Checkbox } from "../../../common/components/inputs/Checkbox";
import { ChangeEvent, useState } from "react";
import { Input } from "../../../common/components/inputs/Input";

export const PromoCode = () => {
  const [active, setActive] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
  };

  return (
    <Container>
      <Wrapper>
        <Checkbox
          onChange={(e) => onChange(e)}
          id={"use-promo-code"}
          label={"Использовать промокод"}
        />
        {active && (
          <div>
            <Input placeholder={"Промокод"} />
            <Link>Правила использования промокодов</Link>
          </div>
        )}
      </Wrapper>
      <CheckboxContainer>
        <Checkbox id={"promo-code-points"} />
        <label htmlFor="promo-code-points">
          Списать <span>345 баллов</span> из 453
        </label>
      </CheckboxContainer>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  background: $white;
  color: $black;
  border-radius: 28px;
  padding: 24px;
`;

const CheckboxContainer = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  grid-column-gap: 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 137%;
  border-top: 1px solid $blue-2;
  margin-top: 20px;
  padding-top: 20px;

  label {
    cursor: pointer;
  }

  span {
    color: $blue1;
    font-weight: 600;
  }
`;

const Wrapper = styled.div`
  @import "variables";

  display: grid;
  grid-gap: 16px;
`;

const Link = styled.p`
  @import "variables";

  font-weight: 500;
  font-size: 13px;
  line-height: 137%;
  letter-spacing: 0.02em;
  color: $blue1;
  cursor: pointer;
`;
