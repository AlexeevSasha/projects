import { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

interface IProps {
  showScroll?: boolean;
  scrollTo?: boolean;
}

export const ContainerHorizontalScroll: FC<IProps> = ({ children, showScroll, scrollTo }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (scrollTo && ref.current) {
      ref.current.scrollTo(
        ref.current.children[0].children[1]?.offsetLeft -
          (window.innerWidth < 768 ? window.innerWidth * 0.0427 : window.innerWidth * 0.0313) || 0,
        0
      );
    }
  }, []);

  return (
    <ContainerScroll ref={ref} showScroll={showScroll}>
      {children}
    </ContainerScroll>
  );
};

export const ContainerScroll = styled.div<{ showScroll?: boolean }>`
  overflow: auto;
  display: flex;
  width: 100%;
  z-index: 5;

  &::-webkit-scrollbar-track-piece {
    background-color: ${({ theme }) => theme.colors.blackLight_whiteGray};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayDark_gray1};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: ${(props) => (props.showScroll ? "0 3.13vw" : "0")};
    gap: ${(props) => (props.showScroll ? "3.13vw" : "0")};
    ::-webkit-scrollbar {
      width: 6.52vw;
      height: ${(props) => (props.showScroll ? "1.3vw" : "0")};
      border-radius: unset;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: ${(props) => (props.showScroll ? "0 4.27vw" : "0")};
    gap: ${(props) => (props.showScroll ? "4.27vw" : "0")};
    ::-webkit-scrollbar {
      height: ${(props) => (props.showScroll ? "1.07vw" : "0")};
    }
  }
`;
