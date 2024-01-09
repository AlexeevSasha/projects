import { UserRolesEnum } from "common/interfaces/user/UserRolesEnum";
import { theme } from "common/styles/theme";
import { authorizationSelector } from "module/authorization/authorizationSelector";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconUsers } from "common/components/Icon/IconUsers";
import { getCookie } from "../../helpers/getCoockie";
import { css, styled } from "../../styles/styled";
import { IconBook } from "../Icon/IconBook";
import { IconFolder } from "../Icon/IconFolder";
import { IconNotebook } from "../Icon/IconNotebook";
import { IconNsi } from "../Icon/IconNsi";
import { IconRegisterRouter } from "../Icon/IconRegisterRouter";
import { IconContainerFloatingmes } from "../Table/UIcomponent/UIcomponent";
import { AppSettings } from "../../constants/appSettings";

export const Sidebar = () => {
  const [open, setOpen] = useState(getCookie("isOpenedMenu") === "true");
  const { login } = useSelector(authorizationSelector);

  useEffect(() => {
    if (getCookie("isOpenedMenu")) {
      setOpen(getCookie("isOpenedMenu") === "true");
    } else {
      document.cookie = "isOpenedMenu=false";
      setOpen(false);
    }
  }, [setOpen]);

  const updateOpen = useCallback(
    (value: boolean) => {
      document.cookie = `isOpenedMenu=${value}`;
      setOpen(value);
    },
    [setOpen]
  );

  return (
    <>
      <Container open={open}>
        <Menu open={open}>
          <IconContainerFloatingmes title="Регистры" position="right" noMarg visible={!open}>
            <MenuItem active={document.location.pathname.indexOf("register") >= 0}>
              <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/register`} key={"register"}>
                <IconFolder active={document.location.pathname.indexOf("register") >= 0} />
                {open ? "Регистры" : ""}
              </Link>
            </MenuItem>
          </IconContainerFloatingmes>

          <IconContainerFloatingmes title="Заявки" position="right" noMarg visible={!open}>
            <MenuItem active={document.location.pathname.indexOf("proposal") >= 0}>
              <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/proposal`} key={"proposal"}>
                <IconNotebook active={document.location.pathname.indexOf("proposal") >= 0} />
                {open ? "Заявки" : ""}
              </Link>
            </MenuItem>
          </IconContainerFloatingmes>

          <IconContainerFloatingmes title="Справочники" position="right" noMarg visible={!open}>
            <MenuItem active={document.location.pathname.indexOf("dictionary") >= 0}>
              <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary`} key={"dictionary"}>
                <IconBook active={document.location.pathname.indexOf("dictionary") >= 0} />
                {open ? "Справочники" : ""}
              </Link>
            </MenuItem>
          </IconContainerFloatingmes>

          {login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr ? (
            <IconContainerFloatingmes title="НСИ" position="right" noMarg visible={!open}>
              <MenuItem active={document.location.pathname.indexOf("nsi") >= 0}>
                <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/nsi`} key={"nsi"}>
                  <IconNsi active={document.location.pathname.indexOf("nsi") >= 0} />
                  {open ? "НСИ" : ""}
                </Link>
              </MenuItem>
            </IconContainerFloatingmes>
          ) : null}

          {login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr ? (
            <IconContainerFloatingmes title="Пользователи" position="right" noMarg visible={!open}>
              <MenuItem active={document.location.pathname.indexOf("users") >= 0}>
                <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/users`} key={"users"}>
                  <IconUsers active={document.location.pathname.indexOf("users") >= 0} />
                  {open ? "Пользователи" : ""}
                </Link>
              </MenuItem>
            </IconContainerFloatingmes>
          ) : null}

          {login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr ? (
            <IconContainerFloatingmes title="Роутер" position="right" noMarg visible={!open}>
              <MenuItem active={document.location.pathname.indexOf("routerRegistry") >= 0}>
                <Link to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/routerRegistry`} key={"routerRegistry"}>
                  <IconRegisterRouter active={document.location.pathname.indexOf("routerRegistry") >= 0} />

                  {open ? "Роутер" : ""}
                </Link>
              </MenuItem>
            </IconContainerFloatingmes>
          ) : null}
        </Menu>
        <OpenContainer onClick={() => updateOpen(!open)}>{` ${open ? "Свернуть" : "Развернуть"} меню`}</OpenContainer>
        <Version to={`${AppSettings.get("REACT_APP_ROOT_FOLDER")}/versions`}>
          версия {process.env.REACT_APP_VERSION}
        </Version>
      </Container>
      {open && <Outside onClick={() => updateOpen(!open)} />}
    </>
  );
};

const Outside = styled.div`
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
`;
const Container = styled.div<{ open: boolean }>`
  position: ${(props) => (props.open ? "absolute" : "absolute")};
  width: ${(props) => (props.open ? "230px" : "70px")};
  height: calc(100vh - 41px);
  background: ${theme.colors.white};
  z-index: ${(props) => (props.open ? 1001 : 1000)};
  overflow: ${({ open }) => (open ? "hidden" : "visible")};
  transition: width 0.5s ease;
  ${(props) =>
    !props.open &&
    css`
      a {
        svg {
          margin: auto;
        }
      }
    `}
`;

const Menu = styled.div<{ open: boolean }>`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "230px" : "60px")};
`;

const MenuItem = styled.div<{ active?: boolean }>`
  a {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    letter-spacing: 0.005em;
    text-decoration: none;
    padding: 10px;
    color: ${theme.colors.hightBlue};

    ${(props) =>
        props.active
          ? css`
              color: ${theme.colors.green};
              background: rgba(244, 244, 244, 0.25);
              border-left: 4px solid ${theme.colors.green};
            `
          : ""}
      :hover {
      color: ${theme.colors.green};
      background: rgba(244, 244, 244, 0.25);
      border-left: 4px solid ${theme.colors.green};
    }

    svg {
      margin-right: 12px;
      margin-left: 10px;
    }
  }
`;

const OpenContainer = styled.div`
  position: absolute;
  bottom: 50%;
  padding: 5px;
  right: 0;
  cursor: pointer;
  writing-mode: tb-rl;
  font-weight: 600;
  color: ${theme.colors.blue};
`;

const Version = styled(Link)`
  position: absolute;
  bottom: 50px;
  left: 5px;
  color: ${theme.colors.hightBlue};
  font-weight: 600;
  font-size: 14px;
  opacity: 0.4;
  text-decoration: none;
`;
