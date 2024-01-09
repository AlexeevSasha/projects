import { Menu } from "antd";
import { sidebarMenuItems } from "common/constants/sidebarMenuItems";
import { haveAccess } from "common/helpers/haveAccess";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rightsSelector } from "store/auth/authSelectors";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

type Props = {
  closeDrawer?: () => void;
};
export interface IMenu {
  title: string;
  path?: string;
  policy: string | string[];
  icon?: JSX.Element;
  children?: IMenu[];
  disabled?: boolean;
}

export const SidebarList = ({ closeDrawer }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const rights = useSelector(rightsSelector);

  const changeRoute = (route: string) => {
    navigate(route);
    closeDrawer?.();
  };

  const canView = (access: IMenu["policy"]) => haveAccess(rights, access);

  return (
    <>
      {sidebarMenuItems
        .filter((item) => canView(item.policy))
        .map((menu) =>
          menu.children ? (
            <SubMenu
              key={`sub.${menu.title}`}
              title={t(menu.title)}
              disabled={menu.disabled}
              icon={menu.icon}
              onTitleClick={() => menu.path && changeRoute(menu.path)}
            >
              {menu.children
                .filter((item) => canView(item.policy))
                .map((submenu) => (
                  <MenuItem
                    key={`item.${submenu.title}`}
                    icon={submenu.icon}
                    onClick={() => submenu.path && changeRoute(submenu.path)}
                    disabled={submenu.disabled}
                  >
                    {t(submenu.title)}
                  </MenuItem>
                ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={menu.title}
              icon={menu.icon}
              onClick={() => menu.path && changeRoute(menu.path)}
              disabled={menu.disabled}
            >
              {t(menu.title)}
            </MenuItem>
          )
        )}
    </>
  );
};

const MenuItem = styled(Menu.Item)`
  margin: 0 !important;
  background: ${theme.colors.neroGray};
  color: ${theme.colors.white};
`;

const SubMenu = styled(Menu.SubMenu)`
  background: ${theme.colors.neroGray};
  color: ${theme.colors.white};

  ul {
    background: ${theme.colors.neroGray} !important;
    color: ${theme.colors.white};
  }
`;
