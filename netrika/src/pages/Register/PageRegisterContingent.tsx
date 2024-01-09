import React, { useEffect, useMemo } from "react";
import { HorisontalNavMenuRegister } from "../../common/components/HorisontalNavMenuRegister";
import { Footer } from "../../common/components/Footer";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RegisterContingentThunk } from "../../module/registerContingent/registerContingentThunk";
import { registerContingentSelector } from "../../module/registerContingent/registerContingentSelector";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { RegisterGeneralInfoThunk } from "../../module/registerGeneralInfo/registerGeneralInfoThunk";
import { registerNameSelector } from "../../module/registerName/registerNameSelector";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { AppSettings } from "../../common/constants/appSettings";
import { useRegisterNavigation } from "./hooks/useRegisterNavigation";

export const PageRegisterContingent = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const registerId = useMemo(() => +id, [id]);
  const { list, newList, loading } = useSelector(registerContingentSelector);
  const stateRegisterName = useSelector(registerNameSelector);

  useEffect(() => {
    if (AppSettings.get("show_screen_route")) {
      dispatch(RegisterContingentThunk.getNewList(registerId));
    } else {
      dispatch(RegisterContingentThunk.getList(registerId));
    }
    dispatch(RegisterGeneralInfoThunk.getRegisterName(registerId));
  }, [dispatch, registerId]);

  const renderListIframe = useMemo(() => {
    return list.length
      ? list.map((item, i) => (
          <div key={i}>
            <iframe
              id={`frame_contingent_${i}`}
              width="100%"
              height="580px"
              seamless
              frameBorder="0"
              src={item}
              title="Диаграмма"
            />
          </div>
        ))
      : newList
      ? newList.map((item, i) => (
          <div key={i}>
            <iframe
              id={`frame_contingent_${i}`}
              width="100%"
              height="580px"
              seamless
              frameBorder="0"
              src={item.authUrl}
              title="Диаграмма"
            />
          </div>
        ))
      : null;
  }, [newList, list]);

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister
        links={useRegisterNavigation()}
        title={true}
        breadcrumbs={stateRegisterName.registerName}
      />
      <StatementData />
      <Container>{loading ? <IconLoading /> : renderListIframe}</Container>
      <Footer />
    </ContainerWithFooter>
  );
};
