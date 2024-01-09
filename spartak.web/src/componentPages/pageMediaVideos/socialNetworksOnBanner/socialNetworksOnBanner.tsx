import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../../../assets/constants/date";
import { IconVK } from "../../../assets/icon/iconVK";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";
import { useRouter } from "next/router";
import { IconTelegram } from "../../../assets/icon/iconTelegram";

interface IProps {
  date?: string;
  textShare?: string;
  fullWidth?: boolean;
}

export const SocialNetworksOnBanner = (props: IProps) => {
  const [url, setUrl] = useState("");
  const { locale = "ru", pathname } = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <Container fullWidth={props.fullWidth || pathname.includes("gallery")}>
      <SocialDateBlock>
        <DateAndTeam>
          {props.date ? (
            pathname.includes("specialOffers") ? (
              <Date>{props.date}</Date>
            ) : (
              <Date dateTime={props.date}>{formatDate(props.date, "dd MMMM HH:mm", locale)}</Date>
            )
          ) : null}
        </DateAndTeam>

        {props.textShare && (
          <Social>
            <IconBackground
              href={`http://vk.com/share.php?url=${url}&title=${props.textShare}&noparse=true`}
              target="_blank"
            >
              <IconVK />
            </IconBackground>
            <IconBackground href={`https://t.me/share/url?url=${url}&text=${props.textShare}`} target="_blank">
              <IconTelegram />
            </IconBackground>
          </Social>
        )}
      </SocialDateBlock>
    </Container>
  );
};

const Container = styled(ContainerContent)<{ fullWidth?: boolean }>`
  margin: -3.02vw auto 1.04vw;
  display: grid;
  grid-template-columns: ${(props) => (props.fullWidth ? "1fr" : "2fr 1fr")};
  grid-column-gap: 1.25vw;
  z-index: 98;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    margin: -5.22vw auto 3.13vw;
    display: flex;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
    margin: 0 auto 4.27vw;
  }
`;

const SocialDateBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: column;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    flex-direction: row;
  }
`;

const DateAndTeam = styled.p`
  margin: 0;

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Date = styled.time`
  color: ${({ theme }) => theme.colors.gray_grayDark1};
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.73vw;
  padding-right: 7.29vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding-right: 5.22vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding-right: 7.29vw;
  }
`;

const Social = styled.p`
  margin: 0;
  gap: 0.83vw;
  display: flex;
  align-items: center;
  justify-self: flex-end;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    gap: 2.09vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 4.27vw;
  }
`;

const IconBackground = styled.a`
  position: relative;
  display: flex;
  padding: 0.42vw;
  background-color: ${theme.colors.gray}10;
  border-radius: 50%;
  color: ${(props) => props.theme.colors.white_grayDark};

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 1.04vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 2.13vw;
  }
`;
