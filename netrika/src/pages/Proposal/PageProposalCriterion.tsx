import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ru } from "common/lang/ru";
import { Container, ContainerWithFooter } from "common/components/Container/Container";
import { HorisontalNavMenuRegister } from "common/components/HorisontalNavMenuRegister";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { OrderStatusEnum } from "../../common/interfaces/order/OrderStatusEnum";
import { UserRolesEnum } from "../../common/interfaces/user/UserRolesEnum";
import { styled } from "../../common/styles/styled";
import { authorizationSelector } from "../../module/authorization/authorizationSelector";
import { orderStatusSelector } from "../../module/orderStatus/orderStstusSelector";
import { selectDescription, selectIsLoading } from "../../module/proposalCriterion/proposalCriterionSelector";
import { ProposalCriterionThunk } from "../../module/proposalCriterion/proposalCriterionThunk";
import { ProposalGeneralInfoThunk } from "../../module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { IconEdit } from "../../common/components/Icon/IconEdit";
import { IconLoading } from "../../common/components/Icon/IconLoading";
import { IconSave } from "../../common/components/Icon/IconSave";
import { IconSettings } from "../../common/components/Icon/IconSettings";
import { Footer } from "../../common/components/Footer";
import { Access, orderAccess } from "./helpers/access";
import { FormCreateCriterion } from "./components/Criterion/FormCreateCriterion";
import { useNavigationProposal } from "./hooks/useNavProposal";
import { TextAreaStyle } from "../../common/ui/Input/styles/textAreaStyles";
import { drawer } from "../../common/helpers/event/modalEvent";
import { visibilityChaptersUserSelector } from "../../module/usersList/usersListSelector";

export const PageProposalCriterion = () => {
  const { id } = useParams<{ id: string }>();
  const proposalId = useMemo(() => +id, [id]);

  const dispatch = useDispatch();

  const loading = useSelector(selectIsLoading);
  const description = useSelector(selectDescription);
  const { seeAllChaptersOrder } = useSelector(visibilityChaptersUserSelector);
  const { login } = useSelector(authorizationSelector);
  const { orderStatus, orderName } = useSelector(orderStatusSelector);

  const access = useMemo(() => orderAccess(login, orderStatus), [login, orderStatus]);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [edit, setEdit] = useState(false);

  const clickSave = () => {
    dispatch(
      ProposalCriterionThunk.updateCriterionText({
        orderId: proposalId,
        criteriaDescription: descRef.current?.value || "",
      })
    );
    setEdit(false);
  };

  const clickEdit = () => setEdit(true);

  useEffect(() => {
    dispatch(ProposalGeneralInfoThunk.getOrderStatus(proposalId));
    dispatch(ProposalCriterionThunk.getCriterionFind());
    dispatch(ProposalCriterionThunk.getCriterionFilters(proposalId));
    dispatch(ProposalCriterionThunk.getCriterionText(proposalId));
  }, [dispatch, proposalId]);

  const openDrawerCriterion = useCallback(() => {
    drawer.open(<FormCreateCriterion registerId={proposalId} />);
  }, [proposalId]);

  const showSetting = useMemo(() => {
    const access =
      (orderStatus === OrderStatusEnum.Validation && login === UserRolesEnum.RegistryAdmin) ||
      login === UserRolesEnum.RegistrySuperUsr;

    return seeAllChaptersOrder && access;
  }, [seeAllChaptersOrder, orderStatus, login]);

  return (
    <ContainerWithFooter overflow={"visible"}>
      <HorisontalNavMenuRegister links={useNavigationProposal()} title breadcrumbs={orderName} sectionName={"Заявки"} />
      {loading ? (
        <IconLoading />
      ) : (
        <>
          {access === Access.Edit && (
            <ButtonBlock>
              {edit ? (
                <IconContainerFloatingmes
                  id={"save_description"}
                  onClick={clickSave}
                  title={ru.floatingmes.save}
                  position="right"
                >
                  <IconSave />
                </IconContainerFloatingmes>
              ) : (
                <IconContainerFloatingmes
                  id={"edit_description"}
                  onClick={clickEdit}
                  title={ru.floatingmes.edit}
                  position="right"
                >
                  <IconEdit />
                </IconContainerFloatingmes>
              )}
              {showSetting && (
                <IconContainerFloatingmes
                  id={"open_settings"}
                  onClick={openDrawerCriterion}
                  title={ru.floatingmes.settings}
                  position="right"
                >
                  <IconSettings />
                </IconContainerFloatingmes>
              )}
            </ButtonBlock>
          )}
          <Container>
            <TextAreaCustom
              style={{ height: "100%", maxHeight: "90%" }}
              id={"input_description"}
              ref={descRef}
              error={false}
              placeholder={"Описание критериев"}
              disabled={!edit}
              defaultValue={description}
              maxLength={5000}
            />
          </Container>
        </>
      )}
      <Footer />
    </ContainerWithFooter>
  );
};

const TextAreaCustom = styled(TextAreaStyle)`
  height: 100%;
  max-height: 90%;

  ::placeholder {
    font-weight: 600;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  margin: 40px 0 20px 0;
`;
