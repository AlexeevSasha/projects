import { theme } from "common/styles/theme";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { styled } from "../../styles/styled";
import { IconArrow } from "../Icon/IconArrow";

interface IProps {
  title: string;
  max_width?: number;
  max_height?: number;
  min_height?: number;
  error?: boolean;
  success?: boolean;
  onUpdateChildren?: any;
  close?: boolean;
  // onClose?: () => void;
  id?: string;
  onClick?: () => void;
  isEmpty?: boolean;
  overflowY?: "scroll";
  contentWrapperStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

export const Card: React.FC<IProps> = ({ title, containerStyle, contentWrapperStyle, contentStyle, ...props }) => {
  const { isOpen, trigger } = useContext(IsOpenCardContext);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleCard = () => {
    if (props.onClick && !isClicked) {
      props.onClick();
      setIsClicked(true);
    }
    trigger(`card_${props.id}`);
  };
  useEffect(() => {
    if (isOpen(`card_${props.id}`) && props.onClick && !isClicked) {
      props.onClick();
      setIsClicked(true);
    }
  }, [isOpen, props, isClicked]);

  return (
    <Container
      id={`card_${props.id}`}
      maxWidth={props.max_width}
      error={props.error}
      success={props.success}
      isEmpty={false}
      style={containerStyle}
    >
      <TitleContainer
        error={props.error}
        success={props.success}
        isEmpty={false}
        open={isOpen(`card_${props.id}`)}
        onClick={handleCard}
      >
        <Title id={`card_${props.id}_title`} isEmpty={false}>
          {title}
        </Title>
        <IconContainer id={`card_${props.id}_control`}>
          <IconArrow rotate={isOpen(`card_${props.id}`) ? "" : "270deg"} />
        </IconContainer>
      </TitleContainer>

      <ContentWrapper
        id={`card_${props.id}_content`}
        open={isOpen(`card_${props.id}`)}
        maxHeight={props.max_height}
        minHeight={props.min_height}
        overflowY={props.overflowY}
        style={contentWrapperStyle}
      >
        <Content style={contentStyle}>{props.children}</Content>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div<{ maxWidth?: number; error?: boolean; success?: boolean; isEmpty?: boolean }>`
  overflow: hidden;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid
    ${({ error, success, isEmpty }) =>
      isEmpty ? theme.colors.gray : error ? theme.colors.lightRed : success ? theme.colors.green : theme.colors.gray};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth + "px" : "100vw")};
  border-radius: 10px;
  position: relative;
`;

const TitleContainer = styled.div<{ open?: boolean; error?: boolean; success?: boolean; isEmpty?: boolean }>`
  background: ${theme.colors.white};
  border-bottom: ${({ open }) => open && `1px solid ${theme.colors.gray}`};
  border-color: ${({ error, success, isEmpty }) =>
    isEmpty ? theme.colors.gray : error ? theme.colors.lightRed : success && theme.colors.green};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  cursor: pointer;
`;

const ContentWrapper = styled.div<{ open: boolean; maxHeight?: number; minHeight?: number; overflowY?: string }>`
  overflow-y: ${(props) => props.overflowY || "auto"};
  height: ${({ open }) => (open ? "auto" : 0)};
  max-height: ${({ maxHeight }) => !!maxHeight && `${maxHeight}px`};
  min-height: ${({ open, minHeight }) => open && !!minHeight && `${minHeight}px`};
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  background: ${theme.colors.white};
`;

const Content = styled.div`
  background: ${theme.colors.white};
  padding: 15px 15px 15px 15px;
  position: relative;
`;

const Title = styled.div<{ isEmpty?: boolean }>`
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.005em;
  color: ${(props) => (props.isEmpty ? theme.colors.opacityGray : theme.colors.black)};
`;

const IconContainer = styled.div`
  padding: 5px 8px;
  display: flex;
  align-items: center;
`;
