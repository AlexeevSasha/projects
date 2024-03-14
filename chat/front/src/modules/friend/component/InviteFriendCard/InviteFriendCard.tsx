import { IUser } from "@/modules/user/interfaces/user";
import SuccessIcon from "../../../../../public/icon/success.svg";
import ErrorIcon from "../../../../../public/icon/error.svg";
import { Button } from "@/common/ui/Button/Button";
import styles from "./inviteFriendCard.module.scss";
import { useInviteFriendStore } from "@/modules/friend/inviteFriend.store";

interface IProps {
  inviteId: string;
  user: IUser;
}

export const InviteFriendCard = ({ user, inviteId }: IProps) => {
  const { rejectFriend, acceptFriend } = useInviteFriendStore((state) => state);

  const onClick = (type: "reject" | "accept") => {
    type === "reject" ? rejectFriend(inviteId) : acceptFriend(inviteId);
  };

  return (
    <div className={styles.container}>
      <div>
        {user.firstname} {user.lastname ? `- ${user.lastname}` : ""}
      </div>
      <div className={styles.actions}>
        <Button onClick={() => onClick("reject")} isIconSaveColor isIcon>
          <ErrorIcon />
        </Button>
        <Button onClick={() => onClick("accept")} isIconSaveColor isIcon>
          <SuccessIcon />
        </Button>
      </div>
    </div>
  );
};
