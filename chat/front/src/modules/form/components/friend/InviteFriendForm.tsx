import style from "./inviteFriendForm.module.scss";
import { Input } from "@/common/ui/Input/Input";
import { Button } from "@/common/ui/Button/Button";
import { Loader } from "@/common/components/Loader/Loader";
import { useForm } from "@/modules/form/hooks/useForm";
import { InviteValidation } from "@/modules/form/validation/friend/invite.validation";
import { useInviteFriendStore } from "@/modules/friend/inviteFriend.store";
import { modal } from "@/modules/popup/helpers/modal";

interface IProps {
  formId: string;
}

export const InviteFriendForm = (props: IProps) => {
  const { inviteFriend, loading } = useInviteFriendStore((state) => state);
  const { values, handleChange, handleSubmit, errors } = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: InviteValidation,
    onSubmit: async ({ email }) => {
      await inviteFriend(email).then(() => modal.close(props.formId));
    },
  });

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <Input error={errors?.email || ""} onChange={handleChange} value={values.email} id={"email"} name={"email"} placeholder={"Email"} />
      <Button fullWith disabled={loading} size={"lg"} type={"submit"}>
        Invite friend
      </Button>
      <Loader loading={loading} />
    </form>
  );
};
