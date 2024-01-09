import { accessNames } from "common/constants/accessNames";
import { routePaths } from "common/constants/routePaths";
import { haveAccess } from "common/helpers/haveAccess";
import { AuthPage } from "pages/auth/AuthPage";
import { lazy, Suspense, useEffect } from "react";
import { ReactTitle } from "react-meta-tags";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { accessTokenSelector, rightsSelector, userNameSelector } from "store/auth/authSelectors";
import styled from "styled-components";
import { AppLayout } from "ui/AppLayout";
import { AuthLayout } from "ui/AuthLayout";
import { Redirect } from "ui/Redirect";
import { IMenu } from "ui/Sidebar/SidebarList";
import { Loyalty } from "./loyalty/Loyalty";
import { Matches } from "./matches/Matches";
import { Media } from "./media/Media";
import { MediaCategories } from "./mediaCategories/MediaCategories";
import { Tournaments } from "./tournaments/Tournaments";
import { identityRepository } from "../api/identityRepository";
import { authAction } from "store/auth/authSlice";
import { useAppDispatch } from "../store";
import { SpecialOffer } from "./specialOffer/SpecialOffer";
import { Quiz } from "./queez/Quiz";

const PagesSections = lazy(async () =>
  import("./pagesSections/PagesSections").then((module) => ({
    default: module.PagesSections,
  }))
);

const Partners = lazy(async () =>
  import("./partners/Partners").then((module) => ({
    default: module.Partners,
  }))
);

const DirStadiums = lazy(async () =>
  import("./dirStadiums/DirStadiums").then((module) => ({
    default: module.DirStadiums,
  }))
);

const DirTeams = lazy(async () =>
  import("./dirTeams/DirTeams").then((module) => ({
    default: module.DirTeams,
  }))
);

const ClubsTeams = lazy(async () =>
  import("./clubsTeams/ClubsTeams").then((module) => ({
    default: module.ClubsTeams,
  }))
);

const ClubsPlayers = lazy(async () =>
  import("./clubsPlayers/ClubsPlayers").then((module) => ({
    default: module.ClubsPlayers,
  }))
);

const ClubsTrainers = lazy(async () =>
  import("./clubsTrainers/ClubsTrainers").then((module) => ({
    default: module.ClubsTrainers,
  }))
);

const ClubsStaff = lazy(async () =>
  import("./clubsStaff/ClubsStaff").then((module) => ({
    default: module.ClubsStaff,
  }))
);
const ClubsMedical = lazy(async () =>
  import("./clubsMedical/clubsMedical").then((module) => ({
    default: module.ClubsMedical,
  }))
);
const ClubsLeadership = lazy(async () =>
  import("./clubsLeadership/ClubsLeadership").then((module) => ({
    default: module.ClubsLeadership,
  }))
);

const EmployeeView = lazy(async () =>
  import("./employeeView/EmployeeView").then((module) => ({
    default: module.EmployeeView,
  }))
);

const EmployeeRole = lazy(async () =>
  import("./employeeRole/EmployeeRole").then((module) => ({
    default: module.EmployeeRole,
  }))
);

const Matching = lazy(async () =>
  import("./matching/Matching").then((module) => ({
    default: module.Matching,
  }))
);

const SystemLog = lazy(async () =>
  import("./systemLog/SystemLog").then((module) => ({
    default: module.SystemLog,
  }))
);

const Notifications = lazy(async () =>
  import("./notifications/Notifications").then((module) => ({
    default: module.Notifications,
  }))
);

const Calendar = lazy(async () =>
  import("./calendar/Calendar").then((module) => ({
    default: module.Calendar,
  }))
);

const Banners = lazy(async () => import("./banners/Banners").then((module) => ({ default: module.Banners })));

const BestPlayer = lazy(async () =>
  import("./bestPlayer/BestPlayer").then((module) => ({
    default: module.BestPlayer,
  }))
);

const UsersView = lazy(async () =>
  import("./usersView/UsersView").then((module) => ({
    default: module.UsersView,
  }))
);

const Graduates = lazy(async () =>
  import("./graduates/Graduates").then((module) => ({
    default: module.Graduates,
  }))
);

const GraduateSections = lazy(async () =>
  import("./graduateSections/GraduateSections").then((module) => ({
    default: module.GraduateSections,
  }))
);

const Subscriptions = lazy(async () =>
  import("./pagesSubscriptions/subscriptions").then((module) => ({
    default: module.Subscriptions,
  }))
);

const BidToExit = lazy(async () =>
  import("./bidToExit/bidToExit").then((module) => ({
    default: module.BidToExit,
  }))
);

const Comics = lazy(async () => import("./comics/comics").then((module) => ({ default: module.Comics })));

const ComicSeasons = lazy(async () =>
  import("./comicSeasons/comicSeasons").then((module) => ({
    default: module.ComicSeasons,
  }))
);

