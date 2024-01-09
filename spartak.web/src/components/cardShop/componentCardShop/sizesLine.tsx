import styled from "styled-components";
import { IProduct } from "../../../api/dto/IProduct";
import { IconArrowDown } from "../../../assets/icon/iconArrowDown";
import { theme } from "../../../assets/theme/theme";
import { ReactSwiper } from "../../reactSwiper/ReactSwiper";
import { ItemSize } from "./ItemSize";

interface IProps {
  activeSize?: IProduct["appearence"][0]["list"][0];
  onClick: (value: IProduct["appearence"][0]["list"][0]) => void;
  activeAppearence: IProduct["appearence"][0];
}

export const SizesLine = ({ activeAppearence, activeSize, onClick }: IProps) => {
  return (
    <ContainerSizes>
      <IconContainer className="swiper-button-prev_size">
        <IconArrowDown rotate={"90deg"} />
      </IconContainer>
      <ReactSwiper<IProduct["appearence"][0]["list"][0]>
        className="sizeSwiper"
        navigation={{
          prevEl: ".swiper-button-prev_size",
          nextEl: ".swiper-button-next_size",
        }}
        slidesPerView={"auto"}
        itemsList={activeAppearence.list || []}
        render={(size, index) => (
          <ItemSize onClick={() => onClick(size)} checked={activeSize?.id === size.id} key={`${index}${size.size}`}>
            {size.size}
          </ItemSize>
        )}
        allowTouchMove={false}
        mousewheel={true}
      />
      <IconContainer className="swiper-button-next_size">
        <IconArrowDown rotate={"-90deg"} />
      </IconContainer>
    </ContainerSizes>
  );
};

const ContainerSizes = styled.div`
  display: flex;
  margin-bottom: 0.83vw;

  & .swiper {
    margin: 0 0.42vw !important;
    width: 100% !important;
    padding: 0 !important;
  }

  & .swiper-slide {
    width: fit-content !important;
    padding: 0;
    margin-right: 0.83vw !important;
  }

  & .swiper-button-disabled {
    opacity: 0.3 !important;
  }
`;

const IconContainer = styled.div`
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
`;
