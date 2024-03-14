import { InviteFriendCard } from "@/modules/friend/component/InviteFriendCard/InviteFriendCard";
import styles from "./invitationsModal.module.scss";
import { IInviteFriend } from "@/modules/friend/interfaces/IInviteFriend";

interface IProps {
  inviteUsers: IInviteFriend[];
}

export const InvitationsModal = ({ inviteUsers }: IProps) => {
  return (
    <div className={styles.container}>
      {inviteUsers?.map((el) => <InviteFriendCard key={el.id} user={el.sender} inviteId={el.id} />)}
      {!inviteUsers.length && <p className={styles.empty}>No one has sent you an invitation yet</p>}
    </div>
  );
};
