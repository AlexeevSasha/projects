import { FC, ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { IconArrowDown } from "../../assets/icon/iconArrowDown";
import { theme } from "../../assets/theme/theme";

interface IProps {
  title?: string;
  customTitle?: ReactNode;
  className?: string;
  defaultState?: boolean;
  showPanel?: boolean;
  onClick?: () => void;
  id?: string;
}

export const DropdownList: FC<IProps> = (props) => {
  const [isOpenedPanel, setIsOpenedPanel] = useState(props.defaultState);

  useEffect(() => {
    setIsOpenedPanel(props.defaultState);
  }, [props.defaultState]);

  const headerClick = () => {
    setIsOpenedPanel(!isOpenedPanel);
    !isOpenedPanel && props.onClick?.();
  };

  return (
    <DropdownContainer className={props.className}>
      <Anchor id={props.id} />
      <ContainerHeader hideBorder={isOpenedPanel} onClick={headerClick}>
        {props.customTitle}
        {props.title && <Title isOpened={isOpenedPanel}>{props.title}</Title>}
        <IconArrowDown rotate={isOpenedPanel ? "180deg" : "0"} size="md" />
      </ContainerHeader>

      {isOpenedPanel && props.children}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 3.13vw 0 0;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 6.4vw 0 0;
  }
`;

const Anchor = styled.span`
  display: block;
  height: 4.32vw; /*same height as header*/
  margin-top: -4.32vw;
  visibility: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 8.86vw; /*same height as header*/
    margin-top: -8.86vw; /*same height as header */
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 18.13vw; /*same height as header*/
    margin-top: -18.13vw; /*same height as header*/
  }
`;

const ContainerHeader = styled.div<{ hideBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.hideBorder ? "" : "0.05vw solid " + props.theme.colors.grayDark_gray1)};
  padding: ${(props) => (props.hideBorder ? "3.44vw 0 2.71vw" : "3.44vw 0 0.57vw")};
  color: ${({ theme }) => theme.colors.white_black};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    border-bottom-width: 0.13vw;
    padding: ${(props) => (props.hideBorder ? "0 0 5.22vw 0" : "0 0 2.09vw 0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    border-bottom-width: 0.27vw;
    padding: ${(props) => (props.hideBorder ? "0 0 7.47vw 0" : "0")};
  }
`;

const Title = styled.h3<{ isOpened?: boolean }>`
  color: ${({ theme }) => theme.colors.white_black};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.67vw;
  font-weight: 700;
  margin: 0;
  padding-bottom: ${(props) => (props.isOpened ? "0.89vw" : "0")};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 8.52vw;
  }
`;
