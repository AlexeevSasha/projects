import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, ContainerWithFooter, StatementData } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { proposalDiseaseCardSelector } from "../../module/proposalDiseaseCard/proposalDiseaseCardSelector";
import { ProposalDiseaseCardThunk } from "../../module/proposalDiseaseCard/proposalDiseaseCardThunk";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { Footer } from "../../common/components/Footer";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { InputWithActions } from "../../common/ui/Input/InputWithActions";
import { styled } from "../../common/styles/styled";
import { OrderApiRequest } from "../../api/orderApiRequest";
import { useChaptersConstructor } from "./hooks/useChaptersConstructor";
import { useOrderStatus } from "./hooks/useOrderStatus";
import { useDiseaseInfoModal } from "./hooks/useDiseaseInfoModal";
import { successPopup } from "../../common/helpers/toast/success";
import { errorPopup } from "../../common/helpers/toast/error";
import { AppSettings } from "../../common/constants/appSettings";

export const PageProposalDiseaseInfo = () => {
  const { id: proposalId } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const state = useSelector(proposalDiseaseCardSelector);
  const { orderName } = useSelector(orderStatusSelector);

  const [activeInput, setActiveInput] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [visibleModal, updateVisibleModal] = useState<boolean>(false);
  const [customModal, updateCustomModal] = useState({ show: false, chapterId: 0 });
  const [editElement, setEditElement] = useState<any>();

  const access = useOrderStatus();

  useEffect(() => {
    dispatch(ProposalDiseaseCardThunk.getList(+proposalId));
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(+proposalId));
    dispatch(ProposalDiseaseCardThunk.getShowBtnAddCustomBlock());
  }, [dispatch, proposalId]);

  const chapters = useChaptersConstructor({
    visibleModal,
    customModal,
    updateCustomModal,
    updateVisibleModal,
    editElement,
    setEditElement,
  });

  useDiseaseInfoModal({
    updateCustomModal,
    customModal,
    updateVisibleModal,
    visibleModal,
    editElement,
    setEditElement,
  });

  useEffect(() => {
    new OrderApiRequest().getPatientRouteLink(+proposalId).then((request) => setDefaultValue(request.result));
  }, [dispatch, proposalId]);

  // Обновление ссылки
  const onSave = useCallback(
    async (value: string) => {
      try {
        const result = await new OrderApiRequest().setPatientRouteLink(+proposalId, value);

        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }

      setActiveInput("");
    },
    [proposalId]
  );

  return (
    <ContainerWithFooter>
      <HorisontalNavMenuRegister
        links={useNavigationProposal()}
        title={true}
        breadcrumbs={orderName}
        sectionName={"Заявки"}
      />
      <StatementData />

      <Container id="container_disease_info">
        {AppSettings.get("show_screen_route") && (
          <>
            <Title id={"title"}>Ссылка отчёта по маршруту</Title>
            <InputWithActions
              access={access}
              name="linkSettingDashboard"
              defaultValue={defaultValue}
              clickSave={onSave}
              clickEdit={setActiveInput}
              disabled={activeInput !== "linkSettingDashboard"}
              placeholder="Укажите адрес отчёта"
              maxLength={300}
            />
          </>
        )}
        {state.loading ? <IconLoading /> : chapters}
      </Container>
      <Footer />
    </ContainerWithFooter>
  );
};

const Title = styled.h2`
  margin-bottom: 20px;
`;
