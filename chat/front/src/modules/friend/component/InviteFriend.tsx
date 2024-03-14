import PlusIcon from "../../../../public/icon/plus.svg";
import { Button } from "@/common/ui/Button/Button";
import { modal } from "@/modules/popup/helpers/modal";
import { InviteFriendForm } from "@/modules/form/components/friend/InviteFriendForm";

export const InviteFriend = () => {
  return (
    <Button onClick={() => modal.open({ children: (id) => <InviteFriendForm formId={id} /> })} isIcon>
      <PlusIcon />
    </Button>
  );
};
