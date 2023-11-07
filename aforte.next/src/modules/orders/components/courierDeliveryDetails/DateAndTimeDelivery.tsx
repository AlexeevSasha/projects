import styled from "astroturf/react";
import { IconTime } from "../../../../common/components/icons/IconTime";
import { Select } from "../../../../common/components/inputs/Select";
import { CustomSwiper } from "../../../slider/components/CustomSwiper";
import { useEffect, useMemo, useState } from "react";
import { DeliveryTimeT } from "../../interfaces/order";
import { useFormContext } from "react-hook-form";
import { OrderFormT } from "../../../forms/interfaces/orderForm";

type Props = {
  deliveryTime: DeliveryTimeT[];
};

export const DateAndTimeDelivery = ({ deliveryTime }: Props) => {
  const { setValue } = useFormContext<OrderFormT>();
  const optionsSelect = useMemo(
    () => deliveryTime.map((el) => ({ value: el.value, label: el.label })),
    [deliveryTime]
  );
  const [selected, setSelected] = useState(optionsSelect[0]);

  const timeline = useMemo(
    () => deliveryTime.find((el) => el.label === selected.label)?.timeline,
    [selected]
  );

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(() => {
      const currentTime = timeline ? timeline[0]?.value : "";
      setValue("deliveryTime", `${selected.value} в ${currentTime}`);
      return currentTime;
    });
  }, [timeline]);

  return (
    <ContainerGrid>
      <Title>
        <IconTime />
        <span>Дата и время доставки</span>
      </Title>
      <Content>
        <Select
          setSelectedOption={setSelected}
          selectedOption={optionsSelect[0]}
          options={optionsSelect}
        />
        {timeline?.length ? (
          <CustomSwiper<{ value: string; label: string }>
            arrowSettings={{
              hidden: true,
            }}
            sliderSettings={{
              desktopSB: 8,
              mobileSB: 8,
            }}
            id={"time-delivery"}
            items={timeline}
          >
            {(param) => (
              <TagTime
                onClick={() => {
                  setValue("deliveryTime", `${selected.value} в ${param.value}`);
                  setCurrentTime(param.value);
                }}
                active={currentTime === param.value}
              >
                {param.value}
              </TagTime>
            )}
          </CustomSwiper>
        ) : null}
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

const Title = styled.div`
  @import "variables";

  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 16px;

    path {
      fill: $blue1;
    }
  }
`;

const Content = styled.div`
  @import "variables";

  display: grid;
  grid-template-columns: minmax(300px, 1fr);
  grid-row-gap: 12px;

  & > div:first-child {
    max-width: 390px;
    width: 100%;
  }

  @include respond-to(small) {
    margin-top: 16px;
  }
`;

const TagTime = styled.div<{ active: boolean }>`
  @import "variables";

  cursor: pointer;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 137%;
  border: 2px solid $border;
  border-radius: 16px;

  &.active {
    border: 2px solid $blue1;
  }
`;
