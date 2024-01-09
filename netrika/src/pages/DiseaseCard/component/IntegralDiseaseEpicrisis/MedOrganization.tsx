import { IObservation } from "common/interfaces/IObservation";
import { theme } from "common/styles/theme";
import { DiseaseCardEpicrisisAction } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisAction";
import { selectMedOrganisation } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconCross } from "common/components/Icon/IconCross";
import { IconGroupCross } from "common/components/Icon/IconGroupCross";
import { IconGroupEmpty } from "common/components/Icon/IconGroupEmpty";
import { IconLoading } from "common/components/Icon/IconLoading";
import styled from "styled-components";
import { Card } from "common/components/Card/Card";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";

type TItem = IObservation & { isSelect: boolean };

interface IProps {
  registerId: string;
  patientId: string;
}

export const MedOrganization: FC<IProps> = ({ registerId, patientId }) => {
  const dispatch = useDispatch();
  const { medicalOrganization, loadingMedOrganization } = useSelector(selectMedOrganisation);

  const [items, setItems] = useState<TItem[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setItems(medicalOrganization);
  }, [medicalOrganization]);

  const handleCheck = (item: TItem) => () => {
    const nextItems = items.map((org) => (org.name === item.name ? { ...item, isSelect: !item.isSelect } : org));
    const selected = nextItems.filter(({ isSelect }) => isSelect);
    setItems(nextItems);
    setIsAllSelected(selected.length === nextItems.length);
    dispatch(DiseaseCardEpicrisisAction.setOrgsFilter(selected));
  };

  const handleChangeAll = () => {
    setItems(items.map((org) => ({ ...org, isSelect: !isAllSelected })));
    setIsAllSelected(!isAllSelected);
    dispatch(DiseaseCardEpicrisisAction.setOrgsFilter(!isAllSelected ? items : []));
  };

  const handleReset = () => {
    const nextItems = items.map((org) => ({ ...org, isSelect: false }));
    setItems(nextItems);
    setIsAllSelected(false);
    dispatch(DiseaseCardEpicrisisAction.setOrgsFilter([]));
  };

  const openCard = useCallback(() => {
    if (medicalOrganization.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getMedicalOrganization(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, medicalOrganization]);

  return (
    <Card
      id={"med_org"}
      title={"Медицинские организации"}
      max_height={600}
      isEmpty={!items.length}
      overflowY={"scroll"}
      onClick={openCard}
      containerStyle={{
        flexShrink: 0,
        marginBottom: 0,
        border: "none",
        borderBottom: `1px solid ${theme.colors.gray}`,
        borderRadius: 0,
      }}
      contentStyle={{ padding: "3px" }}
      contentWrapperStyle={{ maxHeight: 135 }}
    >
      {loadingMedOrganization ? (
        <IconLoading />
      ) : items.length ? (
        <Container>
          <List>
            <ListItem onClick={handleChangeAll} black>
              {isAllSelected ? <IconGroupCross /> : <IconGroupEmpty />}
              <Value>Выбрать все</Value>
            </ListItem>

            {items.map((item) => (
              <ListItem key={item.name} onClick={handleCheck(item)}>
                {item.isSelect ? <IconGroupCross /> : <IconGroupEmpty />}
                <Value>{item.name}</Value>
              </ListItem>
            ))}
          </List>

          <Reset onClick={handleReset}>
            <IconContainerFloatingmes title="Очистить фильтр">
              <IconCross color={theme.colors.green} hideFloatingmes />
            </IconContainerFloatingmes>
          </Reset>
        </Container>
      ) : (
        <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет медицинских организаций</div>
      )}
    </Card>
  );
};

const Container = styled.div`
  display: grid;
  grid: auto / auto 25px;
  color: ${theme.colors.green};
  padding: 12px;
  text-decoration: underline;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li<{ black?: boolean }>`
  display: grid;
  grid-gap: 5px;
  grid: auto / 20px auto;
  cursor: pointer;
  color: ${({ black }) => black && theme.colors.black};
`;

const Reset = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-start;
  gap: 2px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Value = styled.span`
  margin-bottom: 5px;
`;
