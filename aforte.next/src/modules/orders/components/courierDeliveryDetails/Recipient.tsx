import styled from "astroturf/react";
import { IconPerson } from "../../../../common/components/icons/IconPerson";
import { Input } from "../../../../common/components/inputs/Input";
import { useFormContext } from "react-hook-form";
import { phoneNumberFormatted } from "../../../profile/utils/phoneNumberFormatted";
import { OrderFormT } from "../../../forms/interfaces/orderForm";

export const Recipient = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<OrderFormT>();

  const { phone, name } = getValues("user");

  return (
    <ContainerGrid>
      <TitleContainer>
        <IconPerson />
        <span>Получатель</span>
      </TitleContainer>
      <Content>
        {name ? (
          <span className={"profile-name"}>{name}</span>
        ) : (
          <Input
            {...register("user.name", {
              required: true,
            })}
            error={!!errors?.user?.name}
            placeholder={"Имя *"}
          />
        )}

        {phone ? (
          <span>{phoneNumberFormatted(phone)}</span>
        ) : (
          <Input
            {...register("user.phone", {
              required: true,
            })}
            error={!!errors?.user?.phone}
            placeholder={"Номер телефона *"}
          />
        )}
      </Content>
    </ContainerGrid>
  );
};

const ContainerGrid = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: start;
  grid-column-gap: 24px;
  color: $black;

  @include respond-to(small) {
    grid-template-columns: 1fr;
  }
`;

const TitleContainer = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;

  svg {
    opacity: 0.3;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    ellipse {
      fill: $blue1;
    }
    path {
      fill: $blue1;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.02em;

  span[class="profile-name"] {
    font-weight: 600;
  }

  @include respond-to(small) {
    margin-top: 20px;
  }
`;
