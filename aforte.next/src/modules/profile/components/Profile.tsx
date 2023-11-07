import { DeliveredModal } from "./DeliveredModal";
import { DistributionsForm } from "./DistributionsForm";
import { OrderCard } from "./OrderCard";
import { OrderInfoDetail } from "./OrderInfoDetail";
import { OrdersInOrderInfo } from "./OrdersInOrderInfo";
import { PointsStatus } from "./PointsStatus";
import { PointsTransaction } from "./PointsTransaction";
import { ProfileAlertModal } from "./ProfileAlertModal";
import { ProfileAside } from "./ProfileAside";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileCard } from "./ProfileCard";
import { ProfileDeleteOrderModal } from "./ProfileDeleteOrderModal";
import { ProfileInfoMobile } from "./ProfileInfoMobile";
import { ProfileMobileMenu } from "./ProfileMobileMenu";
import { ProfileSettings } from "./ProfileSettings";
import { ProfileSettingsEmailAlert } from "./ProfileSettingsEmailAlert";
import { ProfileToggleSwitch } from "./ProfileToggleSwitch";

const Profile = () => <></>;

Profile.OrderCard = OrderCard;
Profile.ProfileAside = ProfileAside;
Profile.ProfileBanner = ProfileBanner;
Profile.ProfileCard = ProfileCard;
Profile.ProfileInfoMobile = ProfileInfoMobile;
Profile.ProfileMobileMenu = ProfileMobileMenu;
Profile.ProfileSwitch = ProfileToggleSwitch;
Profile.OrderInfoDetail = OrderInfoDetail;
Profile.ProfileAlertModal = ProfileAlertModal;
Profile.ProfileDeleteOrderModal = ProfileDeleteOrderModal;
Profile.DeliveredModal = DeliveredModal;
Profile.OrdersInOrderInfo = OrdersInOrderInfo;
Profile.ProfileSettings = ProfileSettings;
Profile.ProfileSettingsEmailAlert = ProfileSettingsEmailAlert;
Profile.DistributionsForm = DistributionsForm;
Profile.PointsTransaction = PointsTransaction;
Profile.PointsStatus = PointsStatus;

export { Profile };
