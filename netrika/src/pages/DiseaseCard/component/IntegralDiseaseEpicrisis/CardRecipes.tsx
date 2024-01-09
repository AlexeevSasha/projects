import React, { useCallback, useMemo } from "react";
import { theme } from "common/styles/theme";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { selectRecipes } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { Card } from "../../../../common/components/Card/Card";
import { Type, Value } from "../../style/Description";
import moment from "moment";
import styled from "styled-components";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import { getSortByDate } from "../../helpers/getSortByDate";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

const undSimular = (a: string, b: string) => {
  let str = "";
  if (a === "Н/Д" && b === "Н/Д") {
    str = "Нет данных";
    return str;
  }
  if (a !== "Н/Д") {
    str = a;
  }

  if (b !== "Н/Д") {
    str = `${str} ${b}`;
  }
  return str;
};

export const CardRecipes: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { loadingRecipes, recipes } = useSelector(selectRecipes);

  const openCard = useCallback(async () => {
    await dispatch(DiseaseCardEpicrisisThunk.getRecipes(Number(registerId), patientId));
  }, [registerId, patientId, dispatch]);

  const render = useMemo(() => {
    if (Object.values(recipes).every((v) => !v?.length))
      return <div style={{ color: theme.colors.opacityGray }}>Нет данных</div>;

    const coverageList = recipes?.coverageList?.length ? (
      <Accordion isActive={isPreview} hiddenPadding hiddenBorder title={"Льготы"}>
        <Container>
          {getSortByDate(recipes.coverageList, "covPeriodEnd")?.map((item, i) => (
            <Accordion
              isActive={isPreview && !i}
              styleTitle={{ fontWeight: 500 }}
              size={"sm"}
              key={i}
              title={`Льгота ${item.covNumber}`}
            >
              <Container>
                <Content>
                  <Type>Серия и номер льготы</Type>
                  <Value>{item.covNumber ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>МО, присвоившая льготу</Type>
                  <Value>{item.covPayer ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Дата начала действия документа</Type>
                  <Value>{item.covPeriodStart ? moment(item.covPeriodStart).format("DD.MM.YYYY") : "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Дата окончания действия документа</Type>
                  <Value>{item.covPeriodEnd ? moment(item.covPeriodEnd).format("DD.MM.YYYY") : "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Категория граждан</Type>
                  <Value>{item.covCategoryCode ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Диагноз</Type>
                  <Value>{item.covDiagnosis ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Вид предоставленной льготы</Type>
                  <Value>{item.covClassDisplay ?? "Нет данных"}</Value>
                </Content>
              </Container>
            </Accordion>
          ))}
        </Container>
      </Accordion>
    ) : null;

    const medRequestList = recipes?.medRequestList?.length ? (
      <Accordion isActive={isPreview} hiddenPadding hiddenBorder title={"Рецепты"}>
        <Container>
          {getSortByDate(recipes.medRequestList, "medreqPeriodEnd").map((item, i) => (
            <Accordion
              isActive={isPreview && !i}
              styleTitle={{ fontWeight: 500 }}
              key={item.medreqValue + i}
              size={"sm"}
              title={`Рецепт ${item.medreqValue}`}
            >
              <Container>
                <Content>
                  <Type>Серия и номер рецепта</Type>
                  <Value>{item.medreqValue ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Серия и номер льготы</Type>
                  <Value>{item.medreqInsurance ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Организация, выписавшая рецепт</Type>
                  <Value>{item.medreqAssigner ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Врач, выписавший рецепт</Type>
                  <Value>{item.medreqRequester ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Дата выписки рецепта</Type>
                  <Value>
                    {item.medreqAuthoredon ? moment(item.medreqAuthoredon).format("DD.MM.YYYY") : "Нет данных"}
                  </Value>
                </Content>
                <Content>
                  <Type>Срок действия рецепта</Type>
                  <Value>
                    {item.medreqPeriodStart ? moment(item.medreqPeriodStart).format("DD.MM.YYYY") : "Нет данных"}
                    {" - "}
                    {item.medreqPeriodEnd ? moment(item.medreqPeriodEnd).format("DD.MM.YYYY") : "Нет данных"}
                  </Value>
                </Content>
                <Content>
                  <Type>Статус</Type>
                  <Value>{item.medreqStatus ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Отметка о срочности</Type>
                  <Value>{item.medreqPriority ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Диагноз</Type>
                  <Value>{item.medreqDiagnosis ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Назначенный медикамент</Type>
                  <Value>{item.medreqMedication ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Способ применения</Type>
                  <Value>{item.medreqInstruction ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Способ введения</Type>
                  <Value>{item.medreqRoute ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Доза</Type>
                  <Value>
                    {item.medreqDose ?? "Нет данных"} {item.medreqSinledose ?? "Нет данных"}
                  </Value>
                </Content>
                <Content>
                  <Type>Количество выписанного ЛП, СПЛП или МИ</Type>
                  <Value>{item.medreqUnit ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Продолжительность приема</Type>
                  <Value>
                    {undSimular(
                      String(item.medreqDuration ?? "Нет данных"),
                      item.medreqDurationUnitName ?? "Нет данных"
                    )}
                  </Value>
                </Content>
                {item?.medreqDisp?.length ? (
                  <Accordion size={"sm"} title={"Отпуск"}>
                    {item.medreqDisp.map((medreqDisp, i) => (
                      <Container key={medreqDisp.meddispValue + i}>
                        <Content>
                          <Type>Номер документа об отпуске</Type>
                          <Value>{medreqDisp.meddispValue ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>Статус документа</Type>
                          <Value>{medreqDisp.meddispStatus ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>Причина отказа</Type>
                          <Value>{medreqDisp.meddispRefuse ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>Отпущенный ЛП, СПЛП, МИ</Type>
                          <Value>{medreqDisp.meddispMedication ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>Дата отпуска</Type>
                          <Value>
                            {medreqDisp.meddispDate
                              ? moment(medreqDisp.meddispDate).format("DD.MM.YYYY")
                              : "Нет данных"}
                          </Value>
                        </Content>
                        <Content>
                          <Type>Сотрудник, отпустивший рецепт</Type>
                          <Value>{medreqDisp.meddispPreformer ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>МО, отпустившая рецепт</Type>
                          <Value>{medreqDisp.meddispAssigner ?? "Нет данных"}</Value>
                        </Content>
                        <Content>
                          <Type>Количство отпущенных потребительских упаковок</Type>
                          <Value>
                            {undSimular(
                              String(medreqDisp.meddispQuantity ?? "Нет данных"),
                              medreqDisp.meddispQuantityUnit ?? "Нет данных"
                            )}
                          </Value>
                        </Content>
                      </Container>
                    ))}
                  </Accordion>
                ) : null}
              </Container>
            </Accordion>
          ))}
        </Container>
      </Accordion>
    ) : null;

    const meddispList = recipes?.meddispList?.length ? (
      <Accordion isActive={isPreview} hiddenPadding hiddenBorder title={"Отпуск рецептов"}>
        <Container>
          {getSortByDate(recipes?.meddispList, "meddispDate").map((item, i) => (
            <Accordion
              isActive={isPreview && !i}
              styleTitle={{ fontWeight: 500 }}
              size={"sm"}
              title={`Документ об отпуске ${item?.meddispValue || ""}`}
              key={item.meddispValue}
            >
              <Container>
                <Content>
                  <Type>Номер документа об отпуске</Type>
                  <Value>{item.meddispValue ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Серия и номер рецепта</Type>
                  <Value>{item.meddispMedreqNumder ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Статус документа</Type>
                  <Value>{item.meddispStatus ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Причина отказа</Type>
                  <Value>{item.meddispRefuse ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Отпущенный ЛП, СПЛП, МИ</Type>
                  <Value>{item.meddispMedication ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Дата отпуска</Type>
                  <Value>{item.meddispDate ? moment(item.meddispDate).format("DD.MM.YYYY") : "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Сотрудник, отпустивший рецепт</Type>
                  <Value>{item.meddispPreformer ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>МО, отпустившая рецепт</Type>
                  <Value>{item.meddispAssigner ?? "Нет данных"}</Value>
                </Content>
                <Content>
                  <Type>Количство отпущенных потребительских упаковок</Type>
                  <Value>
                    {undSimular(String(item.meddispQuantity ?? "Нет данных"), item.meddispQuantityUnit ?? "Нет данных")}
                  </Value>
                </Content>
              </Container>
            </Accordion>
          ))}
        </Container>
      </Accordion>
    ) : null;

    return (
      <Container>
        {coverageList}
        {medRequestList}
        {meddispList}
      </Container>
    );
  }, [isPreview, recipes]);

  return (
    <Card
      id={"recipes"}
      title={"Рецепты и льготы"}
      max_height={600}
      isEmpty={Object.values(recipes).every((v) => !v?.length)}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingRecipes ? <IconLoading /> : render}
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
