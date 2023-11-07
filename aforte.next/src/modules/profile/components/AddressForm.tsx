import styled from "astroturf/react";
import { Button } from "common/components/Button";
import { IconLocationArrow } from "common/components/icons/IconLocationArrow";
import { IconRemove } from "common/components/icons/IconRemove";
import { Input } from "common/components/inputs/Input";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { UserAddressT } from "../interfaces/userAddress";

export interface IAddressForm {
  street: string;
  apartment: number;
  entrance: number;
  floor: number;
  intercom: number;
  description: string;
}

type Props = {
  address: UserAddressT[];
};

export const AddressForm = ({ address }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      test: address,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "test" });

  const [edding, setEdding] = useState<number | undefined>(undefined);

  const onSubmit = async (data: any) => {
    setEdding(undefined);
    console.log(data);
  };

  const getGeolocation = (index: number) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
      setValue(`test.${index}.lat`, position.coords.latitude);
      setValue(`test.${index}.lon`, position.coords.longitude);
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ id, lat, lon, street, apartment, entrance, floor }, index) => {
          console.log("index", index);
          console.log("edding", edding);
          return (
            <Wrapper key={id}>
              <MapContainer edding={edding === index}>
                <YMaps
                  query={{ load: "package.full", apikey: "85937b28-7a2e-44aa-8640-7142b7b82f41" }}
                >
                  <Map
                    state={{
                      center: [lat ? lat : 0, lon ? lon : 0],
                      zoom: 14,
                    }}
                    width={"100%"}
                    height={edding === index ? "150px" : "250px"}
                  >
                    {lat && lon ? (
                      <Placemark
                        geometry={[lat, lon]}
                        options={{
                          iconLayout: "default#image",
                          iconImageHref: "/images/union.png",
                          iconImageSize: [48, 53],
                          iconColor: "green",
                        }}
                      />
                    ) : null}
                  </Map>
                </YMaps>
                {edding !== index && getValues(`test.${index}.street`) ? (
                  <DeliveryActionBlock>
                    <Street>
                      {street} кв. {apartment}
                    </Street>
                    <Row>
                      <HomeNumber>
                        {entrance} подъезд, {floor} этаж
                      </HomeNumber>
                      <CustomButtom
                        onClick={() => setEdding(index)}
                        disabled={
                          edding !== undefined ||
                          (fields.length && !getValues(`test.${fields.length - 1}.street`))
                        }
                      >
                        Изменить
                      </CustomButtom>
                    </Row>
                  </DeliveryActionBlock>
                ) : (
                  <DeleteBlock
                    onClick={() => {
                      remove(index);
                      setEdding(undefined);
                    }}
                  >
                    <IconRemove />
                    <span>Удалить</span>
                  </DeleteBlock>
                )}
              </MapContainer>
              {(edding === index || !getValues(`test.${index}.street`)) && (
                <InputConteiner>
                  <Input
                    {...register(`test.${index}.street`, {
                      required: true,
                    })}
                    error={!!errors?.test?.[index]?.street}
                    placeholder={"Улица, дом"}
                  />
                  <GeolocationBlock>
                    <IconLocationArrow />
                    <LocationButton onClick={() => getGeolocation(index)}>
                      Определить мое местоположение
                    </LocationButton>
                  </GeolocationBlock>
                  <InputBlock>
                    <Input
                      {...register(`test.${index}.apartment`, {
                        required: true,
                      })}
                      placeholder={"Квартира"}
                      error={!!errors?.test?.[index]?.apartment}
                    />
                    <Input
                      {...register(`test.${index}.entrance`, {
                        required: true,
                      })}
                      placeholder={"Подъезд"}
                      error={!!errors?.test?.[index]?.entrance}
                    />
                  </InputBlock>
                  <InputBlock>
                    <Input
                      {...register(`test.${index}.floor`, {
                        required: true,
                      })}
                      placeholder={"Этаж *"}
                      error={!!errors?.test?.[index]?.floor}
                    />
                    <Input
                      {...register(`test.${index}.intercom`, {
                        required: true,
                      })}
                      placeholder={"Домофон"}
                      error={!!errors?.test?.[index]?.intercom}
                    />
                  </InputBlock>
                  <Input
                    {...register(`test.${index}.description`, {
                      required: true,
                    })}
                    placeholder={"Напишите сообщение курьеру"}
                    error={!!errors?.test?.[index]?.description}
                  />
                  <SaveButton typeBtn={"blue"} type="submit">
                    Сохранить
                  </SaveButton>
                </InputConteiner>
              )}
            </Wrapper>
          );
        })}
        <CustomButton
          typeBtn={"lightBlue"}
          onClick={() => {
            append({} as UserAddressT); // проверить
            setEdding(fields.length);
          }}
          type="button"
          disabled={
            edding !== undefined ||
            (fields.length && !getValues(`test.${fields.length - 1}.street`))
          }
        >
          Добавить еще адрес
        </CustomButton>
      </form>
    </Container>
  );
};

const Wrapper = styled.div`
  @import "variables";
  margin-bottom: 24px;
  @include respond-to(small) {
    margin-bottom: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 0px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  width: 100%;
  div:first-child {
    margin-right: 12px;
  }
`;
const CustomButton = styled(Button)`
  width: 100%;
  padding: 16.5px 0px;
`;

const SaveButton = styled(CustomButton)`
  margin-top: 12px;
`;
const GeolocationBlock = styled.div`
  margin: 12px 0px;
  display: flex;
  flex-direction: row;
`;
const LocationButton = styled.span`
  @import "variables";
  font-weight: 600;
  font-size: 14px;
  line-height: 137%;
  color: $blue1;
  margin-left: 12px;
  cursor: pointer;
`;

const MapContainer = styled.div<{ edding?: boolean }>`
  @import "variables";
  height: 250px;
  border-radius: 28px;
  display: flex;
  align-items: flex-end;
  position: relative;
  &.edding {
    height: 150px;
    margin-bottom: 12px;
  }
  @include respond-to(small) {
    border-radius: 20px;
  }
`;

const InputConteiner = styled.div`
  margin-bottom: 12px;
`;

const DeliveryActionBlock = styled.div`
  @import "variables";
  display: flex;
  position: absolute;
  flex-direction: column;
  border-radius: 32px;
  background: $white;
  padding: 24px;
  margin: 8px;
  @include respond-to(small) {
    border-radius: 20px;
    padding: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;
const HomeNumber = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  opacity: 0.4;
`;

const Street = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
`;

const CustomButtom = styled(Button)`
  @import "variables";
  background: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 126%;
  color: $blue1;
`;
const DeleteBlock = styled.div`
  @import "variables";
  position: absolute;
  margin: 12px;
  padding: 10px;
  background: $white;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  right: 0px;
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 137%;
    color: $orange3;
    margin-left: 12px;
  }
  svg {
    path {
      fill: $orange3;
      opacity: 0.5;
    }
  }
  &:hover {
    svg {
      path {
        fill: $orange3;
        opacity: 0.5;
      }
    }
  }
`;
