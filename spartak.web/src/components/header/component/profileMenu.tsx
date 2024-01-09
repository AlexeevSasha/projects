import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { theme } from "../../../assets/theme/theme";

type Props = {
  logout: () => void;
  onClose: () => void;
};

export const ProfileMenu = ({ logout, onClose }: Props) => {
  const { locale = "ru", push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", onClose);
    setIsOpen(true);

    return () => {
      document.removeEventListener("click", onClose);
    };
  }, []);

  return (
    <Container isOpen={isOpen}>
      <Item onClick={() => push("/profile/denarii")}>{lang[locale].header.profile}</Item>
      <Item onClick={logout}>{lang[locale].header.logout}</Item>
    </Container>
  );
};

const Container = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  list-style: none;
  padding: 0.83vw 0;
  margin: 0;
  background: ${(props) => props.theme.colors.blackLight_white};
  color: ${({ theme }) => theme.colors.white_black};
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  transition: all ease 0.3s;
  height: ${({ isOpen }) => (isOpen ? "3.6vw" : "0")};
  overflow: hidden;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 2.08vw 0;
    left: unset;
    width: 27.77vw;
    height: ${({ isOpen }) => (isOpen ? "8.4vw" : "0")};
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 4.26vw 0;
    left: 0;
    width: 100%;
    height: ${({ isOpen }) => (isOpen ? "18.6vw" : "0")};
  }
`;

const Item = styled.li`
  font-family: "FCSM Text", sans-serif;
  font-size: 0.73vw;
  padding: 0 0.83vw;
  height: 1.77vw;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;

  &:hover {
    background: ${theme.colors.red};
    color: ${theme.colors.white};
  }

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 4.43vw;
    padding: 0 2.08vw;
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 9.33vw;
    font-size: 3.73vw;
    justify-content: center;
  }
`;
