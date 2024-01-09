import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { Container, ContainerWithFooter, StatementData } from "../../common/components/Container/Container";
import { BreadCrumbs } from "../../common/ui/BreadCrumbs/BreadCrumbs";
import { InputSearch } from "../../common/ui/Input/InputSearch";
import { dictionaryClinrecPompSelector } from "../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { RangeSwitch } from "../DiseaseCard/component/RangeSwitch";
import { Pagination } from "../../common/ui/Pagination/Pagination";
import { pageSize } from "../../common/constants";
import { DictionaryClinrecPompThunk } from "../../module/dictionaryClinrecPomp/dictionaryClinrecPompThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { useDictionaryClinrecsConstructor } from "./hooks/useDictionaryClinrecsConstructor";
import { Footer } from "../../common/components/Footer";
import { useDictionaryPompConstructor } from "./hooks/useDictionaryPompConstructor";
import { useDebounce } from "../../common/hooks/useDebounce";
import { ButtonCreateElem } from "../../common/ui/Button/ButtonCreateElem";
import { IDictionaryClinrec } from "../../common/interfaces/dictionary/IDictionaryClinrec";
import { IDictionaryPomp } from "../../common/interfaces/dictionary/IDictionaryPomp";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { ModalDictionaryClinrec } from "./component/Modal/ModalDictionaryClinrecPomp/ModalDictionaryClinrec";
import { ModalDictionaryPomp } from "./component/Pomp/Modals/ModalDictionaryPomp";
import { AppSettings } from "../../common/constants/appSettings";
import { modal } from "../../common/helpers/event/modalEvent";
import { Title } from "../../common/ui/Title/Title";

export const curretClinrecContext = React.createContext<{
  setCurrentClinrec: (value: IDictionaryClinrec, view: boolean) => void;
  setCurrentPomp: (value: IDictionaryPomp, view: boolean) => void;
  pageCount: number;
  searchText: string;
}>({
  setCurrentClinrec: (value: IDictionaryClinrec) => value,
  setCurrentPomp: (value: IDictionaryPomp) => value,
  pageCount: 25,
  searchText: "",
});

export const PageDictionaryClinrecPomp: React.FC = () => {
  const [breadCrumsData] = useState([
    { name: "Справочники", link: `${AppSettings.get("REACT_APP_ROOT_FOLDER")}/dictionary` },
    { name: "Справочник клинических рекомендаций и порядков оказания медицинской помощи", link: "" },
  ]);
  const dispatch = useDispatch();
  const { login } = useSelector(authorizationSelector);
  const { clinrec, pomp, loading, totalCount, loadingClinrecSelects } = useSelector(dictionaryClinrecPompSelector);
  const clinrecs = useDictionaryClinrecsConstructor(clinrec);
  const pomps = useDictionaryPompConstructor(pomp);

  const [visiblePomp, setVisiblePomp] = useState<boolean>(false);
  const [pageCount, updatePageCount] = useState(pageSize);
  const [pageNumber, updatePageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const debounceText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(DictionaryClinrecPompThunk.getClinrecListForCreate());
    dispatch(DictionaryClinrecPompThunk.getPompList());
    dispatch(DictionaryClinrecPompThunk.getTimeoutUnit());
  }, [dispatch]);

  useEffect(() => {
    if (visiblePomp) {
      dispatch(DictionaryClinrecPompThunk.getDictionaryPomp(pageNumber, pageCount, debounceText));
    } else {
      dispatch(DictionaryClinrecPompThunk.getDictionaryClinrec(pageNumber, pageCount, debounceText));
    }
  }, [dispatch, pageNumber, pageCount, visiblePomp, debounceText]);

  useEffect(() => {
    if (visiblePomp) {
      dispatch(DictionaryClinrecPompThunk.getPompProfiles());
    } else {
      dispatch(DictionaryClinrecPompThunk.getInfoForCreateClinrec());
    }
  }, [dispatch, visiblePomp]);

  const searchChange = useCallback((value: ChangeEvent<HTMLInputElement>) => {
    setSearchText(value.currentTarget.value);
    updatePageNumber(1);
  }, []);

  const selectPageCount = useCallback(
    (value: string | number) => {
      updatePageNumber(1);
      updatePageCount(Number(value));
    },
    [updatePageCount, updatePageNumber]
  );

  const newPageNumber = useCallback(
    (newPage: number) => {
      updatePageNumber(newPage);
    },
    [updatePageNumber]
  );

  const openModalClinrec = useCallback((clinrec?: IDictionaryClinrec, disabled = false) => {
    modal.open(<ModalDictionaryClinrec curretClinrec={clinrec} disabled={disabled} />);
  }, []);

  const openModalPomp = useCallback((pomp?: IDictionaryPomp, disabled = false) => {
    modal.open(<ModalDictionaryPomp currentPomp={pomp} disabled={disabled} />);
  }, []);

  return (
    <>
      <MetaTags>
        <title>Справочник клинических рекомендаций и порядков оказания медицинской помощи</title>
      </MetaTags>
      <curretClinrecContext.Provider
        value={{
          setCurrentClinrec: (value: IDictionaryClinrec, view) => {
            openModalClinrec(value, view);
          },
          setCurrentPomp: (value: IDictionaryPomp, view) => {
            openModalPomp(value, view);
          },
          pageCount: pageCount,
          searchText: searchText,
        }}
      >
        <ContainerWithFooter>
          <Container style={{ overflow: "initial", height: "auto" }}>
            <StatementData>
              <BreadCrumbs elem={breadCrumsData} id={"Template_Dictionary_Clinrec_Pomp"} />
            </StatementData>
            <StatementData>
              <Title id={"dictionary_title"}>
                Справочник клинических рекомендаций и порядков оказания медицинской помощи
              </Title>
              <InputSearch value={searchText} onChange={searchChange} maxLength={70} />
            </StatementData>

            <StatementData>
              <RangeSwitch
                leftText={"клинические рекомендации"}
                leftTextWidth={"110px"}
                rightTextWidth={"165px"}
                rightText={"порядки оказания медицинской помощи"}
                onChange={(value) => {
                  updatePageNumber(1);
                  setVisiblePomp(value);
                }}
                defaultValue={visiblePomp}
              />
              <Pagination
                selectPageCount={selectPageCount}
                allCount={totalCount}
                countFromPage={pageCount}
                page={pageNumber}
                onClick={newPageNumber}
              />
            </StatementData>

            {(login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && !loading && (
              <StatementData>
                <ButtonCreateElem
                  onClick={() => {
                    if (visiblePomp) openModalPomp();
                    else openModalClinrec();
                  }}
                  text={
                    visiblePomp ? "Добавить порядок оказания медицинской помощи" : "Добавить клиническую рекомендацию"
                  }
                />
              </StatementData>
            )}
          </Container>

          <Container style={{ marginTop: "12px" }}>
            {loading || loadingClinrecSelects ? (
              <Container>
                <IconLoading />
              </Container>
            ) : (
              <>{!visiblePomp ? clinrecs : pomps}</>
            )}
          </Container>
          <Footer />
        </ContainerWithFooter>
      </curretClinrecContext.Provider>
    </>
  );
};
