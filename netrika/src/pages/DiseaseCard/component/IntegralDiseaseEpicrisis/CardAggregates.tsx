import { theme } from "common/styles/theme";
import { selectAggregates } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { BlockLine } from "../../style/BlockLine";
import { Type, Value } from "../../style/Description";
import { ShowMoreDiv } from "../../style/ShowMoreDiv";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";

interface IProps {
  registerId: string;
  patientId: string;
}

export const CardAggregates = ({ ...props }: IProps) => {
  const dispatch = useDispatch();
  const { aggregates, loadingAggregates } = useSelector(selectAggregates);
  const [showMore, setShowMore] = useState(true);

  const openCard = useCallback(() => {
    if (aggregates.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getAggregates(Number(props.registerId), props.patientId));
    }
  }, [props, dispatch, aggregates]);

  const infoList = useMemo(() => {
    if (!aggregates || !aggregates.length) return null;
    const data = showMore ? aggregates.slice(0, 1) : aggregates;

    return data.map((item, index) => (
      <BlockLine key={item.name + "_" + index}>
        <Type>{item.name}:</Type>
        <Value>{item.value}</Value>
      </BlockLine>
    ));
  }, [aggregates, showMore]);

  return (
    <Card
      id={"aggregates"}
      title={"Расчётные показатели пациента"}
      max_height={600}
      isEmpty={!aggregates?.length}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingAggregates ? (
        <IconLoading />
      ) : aggregates?.length > 0 ? (
        <>
          {infoList}
          {showMore && aggregates?.length > 1 && (
            <ShowMoreDiv onClick={() => setShowMore(false)} border={true}>
              Показать больше
            </ShowMoreDiv>
          )}
        </>
      ) : (
        <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет агрегатов</div>
      )}
    </Card>
  );
};
