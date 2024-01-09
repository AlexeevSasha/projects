import React from "react";
import styled from "styled-components";
import { ContainerContent } from "../../../../components/containers/containerContent";
import { theme } from "../../../../assets/theme/theme";
import { useRouter } from "next/router";
import { IconRedPoint } from "../../../../assets/icon/iconRedPoint";
import { NextImage } from "../../../../ui/nextImage/nextImage";
import { ITicketsBlock } from "../../../../api/dto/ITicketsPremium";
import { CustomButton } from "../../../../components/buttons/customButton";
import { lang } from "../../../../../public/locales/lang";

interface IProps {
  listSectorInfo: ITicketsBlock[];
}

export const TicketsInfoBLock = (props: IProps) => {
  const { locale = "ru", push, pathname } = useRouter();
  return (
    <>
      {props.listSectorInfo?.map((sectorInfo, index) => (
        <StyledContainer key={`k${index}`}>
          <ImgContainer index={index}>
            <InfoImageContainer index={index}>
              <NextImage src={sectorInfo?.img ?? ""} objectFit="cover" />
            </InfoImageContainer>
          </ImgContainer>

          {sectorInfo.description ? (
            <InfoSection index={index}>
              <TitleDescription>
                <InfoTitle>{sectorInfo?.title}</InfoTitle>
                <InfoDescription dangerouslySetInnerHTML={{ __html: sectorInfo?.description }} />
              </TitleDescription>
            </InfoSection>
          ) : (
            <ListInfoSection index={index}>
              <InfoTitle>
                {sectorInfo.title}
                {!pathname.includes("premium") && <p>{sectorInfo.list?.title}</p>}
              </InfoTitle>
              <List>
                {sectorInfo.list?.items?.map((elem, index) => (
                  <li key={index}>
                    <IconRedPoint /> {elem}
                  </li>
                ))}
              </List>
              {pathname.includes("premium") && (
                <ButtonBlock>
                  <RestyledButton
                    withGap
                    type="red"
                    onClick={() => push(`${process.env.NEXT_PUBLIC_TICKETS_HOME_URL}/${locale}/matches`)}
                  >
                    <ByTicket>{lang[locale].button.buyTicket}</ByTicket>
                  </RestyledButton>
                </ButtonBlock>
              )}
            </ListInfoSection>
          )}
        </StyledContainer>
      ))}
    </>
  );
};

const StyledContainer = styled(ContainerContent)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5.21vw;
  background: ${(props) => props.theme.colors.black_white};
  p {
    margin: 0;
  }

  :last-child {
    padding-bottom: 0;
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    flex-direction: column;
    margin-bottom: 10.43vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 10.67vw;
  }
`;
const ImgContainer = styled.div<{ index: number }>`
  height: 25.94vw;
  width: 34.9vw;
  position: relative;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "1" : "2")};
  background-size: 100% auto;
  background-position-y: 0;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-position-y: initial;
    width: 93.87vw;
    height: 36.77vw;
    order: 1;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 91.47vw;
    height: 36.27vw;
    margin-bottom: 4.27vw;
  }
`;
const InfoImageContainer = styled.div<{ index: number }>`
  position: relative;
  height: inherit;

  :before {
    content: " ";
    background: ${({ theme }) => theme.gradients.field_none};
    transform: ${(props) => (props.index % 2 === 0 || 0 ? "" : "matrix(-1, 0, 0, 1, -1, 0)")};
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    position: absolute;
    z-index: 1;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      background: linear-gradient(175.86deg, rgba(13, 17, 22, 0) 0%, #0d1116 93.24%);
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    background-position-y: initial;
    order: 1;
    margin-bottom: 2.09vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    margin-bottom: 4.27vw;
  }
`;

const InfoSection = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40.63vw;
  order: ${(props) => (props.index % 2 === 0 || 0 ? "2" : "1")};
  gap: 2.19vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 100%;
    width: 100%;
    order: 2;
    gap: 3.13vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;
const ListInfoSection = styled(InfoSection)`
  gap: 0;
  justify-content: start;
`;

const TitleDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.08vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    gap: 4.27vw;
  }
`;

const InfoTitle = styled.span`
  display: block;
  font-family: "FCSM Text", sans-serif;
  font-weight: 700;
  font-size: 2.08vw;
  color: ${(props) => props.theme.colors.white_black};

  p {
    margin: 0;
    padding: 1.25vw 0;
    font-size: 1.25vw;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray1_grayDark};

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 3.13vw 0;
      font-size: 2.35vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 6.4vw 0;
      font-size: 4.27vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 4.17vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 6.4vw;
  }
`;

const InfoDescription = styled.div`
  display: block;
  color: ${(props) => props.theme.colors.grayLight_grayDark};
  font-family: "FCSM Text", sans-serif;
  font-size: 1.25vw;
  font-weight: 500;

  a {
    text-decoration: none;
    color: ${theme.colors.red};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 2.35vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 4.27vw;
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white_grayDark};
  row-gap: 0.83vw;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    font-size: 1.25vw;
    font-weight: 500;
    column-gap: 0.63vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 2.35vw;
      column-gap: 1.56vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 4.27vw;
      column-gap: 3.2vw;
    }
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    row-gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    row-gap: 4.27vw;
  }
`;
const ButtonBlock = styled.div`
  padding-top: 1.25vw;
  width: 9.27vw;
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding-top: 3.13vw;
    width: 21.12vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding-top: 4.27vw;
    width: 41.07vw;
  }
`;

const RestyledButton = styled(CustomButton)`
  padding: 0.68vw 1.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.17vw 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 1.33vw 2.93vw;
  }
`;

const ByTicket = styled.span`
  font-size: 0.73vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
  }
`;
