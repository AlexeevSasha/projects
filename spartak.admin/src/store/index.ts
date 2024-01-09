import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { clubsPlayersReducer } from "./clubsPlayers/clubsPlayers";
import { clubsStaffReducer } from "./clubsStaff/clubsStaff";
import { clubsTeamsReducer } from "./clubsTeams/clubsTeams";
import { dictionaryReducer } from "./dictionary/dictionary";
import { dirTeamsReducer } from "./dirTeams/dirTeams";
import { pagesSectionsReducer } from "./pagesSections/sectionDataSlice";
import { partnersReducer } from "./partners/partnersSlice";
import { usersViewReducer } from "./users/usersSlice";
import { trainersReducer } from "./trainers/trainersSlice";
import { tournamentsReducer } from "./tournaments/tournaments";
import { matchReducer } from "./match/match";
import { mediaCategoryReducer } from "./mediaCategories/mediaCategory";
import { mediaReducer } from "./media/media";
import { noticeReducer } from "./notice/notice";
import { employeeViewReducer } from "./employeeView/employeeView";
import { employeeRoleReducer } from "./employeeRole/employeeRole";
import { systemLogReducer } from "./systemLog/systemLog";
import { dirStadiumsReducer } from "./dirStadiums/dirStadiums";
import { notificationsReducer } from "./notifications/notifications";
import { calendarReducer } from "./calendar/calendar";
import { bannersReducer } from "./banners/banners";
import { matchingReducer } from "./matching/matching";
import { subscriptionsReducer } from "./subscriptions/subscriptionsSlice";
import { bestPlayerReducer } from "store/bestPlayer/bestPlayer";
import { graduatesReducer } from "./graduates/graduates";
import { graduateSectionsReducer } from "./graduateSections/graduateSections";
import { clubsLeadershipReducer } from "./clubsLeadership/clubsLeadership";
import { bidToExitReducer } from "./bidToExit/bidToExit";
import { comicReducer } from "./comic/comic";
import { comicSeasonsReducer } from "./comicSeasons/comicSeasons";
import { loyaltyReducer } from "./loyalty/loyalty";
import { clubsMedicalReducer } from "./clubsMedical/clubsMedical";
import { specialOffersReducer } from "./specialOffer/specialOfferSlice";
import { quizReducer } from "./quiz/quizSlise";

const isDev = process.env.NODE_ENV === "development";

const reducer = persistCombineReducers(
  {
    key: "root",
    storage,
    whitelist: ["auth"],
    debug: isDev,
  },
  {
    auth: authReducer,
    media: mediaReducer,
    usersView: usersViewReducer,
    partners: partnersReducer,
    dirStadiums: dirStadiumsReducer,
    trainers: trainersReducer,
    dirTeams: dirTeamsReducer,
    clubsTeams: clubsTeamsReducer,
    clubsPlayers: clubsPlayersReducer,
    clubsStaffs: clubsStaffReducer,
    clubsLeadership: clubsLeadershipReducer,
    clubsMedical: clubsMedicalReducer,
    tournaments: tournamentsReducer,
    match: matchReducer,
    matching: matchingReducer,
    pagesSections: pagesSectionsReducer,
    dictionary: dictionaryReducer,
    mediaCategory: mediaCategoryReducer,
    notice: noticeReducer,
    employeeView: employeeViewReducer,
    employeeRole: employeeRoleReducer,
    systemLog: systemLogReducer,
    notifications: notificationsReducer,
    calendar: calendarReducer,
    banners: bannersReducer,
    subscriptions: subscriptionsReducer,
    bestPlayer: bestPlayerReducer,
    graduates: graduatesReducer,
    graduateSections: graduateSectionsReducer,
    bidToExit: bidToExitReducer,
    comic: comicReducer,
    comicSeasons: comicSeasonsReducer,
    loyalty: loyaltyReducer,
    specialOffers: specialOffersReducer,
    quiz: quizReducer,
  }
);

export type StateType = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }),
  devTools: isDev,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
