import {
  CalendarOutlined,
  ContactsOutlined,
  CopyOutlined,
  CrownOutlined,
  FileTextOutlined,
  LikeOutlined,
  MehOutlined,
  NotificationOutlined,
  PictureOutlined,
  SettingOutlined,
  SmileOutlined,
  SnippetsOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  UsbOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { accessNames } from "common/constants/accessNames";
import { IMenu } from "ui/Sidebar/SidebarList";
import { routePaths } from "./routePaths";

export const sidebarMenuItems: IMenu[] = [
  {
    title: "sideBar.media.main",
    policy: accessNames.media,
    icon: <UnorderedListOutlined />,
    children: [
      {
        title: "sideBar.media.main",
        path: routePaths.media,
        policy: accessNames.media,
      },
      {
        title: "sideBar.media.categories",
        path: routePaths.mediaCategories,
        policy: accessNames.media,
      },
    ],
  },
  {
    title: "sideBar.pages.main",
    policy: accessNames.cms,
    icon: <SnippetsOutlined />,
    children: [
      {
        title: "sideBar.pages.sections",
        path: routePaths.pagesSections,
        policy: accessNames.cms,
      },
      {
        title: "sideBar.pages.subscriptions",
        path: routePaths.pagesSubscriptions,
        policy: accessNames.cms,
      },
    ],
  },
  {
    title: "sideBar.partners.main",
    path: routePaths.partners,
    policy: accessNames.partner,
    icon: <LikeOutlined />,
  },
  {
    title: "sideBar.calendar.main",
    path: routePaths.calendar,
    policy: accessNames.calendar,
    icon: <CalendarOutlined />,
  },
  {
    title: "sideBar.tournaments.main",
    policy: accessNames.tournament,
    icon: <TrophyOutlined />,
    children: [
      {
        title: "sideBar.tournaments.tournaments",
        path: routePaths.tournaments(),
        policy: accessNames.tournament,
      },
      {
        title: "sideBar.tournaments.matches",
        path: routePaths.matches(),
        policy: accessNames.tournament,
      },
      {
        title: "sideBar.tournaments.matching",
        path: routePaths.matching,
        policy: accessNames.tournament,
      },
    ],
  },
  {
    title: "sideBar.clubs.main",
    policy: accessNames.club,
    icon: <CrownOutlined />,
    children: [
      {
        title: "sideBar.clubs.commands",
        path: routePaths.clubsTeams,
        policy: accessNames.club,
      },
      {
        title: "sideBar.clubs.players",
        path: routePaths.clubsPlayers,
        policy: accessNames.club,
      },
      {
        title: "sideBar.clubs.trainers",
        path: routePaths.clubsTrainers,
        policy: accessNames.club,
      },
      {
        title: "sideBar.clubs.staff",
        path: routePaths.clubsStaff,
        policy: accessNames.club,
      },
      {
        title: "sideBar.clubs.leadership",
        path: routePaths.clubsLeadership,
        policy: accessNames.club,
      },
      {
        title: "sideBar.clubs.medical",
        path: routePaths.clubsMedical,
        policy: accessNames.clubSite,
      },
    ],
  },
  {
    title: "sideBar.directories.main",
    policy: [accessNames.clubSite, accessNames.tournament],
    icon: <FileTextOutlined />,
    children: [
      {
        title: "sideBar.directories.stadiums",
        path: routePaths.dirStadiums,
        policy: [accessNames.clubSite, accessNames.tournament],
      },
      {
        title: "sideBar.directories.commands",
        path: routePaths.dirTeams,
        policy: [accessNames.clubSite, accessNames.tournament],
      },
    ],
  },
  {
    title: "sideBar.graduates.main",
    policy: accessNames.graduate,
    icon: <CrownOutlined />,
    children: [
      {
        title: "sideBar.graduates.main",
        path: routePaths.graduates,
        policy: accessNames.graduate,
      },
      {
        title: "sideBar.graduates.sections",
        path: routePaths.graduateSections,
        policy: accessNames.graduate,
      },
    ],
  },
  {
    title: "sideBar.kids.main",
    policy: [accessNames.kids, accessNames.bindToExit],
    icon: <MehOutlined />,
    children: [
      {
        title: "sideBar.kids.journal",
        path: routePaths.kidsJournals,
        policy: accessNames.kids,
      },
      {
        title: "sideBar.kids.seasons",
        path: routePaths.kidsSeasons,
        policy: accessNames.kids,
      },
      {
        title: "sideBar.kids.bidToExit",
        path: routePaths.kidsBidToExit,
        policy: accessNames.bindToExit,
      },
    ],
  },

  {
    title: "sideBar.specialOffer.main",
    policy: [accessNames.specialOffer, accessNames.quiz],
    icon: <SmileOutlined />,
    children: [
      {
        title: "sideBar.specialOffer.main",
        path: routePaths.specialOffer,
        policy: accessNames.specialOffer,
      },
      {
        title: "sideBar.specialOffer.queez",
        path: routePaths.quiz,
        policy: accessNames.quiz,
      },
    ],
  },
  {
    title: "sideBar.notifications.main",
    path: routePaths.notifications("await"),
    policy: accessNames.notification,
    icon: <NotificationOutlined />,
  },
  {
    title: "sideBar.promo.main",
    policy: accessNames.stock,
    icon: <UsergroupAddOutlined />,
    children: [
      {
        title: "sideBar.promo.bestPlayer",
        path: routePaths.bestPlayer,
        policy: accessNames.stock,
      },
    ],
  },
  {
    title: "sideBar.advertising.main",
    path: routePaths.advertising,
    policy: accessNames.banner,
    icon: <PictureOutlined />,
  },
  {
    title: "sideBar.loyalty.main",
    path: routePaths.loyalty,
    policy: accessNames.loyalty,
    icon: <SmileOutlined />,
  },
  {
    title: "sideBar.employee.main",
    policy: accessNames.role,
    icon: <UsergroupAddOutlined />,
    children: [
      {
        title: "sideBar.employee.view",
        path: routePaths.employee,
        policy: accessNames.role,
      },
      {
        title: "sideBar.employee.role",
        path: routePaths.employeeRole,
        policy: accessNames.role,
      },
    ],
  },
  {
    title: "sideBar.users.main",
    policy: accessNames.fullAccess,
    disabled: true,
    icon: <ContactsOutlined />,
    children: [
      {
        title: "sideBar.users.view",
        disabled: true,
        path: routePaths.usersView,
        policy: accessNames.fullAccess,
      },
    ],
  },
  {
    title: "sideBar.systemLog.main",
    path: routePaths.systemLog,
    policy: accessNames.audit,
    icon: <UsbOutlined />,
  },
  {
    title: "sideBar.backup.main",
    disabled: true,
    path: routePaths.backup,
    policy: accessNames.fullAccess,
    icon: <CopyOutlined />,
  },
  {
    title: "sideBar.settings.main",
    disabled: true,
    path: routePaths.settings,
    policy: accessNames.fullAccess,
    icon: <SettingOutlined />,
  },
];
