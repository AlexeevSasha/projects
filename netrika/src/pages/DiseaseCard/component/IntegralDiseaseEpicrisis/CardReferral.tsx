import { theme } from "common/styles/theme";
import { selectReferral } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { BlockLine } from "../../style/BlockLine";
import { BorderGreen } from "../../style/BorderGreen";
import { Type, Value } from "../../style/Description";
import { ShowMoreDiv } from "../../style/ShowMoreDiv";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { getSortByDate } from "../../helpers/getSortByDate";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardReferral: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { referrals, loadingReferral } = useSelector(selectReferral);
  const [showMore, setShowMore] = useState(true);

  const openCard = useCallback(() => {
    if (referrals && Object.keys(referrals).length === 0 && referrals.constructor === Object) {
      dispatch(DiseaseCardEpicrisisThunk.getReferrals(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, referrals]);

  const card = useMemo(() => {
    if (!referrals || !referrals.referralList || !referrals.referralList.length) return null;
    //если isPreview, то сортируем по убыванию
    const referralsSort = isPreview
      ? getSortByDate(referrals.referralList, "referralPaperDate")
      : referrals.referralList;
    const data = showMore ? referralsSort.slice(0, 1) : referralsSort;
    return data?.map((item, index) => (
      <BorderGreen key={index}>
        {item.referralPaperDate && (
          <BlockLine>
            <Type>Дата документа «Направление»:</Type>
            <Value>{moment(item.referralPaperDate).format("DD.MM.YYYY")}</Value>
          </BlockLine>
        )}

        {item.referralOutDate && (
          <BlockLine>
            <Type>Дата выдачи направления:</Type>
            <Value>{moment(item.referralOutDate).format("DD.MM.YYYY")}</Value>
          </BlockLine>
        )}

        {item.referralReason && (
          <BlockLine>
            <Type>Основание направления:</Type>
            <Value>{item.referralReason}</Value>
          </BlockLine>
        )}

        {item.sourceLpuName && (
          <BlockLine>
            <Type>Направляющая МО:</Type>
            <Value>{item.sourceLpuName}</Value>
          </BlockLine>
        )}

        {item.targetLpuName && (
          <BlockLine>
            <Type>Целевая МО:</Type>
            <Value>{item.targetLpuName}</Value>
          </BlockLine>
        )}

        {item.caseAidForm && (
          <BlockLine>
            <Type>Форма медицинской помощи:</Type>
            <Value>{item.caseAidForm}</Value>
          </BlockLine>
        )}

        {item.idReferralType && (
          <BlockLine>
            <Type>Тип направления:</Type>
            <Value>{item.idReferralType}</Value>
          </BlockLine>
        )}

        {item.caseAidType && (
          <BlockLine>
            <Type>Вид медицинской помощи:</Type>
            <Value>{item.caseAidType}</Value>
          </BlockLine>
        )}

        {item.profileMedService && (
          <BlockLine>
            <Type>Профиль медицинской помощи:</Type>
            <Value>{item.profileMedService}</Value>
          </BlockLine>
        )}

        {item.surveyOrgan && (
          <BlockLine>
            <Type>Область исследования:</Type>
            <Value>{item.surveyOrgan}</Value>
          </BlockLine>
        )}

        {item.caseAidPlace && (
          <BlockLine>
            <Type>Условие оказания медицинской помощи:</Type>
            <Value>{item.caseAidPlace}</Value>
          </BlockLine>
        )}

        {item.comment && (
          <BlockLine>
            <Type>Комментарий:</Type>
            <Value>{item.comment}</Value>
          </BlockLine>
        )}
      </BorderGreen>
    ));
  }, [referrals, showMore, isPreview]);

  return (
    <Card
      id={"referral"}
      title={"Направления"}
      max_height={600}
      isEmpty={!referrals?.referralList?.length}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingReferral ? (
        <IconLoading />
      ) : referrals?.referralList?.length ? (
        <>
          {card}
          {showMore && referrals?.referralList?.length > 1 && (
            <ShowMoreDiv onClick={() => setShowMore(false)} border={true}>
              Показать больше
            </ShowMoreDiv>
          )}
        </>
      ) : (
        <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет направлений</div>
      )}
    </Card>
  );
};
