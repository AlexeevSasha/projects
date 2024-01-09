import { IOrder } from "common/interfaces/order/IOrder";
import { styled } from "common/styles/styled";
import { authorizationSelector } from "module/authorization/authorizationSelector";
import { enableNsiOptionSelector } from "module/orderStatus/orderStstusSelector";
import { ProposalGeneralInfoThunk } from "module/proposalGeneralInfo/proposalGeneralInfoThunk";
import { userGroupsSelector, workPositionSelector } from "module/usersList/usersListSelector";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { Access } from "../../helpers/access";
import { InputDescription } from "./FormInfoProposal/InputDescription";
import { InputGroup } from "./FormInfoProposal/InputGroup";
import { InputName } from "./FormInfoProposal/InputName";
import { InputNetwork } from "./FormInfoProposal/InputNetwork";
import { InputNSI } from "./FormInfoProposal/InputNSI";
import { InputUserGroup } from "./FormInfoProposal/InputUserGroup";
import { InputVitrina } from "./FormInfoProposal/InputVitrina";
import { InputWorkPosition } from "./FormInfoProposal/InputWorkPosition";
import { InputMedicalCareProfile } from "./FormInfoProposal/InputMedicalCareProfile";
import { UserRolesEnum } from "../../../../common/interfaces/user/UserRolesEnum";
import { InputVimisSyst } from "./FormInfoProposal/InputVimisSyst";
import { proposalGeneralInfoSelector } from "../../../../module/proposalGeneralInfo/proposalGeneralInfoSelector";
import { FormInfoFieldsEnum } from "../../interfaces/FormInfoFieldsEnum";

interface IProps {
  access: Access;
  info: IOrder;
  avalableRegisterNetworkList: ICustomSelect[];
  registerGroup: ICustomSelect[];
  updateInfo: (value: IOrder) => void;
  hiddenFields?: Array<FormInfoFieldsEnum>;
}

export const FormInfoProposal = ({ info, hiddenFields = [], ...props }: IProps) => {
  const dispatch = useDispatch();
  const workPosition = useSelector(workPositionSelector);
  const userGroups = useSelector(userGroupsSelector);
  const enableNsiOption = useSelector(enableNsiOptionSelector);
  const stateAuth = useSelector(authorizationSelector);
  const vimisSystemOptions = useSelector(proposalGeneralInfoSelector).vimisSystemOption;
  const optionsMedicalCareProfile = useSelector(proposalGeneralInfoSelector);
  const { login } = useSelector(authorizationSelector);

  const [activeInput, setActiveInput] = useState("");

  const saveProposal = async (value?: IOrder) => {
    if (value) {
      await dispatch(ProposalGeneralInfoThunk.save(value, () => props.updateInfo(value)));
    } else {
      await dispatch(ProposalGeneralInfoThunk.save(info));
    }
  };

  return (
    <Container>
      <ColumnContainer>
        {!hiddenFields.includes(FormInfoFieldsEnum.Name) && (
          <InputName
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            disabled={activeInput !== FormInfoFieldsEnum.Name}
            clickEdit={setActiveInput}
            stateAuth={stateAuth}
          />
        )}
        {!hiddenFields.includes(FormInfoFieldsEnum.Description) && (
          <InputDescription
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            disabled={activeInput !== FormInfoFieldsEnum.Description}
            clickEdit={setActiveInput}
            stateAuth={stateAuth}
          />
        )}
        {!hiddenFields.includes(FormInfoFieldsEnum.Vitrina) &&
          (login === UserRolesEnum.RegistryAdmin || login === UserRolesEnum.RegistrySuperUsr) && (
            <InputVitrina
              access={props.access}
              saveProposal={saveProposal}
              info={info}
              stateAuth={stateAuth}
              disabled={activeInput !== FormInfoFieldsEnum.Vitrina}
              clickEdit={setActiveInput}
            />
          )}
        {!hiddenFields.includes(FormInfoFieldsEnum.NSI) && enableNsiOption && (
          <InputNSI
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            stateAuth={stateAuth}
            disabled={activeInput !== FormInfoFieldsEnum.NSI}
            clickEdit={setActiveInput}
          />
        )}
        {!hiddenFields.includes(FormInfoFieldsEnum.Group) && (
          <InputGroup
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            options={props.registerGroup.length > 0 ? props.registerGroup : [{ value: "", label: "" }]}
            disabled={activeInput !== FormInfoFieldsEnum.Group}
            clickEdit={setActiveInput}
          />
        )}
      </ColumnContainer>

      <ColumnContainer>
        {!hiddenFields.includes(FormInfoFieldsEnum.UserGroups) && (
          <InputUserGroup
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            options={userGroups}
            disabled={activeInput !== FormInfoFieldsEnum.UserGroups}
            clickEdit={setActiveInput}
          />
        )}

        {!hiddenFields.includes(FormInfoFieldsEnum.WorkPosition) && (
          <InputWorkPosition
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            options={workPosition}
            disabled={activeInput !== FormInfoFieldsEnum.WorkPosition}
            clickEdit={setActiveInput}
          />
        )}

        {!hiddenFields.includes(FormInfoFieldsEnum.Network) && (
          <InputNetwork
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            options={
              props.avalableRegisterNetworkList.length > 0
                ? props.avalableRegisterNetworkList
                : [{ label: "", value: "" }]
            }
            disabled={activeInput !== FormInfoFieldsEnum.Network}
            clickEdit={setActiveInput}
          />
        )}

        {!hiddenFields.includes(FormInfoFieldsEnum.Profiles) && !optionsMedicalCareProfile.loadingMedProfileOptions && (
          <InputMedicalCareProfile
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            disabled={activeInput !== FormInfoFieldsEnum.Profiles}
            clickEdit={setActiveInput}
            options={optionsMedicalCareProfile.medProfileOptions}
          />
        )}

        {!hiddenFields.includes(FormInfoFieldsEnum.VimisSyst) && (
          <InputVimisSyst
            options={vimisSystemOptions}
            access={props.access}
            saveProposal={saveProposal}
            info={info}
            disabled={activeInput !== FormInfoFieldsEnum.VimisSyst}
            clickEdit={setActiveInput}
          />
        )}
      </ColumnContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 45% 45%;
  grid-column-gap: 4%;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
