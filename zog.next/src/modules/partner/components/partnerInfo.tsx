import { UserPartnerInfoT } from "../../user/interfaces/UserT";
import { usePartner } from "../hooks/usePartner";

interface IProps {
  user: UserPartnerInfoT;
}

export const PartnerInfo = ({ user }: IProps) => {
  const { subjectPartners } = usePartner(user);
  return <div className={"p-4"}>{subjectPartners}</div>;
};
