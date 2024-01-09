import { MoveContainer } from "common/components/Container/MoveContainer";
import {
  selectCommonSettings,
  selectIsLoading,
  selectSearchType,
  selectSettings,
} from "module/registerSettingsCheckList/registerSettingsCheckListSelector";
import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CommonSettings } from "./components/CommonSettings";
import { QualityFilter } from "./components/QualityFilter";
import { SettingsButtons } from "./components/SettingsButtons";
import { SQLEditor } from "./components/SQLEditor";
import { DescriptionCheckList } from "./components/DescriptionCheckList";
import { ConstructorFilterContainer } from "../ConstructorFilterContainer";
import { RangeSwitch } from "../../../../DiseaseCard/component/RangeSwitch";
import { ConstructorSettingFilter } from "./Filter/ConstructorSettingFilter";
import { filterFieldsListSelector } from "../../../../../module/registerCheckListFilterFields/registerCheckListFilterFieldsSelector";
import { RegisterSettingsCheckListAction } from "../../../../../module/registerSettingsCheckList/registerSettingsCheckListAction";
import { DrawerContainer } from "../../../../../common/components/Popup/components/DrawerContainer";
import { drawer } from "../../../../../common/helpers/event/modalEvent";
import { ModalFooter } from "../../../../../common/components/Popup/components/ModalFooter";

interface IProps {
  registerId: number;
  isCreate?: boolean;
  isSuperExpert?: boolean;
}

export const ConstructorSettings: FC<IProps> = ({ registerId, isCreate, isSuperExpert }) => {
  const dispatch = useDispatch();
  const searchType = useSelector(selectSearchType);
  const isLoading = useSelector(selectIsLoading);
  const { description } = useSelector(selectCommonSettings);
  const isExtendedKs = useSelector(selectSettings).isExtendedKs;
  const { loadingDefaultFilterFields, loadingFilterFields, loadingScreen } = useSelector(filterFieldsListSelector);

  useEffect(() => {
    if (isCreate) {
      dispatch(RegisterSettingsCheckListAction.updateIsExtendedKs(!isSuperExpert));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    drawer.close();
  }, []);

  return (
    <DrawerContainer
      id={"modal"}
      styleContainer={{ paddingBottom: 0 }}
      width={90}
      unitOfMeasureWidth={"vw"}
      loading={isLoading || loadingScreen}
      title={
        <HeaderContainer>
          <div> Настройки контрольного списка</div>
          {!isLoading && !loadingScreen && !loadingFilterFields && !loadingDefaultFilterFields && (
            <RangeSwitch
              leftText={"расширенная настройка"}
              maxWidth={"500px"}
              rightText={"упрощенная настройка"}
              onChange={(value) => {
                dispatch(RegisterSettingsCheckListAction.updateIsExtendedKs(!value));
              }}
              defaultValue={!(isCreate ? !isSuperExpert : isExtendedKs)}
            />
          )}
        </HeaderContainer>
      }
    >
      <Container>
        {!isExtendedKs ? (
          loadingFilterFields || loadingDefaultFilterFields || isLoading ? null : (
            <ConstructorSettingFilter
              isExtendedKs={isExtendedKs}
              registerId={registerId}
              onClose={onClose}
              isCreate={isCreate}
            />
          )
        ) : (
          <Content>
            {isExtendedKs && <CommonSettings showAdditionalFields={searchType} />}

            {isExtendedKs && (
              <MoveContainer
                firstBlock={
                  <FilterContainer>
                    {searchType ? (
                      <>
                        <ConstructorFilterContainer type="filterCheckList" />
                        <QualityFilter registerId={registerId} />
                      </>
                    ) : (
                      <SQLEditor />
                    )}
                  </FilterContainer>
                }
                secondBlock={<DescriptionCheckList text={description} />}
              />
            )}
          </Content>
        )}
        {isExtendedKs && (
          <ModalFooter>
            <SettingsButtons onClose={onClose} isCreate={isCreate} />
          </ModalFooter>
        )}
      </Container>
    </DrawerContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin: 0;
  }
`;

const FilterContainer = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
