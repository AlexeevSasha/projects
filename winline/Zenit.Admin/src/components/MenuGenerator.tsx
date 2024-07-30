import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  UsbOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  GiftOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  MobileOutlined,
  FireOutlined
} from "@ant-design/icons";
import { createPolicyEntities } from "../common/helpers/authorization/createPolicyEntities";
import styled from "styled-components";
import { theme } from "../assets/theme/theme";
import { accessNames } from "../common/accessControles/accessNames";
import { routePaths } from "../common/constants/routePaths";
import type { StateType } from "../core/redux/store";
import { useTranslation } from "react-i18next";
import { MenuItemStyles } from "../ui/commonComponents";

interface IMenu {
  title: string;
  path: string;
  policy: string | string[];
  icon?: JSX.Element;
  children?: IMenu[];
  disabled?: boolean;
}

const menuData: IMenu[] = [
  {
    title: "story.title",
    path: routePaths.tableContent.story,
    policy: accessNames.marketing,
    icon: <FireOutlined />
  },
  {
    title: "players.title",
    path: routePaths.tableContent.player,
    policy: accessNames.player,
    icon: <TeamOutlined />
  },
  {
    title: "matches.title",
    path: routePaths.tableContent.matches,
    policy: accessNames.matching,
    icon: <UnorderedListOutlined />
  },
  {
    title: "employees.title",
    path: routePaths.tableContent.employee,
    policy: [accessNames.employee, accessNames.role],
    icon: <UserOutlined />,
    children: [
      {
        title: "common.view",
        path: routePaths.tableContent.employee,
        policy: accessNames.employee
      },
      {
        title: "employees.role.title",
        path: routePaths.tableContent.employeeRole,
        policy: accessNames.role
      }
    ]
  },
  {
    title: "users.title",
    path: routePaths.tableContent.users,
    policy: [accessNames.user, accessNames.notification],
    icon: <ContactsOutlined />,
    children: [
      {
        title: "common.view",
        path: routePaths.tableContent.users,
        policy: accessNames.user
      },
      {
        title: "users.notifications.title",
        path: routePaths.tableContent.usersNotification,
        policy: accessNames.notification
      }
    ]
  },
  {
    title: "adv.title",
    path: routePaths.tableContent.adv,
    policy: accessNames.banner,
    icon: <PictureOutlined />
  },
  {
    title: "pointsSystem.title",
    path: routePaths.tableContent.points.main,
    policy: accessNames.points,
    icon: <GiftOutlined />,
    children: [
      {
        title: "pointsSystem.loyalty.title",
        path: routePaths.tableContent.points.main + "/" + routePaths.tableContent.points.loyalty,
        policy: accessNames.points
      },
      {
        title: "pointsSystem.poll.title",
        path: routePaths.tableContent.points.main + "/" + routePaths.tableContent.points.poll,
        policy: accessNames.points
      },
      {
        title: "pointsSystem.products.title",
        path: routePaths.tableContent.points.main + "/" + routePaths.tableContent.points.products,
        policy: accessNames.points
      },
      {
        title: "pointsSystem.orders.title",
        path: routePaths.tableContent.points.main + "/" + routePaths.tableContent.points.orders,
        policy: accessNames.points
      }
    ]
  },
  {
    title: "mobileConfig.title",
    path: routePaths.tableContent.mobileConfig,
    policy: accessNames.mobileConfig,
    icon: <MobileOutlined />
  },
  {
    title: "systemLog.title",
    path: routePaths.tableContent.systemLog,
    policy: accessNames.log,
    icon: <UsbOutlined />
  }
];

export const MenuGenerator = (closeSidebarDrawer?: () => void) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const changeRoute = (route: string) => {
    navigate(route);
    closeSidebarDrawer?.();
  };

  const MenuItemValidatorPolicy = (entity: string | string[]) => {
    const userInfo = useSelector((state: StateType) => state.authData.userInfo);

    if (userInfo?.policy) {
      if (userInfo.policy === accessNames.fullAccess) {
        return true;
      } else {
        if (typeof entity === "string") {
          return createPolicyEntities(userInfo.policy).includes(entity);
        } else {
          return createPolicyEntities(userInfo.policy).some((letter) => entity.includes(letter));
        }
      }
    }

    return false;
  };

  const menuDataItems = menuData
    .filter((item) => MenuItemValidatorPolicy(item.policy))
    .map((menu) =>
      menu.children ? (
        <SubMenuStyles key={"sub-" + menu.path} title={t(menu.title)} icon={menu.icon}>
          {menu.children
            ?.filter((item) => MenuItemValidatorPolicy(item.policy))
            .map((submenu: IMenu) => (
              <MenuItemStyles key={submenu.path} icon={submenu.icon} onClick={() => changeRoute(submenu.path)} disabled={submenu.disabled}>
                {t(submenu.title)}
              </MenuItemStyles>
            ))}
        </SubMenuStyles>
      ) : (
        <MenuItemStyles key={menu.path} icon={menu.icon} onClick={() => changeRoute(menu.path)} disabled={menu.disabled}>
          {t(menu.title)}
        </MenuItemStyles>
      )
    );

  menuDataItems.push(
    <MenuItemStyles
      key={routePaths.tableContent.settings}
      icon={<SettingOutlined />}
      onClick={() => changeRoute(routePaths.tableContent.settings)}
    >
      {t("settings.title")}
    </MenuItemStyles>
  );

  menuDataItems.push(
    <MenuItemStyles key={"/help"} icon={<QuestionCircleOutlined />}>
      <LinkStyle to={"/help"} target="_blank">
        {t("help")}
      </LinkStyle>
    </MenuItemStyles>
  );

  return menuDataItems;
};

const SubMenuStyles = styled(Menu.SubMenu)`
  background: ${theme.colors.neroGray};
  color: ${theme.colors.white};
  ul {
    background: ${theme.colors.neroGray} !important;
    color: ${theme.colors.white};
  }
`;

const LinkStyle = styled(Link)`
  color: inherit !important;
  transition: none;
`;