export const Pages = () => {
  const { pathname } = useLocation();
  const token = useSelector(accessTokenSelector);
  const name = useSelector(userNameSelector);
  const needLogin = pathname.includes("invitation") || !token || !/authorization=true/.test(document.cookie);
  const rights = useSelector(rightsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    identityRepository.getUserInfo(token).then((res) => dispatch(authAction.updateUserInfo(res.policy)));
  }, []);

  const canView = (access: IMenu["policy"]) => haveAccess(rights, access);

  return (
    <Suspense fallback={<FallBack />}>
      <ReactTitle title={`App ${name ? `- ${name}` : ""}`} />

      <Routes>
        <Route path={routePaths.base} element={needLogin ? <AuthLayout /> : <AppLayout />}>
          {needLogin ? (
            <Route path={routePaths.sign.auth + "/*"} element={<AuthPage />} />
          ) : (
            <>
              {canView(accessNames.media) && [
                <Route key="1" path={routePaths.media + "/*"} element={<Media access />} />,
                <Route key="2" path={routePaths.mediaCategories + "/*"} element={<MediaCategories access />} />,
              ]}

              {canView(accessNames.cms) && [
                <Route key="1" path={routePaths.pagesSections + "/*"} element={<PagesSections access />} />,
                <Route key="2" path={routePaths.pagesSubscriptions + "/*"} element={<Subscriptions access />} />,
              ]}

              {canView(accessNames.partner) && (
                <Route path={routePaths.partners + "/*"} element={<Partners access />} />
              )}

              {canView(accessNames.calendar) && (
                <Route path={routePaths.calendar + "/*"} element={<Calendar access />} />
              )}

              {canView(accessNames.tournament) && [
                <Route key="1" path={routePaths.tournaments() + "/*"} element={<Tournaments access />} />,
                <Route key="2" path={routePaths.matches() + "/*"} element={<Matches access />} />,
                <Route key="3" path={routePaths.matching + "/*"} element={<Matching access />} />,
              ]}

              {canView(accessNames.club) && [
                <Route key="5" path={routePaths.clubsTeams + "/*"} element={<ClubsTeams access />} />,
                <Route key="6" path={routePaths.clubsPlayers + "/*"} element={<ClubsPlayers access />} />,
                <Route key="7" path={routePaths.clubsTrainers + "/*"} element={<ClubsTrainers access />} />,
                <Route key="8" path={routePaths.clubsStaff + "/*"} element={<ClubsStaff access />} />,
                <Route key="9" path={routePaths.clubsLeadership + "/*"} element={<ClubsLeadership access />} />,
              ]}

              {(canView(accessNames.clubSite) || canView(accessNames.tournament)) && [
                <Route key="1" path={routePaths.dirStadiums + "/*"} element={<DirStadiums access />} />,
                <Route key="2" path={routePaths.dirTeams + "/*"} element={<DirTeams access />} />,
              ]}

              {canView(accessNames.clubSite) && (
                <Route key="10" path={routePaths.clubsMedical + "/*"} element={<ClubsMedical access />} />
              )}

              {canView(accessNames.graduate) && [
                <Route key="1" path={routePaths.graduates + "/*"} element={<Graduates access />} />,
                <Route key="2" path={routePaths.graduateSections + "/*"} element={<GraduateSections access />} />,
              ]}

              {canView(accessNames.bindToExit) && (
                <Route key="1" path={routePaths.kidsBidToExit + "/*"} element={<BidToExit access />} />
              )}

              {canView(accessNames.specialOffer) && [
                <Route key="1" path={routePaths.specialOffer + "/*"} element={<SpecialOffer access />} />,
                <Route key="2" path={routePaths.quiz + "/*"} element={<Quiz access />} />,
              ]}

              {canView(accessNames.kids) && [
                <Route key="2" path={routePaths.kidsJournals + "/*"} element={<Comics access />} />,
                <Route key="3" path={routePaths.kidsSeasons + "/*"} element={<ComicSeasons access />} />,
              ]}

              {canView(accessNames.notification) && (
                <Route path={routePaths.notifications() + "/*"} element={<Notifications access />} />
              )}

              {canView(accessNames.stock) && (
                <Route path={routePaths.bestPlayer + "/*"} element={<BestPlayer access />} />
              )}

              {canView(accessNames.banner) && (
                <Route path={routePaths.advertising + "/*"} element={<Banners access />} />
              )}

              {canView(accessNames.role) && [
                <Route key={1} path={routePaths.employee + "/*"} element={<EmployeeView access />} />,
                <Route key={2} path={routePaths.employeeRole + "/*"} element={<EmployeeRole access />} />,
              ]}

              {canView(accessNames.fullAccess) && (
                <Route path={routePaths.usersView + "/*"} element={<UsersView access />} />
              )}

              {canView(accessNames.audit) && <Route path={routePaths.systemLog + "/*"} element={<SystemLog />} />}

              {canView(accessNames.loyalty) && (
                <Route
                  path={routePaths.loyalty + "/*"}
                  element={<Loyalty access={canView(`${accessNames.loyalty}`)} />}
                />
              )}
            </>
          )}
        </Route>

        <Route path="*" element={<Redirect path={routePaths.base} />} />
      </Routes>
    </Suspense>
  );
};

const FallBack = styled.div`
  background-color: rgb(240, 242, 245);
`;
