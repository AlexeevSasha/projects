import { IReview } from "../interfaces/Review";
import { reviewTableColumns } from "../constants/reviewTableColumns";
import { AppTable } from "../../../components/ui/AppTable";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { UserT } from "../../user/interfaces/UserT";
import { useSession } from "next-auth/react";

interface IProps {
  reviews: IReview[];
  handlerDelete: (id: string) => void;
}

export const ReviewTable = ({ reviews, handlerDelete }: IProps) => {
  const { locale } = useRouter();
  const { data } = useSession();

  return (
    <AppTable
      columns={reviewTableColumns(getLanguage(locale), data?.user as UserT, handlerDelete)}
      rows={reviews}
    />
  );
};
