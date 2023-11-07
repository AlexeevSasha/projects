import { Input } from "../../../common/components/inputs/Input";
import styled from "astroturf/react";
import { TextArea } from "../../../common/components/inputs/TextArea";
import { Checkbox } from "../../../common/components/inputs/Checkbox";
import { IconLocationArrow } from "../../../common/components/icons/IconLocationArrow";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../interfaces/orderForm";

export const OrderCourierDelivery = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<OrderFormT>();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <Container>
      <Input
        {...register("userAddress.street", {
          required: true,
        })}
        error={!!errors?.userAddress?.street}
        placeholder={"Укажите улицу и номер дома *"}
      />
      <Location onClick={getGeolocation}>
        <IconLocationArrow />
        <span>Определить мое местоположение</span>
      </Location>
      <InputsContainer>
        <Input
          {...register("userAddress.apartment", {
            required: true,
          })}
          error={!!errors?.userAddress?.apartment}
          placeholder={"Квартира *"}
        />
        <Input {...register("userAddress.entrance")} placeholder={"Подъезд"} />
      </InputsContainer>
      <InputsContainer>
        <Input
          {...register("userAddress", {
            required: true,
          })}
          error={!!errors?.userAddress?.floor}
          placeholder={"Этаж *"}
        />
        <Input {...register("userAddress.intercom")} placeholder={"Домофон"} />
      </InputsContainer>
      <TextArea
        {...register("userAddress.description")}
        placeholder={"Напишите сообщение курьеру"}
      />
      <Checkbox
        {...register("userAddress.isSaveAddress")}
        id={"save-data"}
        label={"Сохранить данные"}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;

  & > :last-child {
    margin-top: 12px;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
`;
const Location = styled.div`
  @import "variables";

  cursor: pointer;
  display: flex;
  align-items: center;
  color: $blue1;
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;

  svg {
    margin-right: 12px;
  }
`;
