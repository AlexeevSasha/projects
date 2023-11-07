import { IReview } from "../interfaces/Review";
import { nameConsultListsEnum } from "../constants/nameLists";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  review: IReview;
}

export const ReviewDetails = ({ review }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).review;

  return (
    <div className={"mb-4"}>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.full_name} </div>
        <span>-</span>
        <div>{review.fullName}</div>
      </div>
      <hr />
      <div className={" flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.who_did_you_consult}</div>
        <span>-</span>
        <div>{nameConsultListsEnum[review.nameConsult as keyof typeof nameConsultListsEnum]}</div>
      </div>
      <hr />
      <div className={" flex flex-wrap items-center gap-2 pt-2 pb-2"}>
        <div className={"text-lg font-medium"}>{lang.assess_from_1_to_10}</div>
        <span>-</span>
        <div>{review.rating}</div>
      </div>
      <hr />
      <div className={" flex flex-col gap-2 pt-2 pb-2 "}>
        <div className={"text-lg font-medium"}>{lang.what_did_you_like}</div>
        <div>{review.likeIt}</div>
      </div>
      <hr />
      <div className={" flex flex-col gap-2 pt-2 pb-2 "}>
        <div className={"text-lg font-medium"}>{lang.what_can_we_improve}</div>
        <div>{review.offers}</div>
      </div>
      <hr />
      <div className={" flex flex-col gap-2 pt-2 pb-2 "}>
        <div className={"text-lg font-medium"}>{lang.how_comfortable_using_site}</div>
        <div>{review.comfort}</div>
      </div>
      <hr />
      <div className={" flex flex-col gap-2 pt-2 pb-2 "}>
        <div className={"text-lg font-medium"}>{lang.recommend_service}</div>
        <div>{review.recommendation}</div>
      </div>
      <hr />
      <div className={" flex  gap-4 pt-2 pb-2 "}>
        <div style={{ minWidth: "140px" }} className={"w-full max-w-lg text-lg font-medium"}>
          {lang.review_personal}
        </div>
        <div>{review.personalAboutTorsunov}</div>
      </div>
      <hr />
      <div className={"flex flex-wrap items-center gap-2 pt-2 pb-2 "}>
        <div className={"text-lg font-medium "}>{lang.consent_to_publication_resources}</div>
        <span>-</span>
        <div>{review.agreement ? "Согласен(-на)" : "Не согласен(-на)"}</div>
      </div>
    </div>
  );
};
