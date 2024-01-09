import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CheckCircleIcon } from "../../assets/icon/checkCircle";
import { theme } from "../../assets/theme/theme";
import { DataContext } from "../../core/dataProvider";

export const SaveAlert: FC = ({ children }) => {
  const [open, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showNotification, setShowNotification } = useContext(DataContext);
  useEffect(() => {
    if (showNotification) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 2700);
    }
    showNotification && setTimeout(() => setShowNotification(false), 3000);
  }, [showNotification]);

  return showNotification ? (
    <Alert ref={ref} open={open}>
      <CheckCircleIcon />
      <span>{children}</span>
    </Alert>
  ) : null;
};

const Alert = styled.div<{ open?: boolean }>`
  position: fixed;
  right: 0.83vw;
  padding: 0 0.83vw;
  top: ${({ open }) => (open ? "7.25vw" : "-5vw")};
  background: linear-gradient(0deg, #05c84a33, #05c84a33), ${theme.colors.white};
  z-index: 999;
  color: ${theme.colors.black};
  min-height: 2.08vw;
  min-width: 18.54vw;
  display: flex;
  align-items: center;
  font-size: 0.73vw;
  letter-spacing: 0.1px;
  transition: all ease 0.3s;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    right: 3.13vw;
    top: ${({ open }) => (open ? "11vw" : "-5vw")};
    min-height: 5.21vw;
    min-width: 46.41vw;
    font-size: 1.82vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    right: 3vw;
    top: ${({ open }) => (open ? "21vw" : "-5vw")};
    min-height: 10.66vw;
    min-width: 91.46vw;
    font-size: 3.73vw;
  }

  & > svg {
    color: ${theme.colors.green2};
    margin-right: 0.5vw;
    font-size: 1.25vw;

    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      font-size: 3.13vw;
      margin-right: 1.2vw;
    }

    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      font-size: 6.4vw;
      margin-right: 2.4vw;
    }
  }
`;
