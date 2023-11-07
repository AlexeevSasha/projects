import styled from "astroturf/react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { useForm, UseFormReturn } from "react-hook-form";
import { Input } from "../../../../common/components/inputs/Input";
import { IconLocationArrow } from "../../../../common/components/icons/IconLocationArrow";
import { TextArea } from "../../../../common/components/inputs/TextArea";
import { Button } from "../../../../common/components/Button";
import { UserAddressT } from "../../../profile/interfaces/userAddress";
import { OrderFormT } from "../../../forms/interfaces/orderForm";
import { ModalNames } from "../../../../common/interfaces/modal";
import { useContext } from "react";
import { AppContext } from "../../../../common/components/ContextProvider";

type Props = {
  method: UseFormReturn<OrderFormT>;
  userAddress: UserAddressT;
};

export const CourierDeliveryDetailsModal = ({ method, userAddress }: Props) => {
  const { closeModal } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddressT>({
    defaultValues: {
      ...userAddress,
    },
  });
  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  };
  const onSubmit = (address: UserAddressT) => {
    method.setValue("userAddress", address);
    closeModal?.(ModalNames.POPUP_MODAL);
  };

  return (
    <Container>
      <ContainerForm>
        <Title>Адрес доставки</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Location onClick={getGeolocation}>
            <IconLocationArrow />
            <span>Определить мое местоположение</span>
          </Location>
          <Input
            {...register("street", {
              required: true,
            })}
            error={!!errors.street}
            placeholder={"Укажите улицу и номер дома *"}
          />
          <InputsContainer>
            <Input
              {...register("apartment", {
                required: true,
              })}
              error={!!errors.apartment}
              placeholder={"Квартира *"}
            />
            <Input {...register("entrance")} placeholder={"Подъезд"} />
          </InputsContainer>
          <InputsContainer>
            <Input
              {...register("floor", {
                required: true,
              })}
              error={!!errors.floor}
              placeholder={"Этаж *"}
            />
            <Input {...register("intercom")} placeholder={"Домофон"} />
          </InputsContainer>
          <TextArea {...register("description")} placeholder={"Напишите сообщение курьеру"} />
          <CustomButton type={"submit"} typeBtn={"blue"}>
            Доставить сюда
          </CustomButton>
        </form>
      </ContainerForm>
      <ContainerMap>
        <TitleMobile>Адрес доставки</TitleMobile>
        <YMaps>
          <Map
            state={{ center: [userAddress.lat || 55.75, userAddress.lon || 37.57], zoom: 14 }}
            width={"100%"}
            height={"100%"}
          >
            <Placemark
              geometry={[userAddress.lat || 55.75, userAddress.lon || 37.57]}
              options={{
                iconLayout: "default#image",
                iconImageHref: "/images/union.png",
                iconImageSize: [48, 53],
                iconColor: "green",
              }}
            />
          </Map>
        </YMaps>
      </ContainerMap>
    </Container>
  );
};

const Container = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 960px;
  color: $black;

  @media (max-width: 1100px) {
    width: 650px;
  }

  @include respond-to(small) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const ContainerForm = styled.div`
  @import "variables";

  padding: 32px;

  form {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 12px;
  }

  @include respond-to(small) {
    padding: 16px;
  }
`;

const Title = styled.div`
  @import "variables";

  font-weight: 600;
  font-size: 22px;
  line-height: 137%;
  margin-bottom: 18px;

  @include respond-to(small) {
    display: none;
  }
`;

const TitleMobile = styled.div`
  @import "variables";

  display: none;
  font-weight: 600;
  font-size: 20px;
  line-height: 137%;
  margin-bottom: 12px;
  margin-left: 20px;

  @include respond-to(small) {
    display: block;
  }
`;

const ContainerMap = styled.div`
  @import "variables";

  border-radius: 0 32px 32px 0;
  overflow: hidden;
  [class*="ymaps-2"][class*="-ground-pane"] {
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><filter id=\\'grayscale\\'><feColorMatrix type=\\'matrix\\' values=\\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\\'/></filter></svg>#grayscale");
    /* Firefox 3.5+ */
    -webkit-filter: grayscale(100%);
    /* Chrome 19+ & Safari 6+ */
  }

  @include respond-to(small) {
    padding-top: 20px;
    border-radius: 0;
    grid-row: 1;
    height: 250px;
  }
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
  margin-bottom: 12px;

  svg {
    margin-right: 12px;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
`;

const CustomButton = styled(Button)`
  padding: 15px;
  width: 100%;
  margin-top: 12px;
`;
