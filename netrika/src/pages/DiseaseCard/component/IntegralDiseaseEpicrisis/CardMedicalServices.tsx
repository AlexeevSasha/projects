import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import { selectServices } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "common/components/Card/Card";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import moment from "moment";
import { RangeSwitch } from "../RangeSwitch";
import { IsOpenCardContext } from "../../../../common/components/Container/DiseaseCardLayout";
import { IMedicalServicesDiseaseCard } from "../../../../common/interfaces/medical/IMedicalServicesDiseaseCard";
import { SectionBaseServices } from "./MedicalServices/SectionBaseServices";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import { getSortByDate } from "../../helpers/getSortByDate";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardMedicalServices: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { isOpen } = useContext(IsOpenCardContext);
  const { services, loadingServices } = useSelector(selectServices);
  const [fromAll, setFromAll] = useState<boolean>(true);
  const [sortedServices, setSortedServices] = useState<IMedicalServicesDiseaseCard[]>(services);

  useEffect(() => {
    if (!loadingServices && services?.length) {
      const data = isPreview ? getSortByDate(services, "servicesDate") : services;
      if (fromAll) {
        setSortedServices(data);
      } else {
        const newServices = data.map((serv) => ({
          ...serv,
          assignedServices: serv.assignedServices.filter((as) => as.fromSms),
          servicesRendered: serv.servicesRendered.filter((sr) => sr.fromSms),
        }));
        setSortedServices(newServices);
      }
    }
  }, [fromAll, loadingServices, services, isPreview]);

  const openCard = useCallback(() => {
    if (!services?.length) {
      dispatch(DiseaseCardEpicrisisThunk.getServices(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, services]);

  return (
    <Wrapper>
      {!loadingServices && isOpen("card_services") && (
        <SwitchWrapper>
          <RangeSwitch
            rightTextWidth={"145px"}
            leftTextWidth={"65px"}
            defaultValue={fromAll}
            onChange={(value) => setFromAll(value)}
            rightText={"из всех источников"}
            leftText={"из СЭМД"}
          />
        </SwitchWrapper>
      )}
      <Card
        id={"services"}
        title={"Медицинские услуги"}
        max_height={600}
        isEmpty={false}
        overflowY={"scroll"}
        onClick={openCard}
      >
        {loadingServices ? (
          <IconLoading />
        ) : !!services?.length ? (
          <ContentWrapper style={{ marginTop: 45 }}>
            {sortedServices?.map((item, index) => (
              <Accordion
                key={index}
                isActive={isPreview && index === 0}
                title={moment(item.servicesDate).format("DD.MM.YYYY")}
              >
                <ContentWrapper>
                  <Accordion
                    size={"sm"}
                    disabledClick={!item?.assignedServices.length}
                    hiddenArrow={!item?.assignedServices.length}
                    key={"Назначенные услуги" + index}
                    isActive={isPreview && index === 0}
                    title={"Назначенные услуги"}
                  >
                    {item?.assignedServices?.length
                      ? item?.assignedServices?.map((item, i) => <SectionBaseServices service={item} key={i} />)
                      : null}
                  </Accordion>
                  <Accordion
                    disabledClick={!item?.servicesRendered.length}
                    hiddenArrow={!item?.servicesRendered.length}
                    size={"sm"}
                    key={"Оказанные услуги" + index}
                    isActive={isPreview && index === 0}
                    title={"Оказанные услуги"}
                  >
                    {item?.servicesRendered?.length
                      ? item?.servicesRendered?.map((item, i) => <SectionBaseServices service={item} key={i} />)
                      : null}
                  </Accordion>
                </ContentWrapper>
              </Accordion>
            ))}
          </ContentWrapper>
        ) : (
          <div style={{ color: theme.colors.opacityGray }}>Нет данных</div>
        )}
      </Card>
    </Wrapper>
  );
};

const SwitchWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 35px;
  left: 15px;
  background: white;
  width: calc(100% - 30px);
`;
const Wrapper = styled.div`
  position: relative;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
