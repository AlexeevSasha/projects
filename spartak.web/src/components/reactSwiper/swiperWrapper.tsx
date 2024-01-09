import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ContainerContent } from "../containers/containerContent";

export const SwiperWrapper = styled(ContainerContent)`
  & .swiper {
    width: 91vw;

    & .swiper-slide {
      width: 26.67vw;
      margin-right: 1.25vw;
    }

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      width: 97vw;

      & .swiper-slide {
        width: 77.71vw;
        margin-right: 2.09vw;
      }
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      width: 94.47vw;

      & .swiper-slide {
        width: 75.73vw;
        height: auto;
        margin-right: 3.2vw;
      }
    }

    & > .swiper-scrollbar {
      background: ${({ theme }) => theme.colors.blackLight_whiteGray};
      display: none;

      @media screen and (max-width: ${theme.rubberSize.desktop}) {
        display: block;
        height: 1.3vw;
        left: 0;
        width: 100%;
        border-radius: unset;
      }

      @media screen and (max-width: ${theme.rubberSize.tablet}) {
        height: 1.07vw;
      }
    }

    & .swiper-scrollbar-drag {
      background: ${({ theme }) => theme.colors.grayDark_gray1};
      border-radius: unset;
    }
  }
`;
