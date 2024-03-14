import { WrapperMenuItem } from "@/common/components/WrapperMenuItem/WrapperMenuItem";
import InviteIcon from "../../../../public/icon/invite.svg";
import { useInviteFriendStore } from "@/modules/friend/inviteFriend.store";
import { useEffect } from "react";
import { modal } from "@/modules/popup/helpers/modal";
import { InvitationsModal } from "@/modules/friend/component/InvitationsModal/InvitationsModal";

export const Invitations = () => {
  const { getAllInvitations, inviteUsers } = useInviteFriendStore((state) => state);

  useEffect(() => {
    getAllInvitations().then();
  }, []);

  return (
    <div>
      <WrapperMenuItem
        badgeCount={inviteUsers.length}
        onClick={() => modal.open({ children: () => <InvitationsModal inviteUsers={inviteUsers} /> })}
        title={"Invitations"}
        icon={<InviteIcon />}
      />
    </div>
  );
};
