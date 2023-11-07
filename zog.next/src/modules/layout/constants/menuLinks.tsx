import {
  ArchiveBoxIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  Cog8ToothIcon,
  HomeIcon,
  SignalIcon,
  UserCircleIcon,
  UserPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { LanguageT } from "../../../common/interfaces/LanguageT";

export const layoutDashMenuLinks = (lang: LanguageT) => [
  {
    icon: <HomeIcon />,
    href: "/lk",
    title: lang.common.menu.home,
    roles: ["Admin", "Consultant", "Client", "Partner", "Guest"],
  },
  {
    icon: <ChartPieIcon />,
    href: "/lk/partner",
    title: lang.common.menu.cabinet,
    roles: ["Partner"],
  },
  {
    icon: <UserPlusIcon />,
    href: "/lk/roles",
    title: lang.common.menu.roles,
    roles: ["Admin"],
  },
  {
    icon: <ArchiveBoxIcon />,
    href: "/lk/primary-order",
    title: lang.common.menu.requestsForCalls,
    roles: ["Admin"],
  },
  {
    icon: <SignalIcon />,
    href: "/lk/clients",
    title: lang.common.menu.requestsForDiagnosis,
    roles: ["Admin", "Consultant", "Client"],
  },
  {
    icon: <ChartPieIcon />,
    href: "/lk/partner/admin",
    title: lang.common.menu.partners,
    roles: ["Admin"],
  },
  {
    icon: <CheckBadgeIcon />,
    href: "/lk/review",
    title: lang.common.menu.reviews,
    roles: ["Admin", "Consultant", "Client", "Partner", "Guest"],
  },
  {
    icon: <UserCircleIcon />,
    href: "/lk/profile",
    title: lang.common.menu.profile,
    roles: ["Admin", "Consultant", "Client", "Partner", "Guest"],
  },
  {
    icon: <Cog8ToothIcon />,
    href: "/lk/settings",
    title: lang.common.menu.settings,
    roles: ["Admin"],
  },
  {
    icon: <EnvelopeIcon />,
    href: "/lk/mailings",
    title: lang.common.menu.mailings,
    roles: ["Admin"],
  },
];
