import React from "react";
import styled from "styled-components";
import { SwiperProps } from "swiper/react";
import { theme } from "../../assets/theme/theme";
import { ReactSwiper } from "./ReactSwiper";
import { SwiperArrowsBlock } from "./SwiperArrowsBlock";

type IProps<T> = {
  className: string;
  title?: JSX.Element | string;
  itemsList?: T[];
  renderSeeAll?: JSX.Element;
  children: (elem: T) => JSX.Element;
  swipeProps?: SwiperProps;
  hideControls?: boolean;
};

export const SwipeWithControl = <T extends unknown>({ className, renderSeeAll, itemsList, ...props }: IProps<T>) => {
  return (
    <Container>
      <MovementBlock className="swiper-controls">
        <Title className="swiper-title" addPadding={!!renderSeeAll}>
          {props.title}
        </Title>

        {!props.hideControls && (
          <SwiperArrowsBlock btnClassName={className} disabledNext={itemsList && itemsList.length <= 3} />
        )}

        {renderSeeAll}
      </MovementBlock>

      {itemsList && (
        <ReactSwiper<T>
          className={className}
          navigation={{ prevEl: `.swiper-button-prev_${className}`, nextEl: `.swiper-button-next_${className}` }}
          slidesPerView="auto"
          itemsList={itemsList}
          render={props.children}
          {...props.swipeProps}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Title = styled.h2<{ addPadding?: boolean }>`
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: 600;
  font-size: 3.23vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    width: 72vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-right: ${({ addPadding }) => addPadding && "29.33vw"};
    font-size: 8.53vw;
    width: auto;
  }
`;

const MovementBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 3.75vw;
  width: 100%;
  color: ${theme.colors.white};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 6.78vw;
    align-items: baseline;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.53vw;
  }
`;
