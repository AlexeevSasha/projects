import { theme } from "common/styles/theme";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CardContainer } from "common/components/Card/CardContainer";
import { IsOpenCardContext } from "common/components/Container/DiseaseCardLayout";
import { styled } from "../../common/styles/styled";
import {
  diseaseCardPatientManagementSelector,
  selectCards,
} from "../../module/diseaseCardPatientManagement/diseaseCardPatientManagementSelector";
import { diseaseCardPatientManagementThunk } from "../../module/diseaseCardPatientManagement/diseaseCardPatientManagementThunk";
import { IconArrowViolation } from "../../common/components/Icon/IconArrowViolation";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Card } from "../../common/components/Card/Card";
import { CardTitle } from "../../common/components/Card/CardTitle";
import { NewCalendar } from "./component/IEMK/NewCalendar/NewCalendar";
import { CardClinrec } from "./component/IntegralDiseaseEpicrisis/CardClinrec";
import { CardPomp } from "./component/IntegralDiseaseEpicrisis/CardPomp";

export const PagePatientManagement = () => {
  const dispatch = useDispatch();
  const { registerId, patientId } = useParams<{ registerId: string; patientId: string }>();

  /** Методы для работы с раскрывающимися карточками */
  const [openedBlocks, setOpenedBlocks] = useState<string[]>([]);
  const isOpen = (value: string) => openedBlocks.indexOf(value) !== -1;
  const trigger = (value: string) =>
    setOpenedBlocks(isOpen(value) ? openedBlocks.filter((item) => item !== value) : [...openedBlocks, value]);
  /************************************************* */

  const state = useSelector(diseaseCardPatientManagementSelector);
  const { met, notMet, noData } = useSelector(selectCards);
  const [show, setShow] = useState<string>("");

  useEffect(() => {
    dispatch(diseaseCardPatientManagementThunk.getInfo(Number(registerId), patientId));
    dispatch(diseaseCardPatientManagementThunk.getCalendar(Number(registerId), patientId));
    dispatch(diseaseCardPatientManagementThunk.getInfoPomp(Number(registerId), patientId));
  }, [dispatch, patientId, registerId]);

  const clickElement = useCallback((id: number) => {
    setShow((prev) => (prev.indexOf(id.toString()) > -1 ? prev.replace(id.toString(), "") : prev + id));
  }, []);

  return (
    <IsOpenCardContext.Provider value={{ isOpen, trigger }}>
      <div id="container">
        <CardContainer>
          <Card id={"fulfillment_requirements"} title={"Выполнение критериев качества ведения пациента"}>
            <Card
              id={"unfulfilled_requirements"}
              title={"Не выполнены критерии качества"}
              error={true}
              isEmpty={!(notMet && notMet.length)}
            >
              {state.loading ? (
                <IconLoading />
              ) : state.error ? (
                <div style={{ color: theme.colors.opacityGray, marginBottom: "15px" }}>Ошибка получения данных</div>
              ) : notMet && notMet.length ? (
                notMet.map((item, index) => {
                  return (
                    <Block key={index}>
                      <NameViolation onClick={() => clickElement(item.id)}>
                        {show.indexOf(item.id.toString()) !== -1 ? (
                          <IconArrowViolation rotate={"0"} />
                        ) : (
                          <IconArrowViolation rotate={"-90deg"} />
                        )}
                        {item.qualityName}
                      </NameViolation>
                      <DescriptionViolation visible={show.indexOf(item.id.toString()) !== -1}>
                        {item.qualityDescription}
                      </DescriptionViolation>
                    </Block>
                  );
                })
              ) : (
                <div style={{ color: theme.colors.opacityGray }}>Искомых требований нет</div>
              )}
            </Card>
            <Card
              id={"fulfilled requirements"}
              title={"Соблюдены критерии качества"}
              success={true}
              isEmpty={!(met && met.length)}
            >
              {state.loading ? (
                <IconLoading />
              ) : state.error ? (
                <div style={{ color: theme.colors.opacityGray, marginBottom: "15px" }}>Ошибка получения данных</div>
              ) : met && met.length ? (
                met.map((item, index) => {
                  return (
                    <Block key={index}>
                      <NameViolation onClick={() => clickElement(item.id)}>
                        {show.indexOf(item.id.toString()) !== -1 ? (
                          <IconArrowViolation rotate={"0"} />
                        ) : (
                          <IconArrowViolation rotate={"-90deg"} />
                        )}
                        {item.qualityName}
                      </NameViolation>
                      <DescriptionViolation visible={show.indexOf(item.id.toString()) !== -1}>
                        {item.qualityDescription}
                      </DescriptionViolation>
                    </Block>
                  );
                })
              ) : (
                <div style={{ color: theme.colors.opacityGray }}>Искомых требований нет</div>
              )}
            </Card>
            <Card
              id={"other_requirements"}
              title={"Недостаточно данных для оценки"}
              isEmpty={!(noData && noData.length)}
            >
              {state.loading ? (
                <IconLoading />
              ) : state.error ? (
                <div style={{ color: theme.colors.opacityGray, marginBottom: "15px" }}>Ошибка получения данных</div>
              ) : noData && noData.length ? (
                noData.map((item, index) => {
                  return (
                    <Block key={index}>
                      <NameViolation onClick={() => clickElement(item.id)} id={`other_requirement_${index}`}>
                        {show.indexOf(item.id.toString()) !== -1 ? (
                          <IconArrowViolation rotate={"0"} />
                        ) : (
                          <IconArrowViolation rotate={"-90deg"} />
                        )}
                        {item.qualityName}
                      </NameViolation>
                      <DescriptionViolation visible={show.indexOf(item.id.toString()) !== -1}>
                        {item.qualityDescription}
                      </DescriptionViolation>
                    </Block>
                  );
                })
              ) : (
                <div style={{ color: theme.colors.opacityGray }}>Искомых требований нет</div>
              )}
            </Card>
          </Card>
          <CardClinrec clinrecs={state.clinrec} loading={state.loadingClinrec} isCard />
          <CardPomp pomps={state.pomp} loading={state.loadingPomp} isCard />
          <NewCalendar />
        </CardContainer>
      </div>
    </IsOpenCardContext.Provider>
  );
};

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameViolation = styled(CardTitle)`
  line-height: 200%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DescriptionViolation = styled.div<{ visible: boolean }>`
  line-height: 200%;
  color: ${theme.colors.hightBlue};
  display: ${(props) => (props.visible ? "block" : "none")};
`;
