import React from "react";
import styled, { css } from "styled-components";
import { Modal } from "../modal/modal";
import { theme } from "../../assets/theme/theme";
import { IconPlus } from "../../assets/icon/iconPlus";
import { NextImage } from "../../ui/nextImage/nextImage";

interface Iprops {
  visible: boolean;
  onClick: () => void;
  title: string;
  value: string[][];
  text?: string;
  textTitle?: string;
  imgPath?: string;
}

export const SizeTable = ({ visible, onClick, title, value, imgPath, text, textTitle }: Iprops) => {
  return visible ? (
    <Modal fullWidthTablet clickClose={onClick}>
      <Container rowLength={value[0].length}>
        <Header>
          <Title>{title}</Title>
          <IconPlus rotate={"45deg"} color={theme.colors.grayDark} onClick={onClick} />
        </Header>

        <Content rowLength={value[0].length}>
          <Table>
            <TableBody>
              {value.map((item, index) => (
                <TableRow key={index} rowColor={index % 2 === 0} isHead={index === 0}>
                  {item.map((elem, index) => (
                    <td key={index}>{elem}</td>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Content>

        {text && textTitle ? (
          <BottomContainer>
            <LeftBlock>
              <SecondaryTitle>{textTitle}</SecondaryTitle>
              <P dangerouslySetInnerHTML={{ __html: text }} />
            </LeftBlock>
            {imgPath && (
              <ImgContainer>
                <NextImage src={imgPath} layout={"fill"} alt="Size table image" />
              </ImgContainer>
            )}
          </BottomContainer>
        ) : null}
      </Container>
    </Modal>
  ) : (
    <></>
  );
};

const Table = styled.table`
  border-collapse: collapse;
  font-family: "FCSM Text", sans-serif;
  text-transform: uppercase;
`;

const TableBody = styled.tbody`
  tr:first-of-type {
    background: ${theme.colors.fireEngineRed};
    color: ${theme.colors.white};
  }
`;
const TableRow = styled.tr<{ rowColor: boolean; isHead: boolean }>`
  background: ${({ rowColor }) => (rowColor ? theme.colors.white : theme.colors.grayLight)};
  text-align: right;

  td {
    vertical-align: baseline;
    font-size: ${({ isHead }) => (isHead ? "12px" : "14px")};
    padding: 0.63vw 0.83vw 0.63vw 0;
    min-width: 3.65vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      white-space: pre-wrap;
      font-size: ${({ isHead }) => (isHead ? "12px" : "14px")};
      padding: 1.56vw 2.09vw 1.56vw 0;
      min-width: 6.52vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: ${({ isHead }) => (isHead ? "12px" : "14px")};
      padding: 3.2vw 2.13vw 3.2vw 0;
      min-width: unset;
    }
  }
  td:first-of-type {
    text-align: left;
    padding-left: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-left: 2.09vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-left: 2.13vw;
    }
  }
  td:last-of-type {
    padding-right: 0.83vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding-right: 2.09vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding-right: 2.13vw;
    }
  }
`;

const Container = styled.div<{ rowLength: number }>`
  flex-direction: column;
  background: ${theme.colors.white};
  width: ${({ rowLength }) => (rowLength > 11 ? `calc(4.8vw * ${rowLength})` : "52.97vw")};
  display: flex;
  height: fit-content;
  padding: 1.25vw 2.08vw 4.58vw;
  background: ${theme.colors.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 3.13vw 9.65vw;
    width: 100%;
    min-height: 100vh;
    max-width: none;
    box-sizing: border-box;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 5.33vw 4.27vw 18.13vw;
    width: 100%;
  }
`;

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: 5vw;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  margin: 0 0 1.04vw;
  & > :nth-child(2) {
    margin-bottom: auto;
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: 0 0 2.61vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0 0 5.33vw;
  }
`;

const Title = styled.h5`
  font-weight: 700;
  font-family: "FCSM Text", sans-serif;
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0.83vw 0 0;
  white-space: pre-line;
  word-break: break-word;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
    line-height: 5.48vw;
    margin: 2.09vw 0 0;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin: 0;
    font-weight: 500;
    font-size: 6.4vw;
    line-height: 9.07vw;
    color: ${theme.colors.black};
  }
`;

const Content = styled.div<{ rowLength: number }>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  font-family: "FCSM Text", sans-serif;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    ${({ rowLength }) => {
      if (rowLength > 10) {
        return css`
          overflow: auto;
          & div {
            width: fit-content;
          }
          & div div {
            min-width: 13vw;
          }
        `;
      }
    }};
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    ${({ rowLength }) => {
      if (rowLength > 5) {
        return css`
          overflow: auto;

          & div {
            width: fit-content;
          }
          & div > div {
            min-width: 26vw;
          }
        `;
      }
    }};
  }
`;

const BottomContainer = styled.div`
  margin-top: 3.75vw;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1.25vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin-top: 5vw;
    grid-column-gap: 2.7vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-top: 7vw;
    grid-template-columns: 1fr;
    grid-row-gap: 4.2vw;
  }
`;

const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 0.63vw;
  font-family: "FCSM Text", sans-serif;
  & br {
    margin: 0.31vw 0;
    display: block;
    content: "";
  }
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    grid-row-gap: 1.4vw;
    & br {
      margin: 0.7vw 0;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    grid-row-gap: 2.4vw;
    & br {
      margin: 1.5vw 0;
    }
  }
`;

const SecondaryTitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.77vw;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.7vw;
    line-height: 3.5vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.2vw;
    line-height: 4.7vw;
  }
`;

const P = styled.div`
  margin: 0;
  font-weight: 500;
  font-size: 0.83vw;
  line-height: 1.15vw;
  color: ${theme.colors.black};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.2vw;
    line-height: 2.7vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.2vw;
    line-height: 4.9vw;
  }
`;

const ImgContainer = styled.div`
  width: 11.82vw;
  position: relative;
  height: 11.82vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    width: 22.82vw;
    height: 22.82vw;
    margin: 0 auto;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 44.82vw;
    height: 44.82vw;
  }
`;
