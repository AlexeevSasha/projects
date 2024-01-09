import React from "react";
import styled from "styled-components";
import { IconArrowRight } from "../../assets/icon/iconArrowRight";
import { theme } from "../../assets/theme/theme";
import { CustomButton } from "../buttons/customButton";

type Props = {
  btnClassName: string;
  disabledNext?: boolean;
};

export const SwiperArrowsBlock = ({ btnClassName, disabledNext }: Props) => {
  return (
    <>
      <ArrowsBlock>
        <ArrowButton disabled={disabledNext} className={`swiper-button-prev_${btnClassName}`} type={"opacity"}>
          <IconArrowRight disabled={disabledNext} rotate={"180deg"} />
        </ArrowButton>

        <ArrowButton disabled={disabledNext} className={`swiper-button-next_${btnClassName}`} type={"opacity"}>
          <IconArrowRight disabled={disabledNext} />
        </ArrowButton>
      </ArrowsBlock>
    </>
  );
};

const ArrowsBlock = styled.div`
  display: flex;
  justify-content: right;
  height: min-content;
  user-select: none;

  & > div {
    border-color: ${({ theme }) => theme.colors.grayLight_gray1};
  }

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_gray1};
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    display: none;
  }
`;

const ArrowButton = styled(CustomButton)`
  padding: 0.83vw;

  svg {
    path {
      stroke: ${({ theme }) => theme.colors.grayLight_gray1};
    }
  }
`;
