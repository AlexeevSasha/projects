import { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";
import { ThemeContext } from "../../core/themeProvider";
import { NextImage } from "../../ui/nextImage/nextImage";

interface IProps {
  title: string;
  text: string;
}

export const EmptyTicketsScreen = (props: IProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <Content>
      <Title>{props.title}</Title>
      <ImgContainer>
        <NextImage src={`/images/tickets/tickets${isDarkTheme ? "Black" : "White"}.svg`} alt={"No tickets"} />
      </ImgContainer>
      <Text>{props.text}</Text>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "FCSM Text", sans-serif;
  color: ${theme.colors.white};
  grid-row-gap: 1.25vw;
  margin: 4.17vw auto 7.29vw;
`;

const ImgContainer = styled.div`
  width: 4.17vw;
  height: 4.17vw;
`;

const Title = styled.h5`
  font-weight: 700;
  margin: 0;
  font-size: 2.08vw;
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.94vw;
`;
