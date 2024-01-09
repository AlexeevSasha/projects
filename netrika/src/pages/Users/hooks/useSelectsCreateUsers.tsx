import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { styled } from "../../../common/styles/styled";
import { useSelector } from "react-redux";
import { CustomSelect } from "../../../common/ui/Select/CustomSelect";
import {
  avalableMoSelector,
  rolesSelector,
  userGroupsSelector,
  workPositionSelector,
} from "../../../module/usersList/usersListSelector";
import { CommonToolsApiRequest } from "../../../api/сommonToolsApiRequest";
import { SelectCustomAsync } from "../../../common/ui/Select/SelectCustomAsync";

interface IProps {
  control: any;
  errors: any;
  isFRMR: boolean;
  allAvalableMo: boolean;
}

export const useSelectsCreateUsers = (props: IProps) => {
  const { control, errors, isFRMR, allAvalableMo } = props;
  const roles = useSelector(rolesSelector).map((item) => ({ value: item.key, label: item.value }));
  const avalableMo = useSelector(avalableMoSelector);
  const workPosition = useSelector(workPositionSelector);
  const userGroups = useSelector(userGroupsSelector).map((item) => ({
    value: item.value.toString(),
    label: item.label,
  }));

  /** Методы и рендер для селекта Ролей */
  const renderRoles = useMemo(() => {
    return (
      <FormLine>
        <Text>Роль в системе:</Text>
        <Controller
          name="role"
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => {
            return (
              <CustomSelect
                htmlID={"createUser_role"}
                SelectValue={value}
                options={roles}
                closeMenuOnSelect
                isSearchable={true}
                onChange={(val) => onChange(val)}
                isError={!!errors.role}
              />
            );
          }}
        />
      </FormLine>
    );
  }, [roles, control, errors.role]);

  /** Методы и рендер для селекта Основное МО */
  const renderMainMo = useMemo(() => {
    return (
      <FormLine>
        <Text>Основное МО:</Text>
        <Controller
          name="lpuNameFrmr"
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => {
            return (
              <SelectCustomAsync
                isLongSingle
                htmlID={"createUser_avalableMO"}
                SelectValue={value}
                options={avalableMo}
                closeMenuOnSelect
                isSearchable={true}
                onChange={(val) => onChange(val)}
                withPaginateApiCallback={async (params) =>
                  new CommonToolsApiRequest().getAvailableMoWithFilter(params).then((r) => r.result.items)
                }
                isError={errors.lpuNameFrmr && !isFRMR}
              />
            );
          }}
        />
      </FormLine>
    );
  }, [avalableMo, isFRMR, control, errors.lpuNameFrmr]);

  /** Методы и рендер для селекта Дополнительные МО */
  const renderAvailableMos = useMemo(() => {
    return (
      <FormLine>
        <Text>Дополнительные МО:</Text>
        <Controller
          name="availableMos"
          control={control}
          render={({ onChange, value }) => {
            return (
              <SelectCustomAsync
                htmlID={"avalable_MO"}
                SelectValue={value}
                options={avalableMo}
                isMulti={true}
                closeMenuOnSelect={false}
                isSearchable={true}
                onChange={(val) => onChange(val)}
                isDisabled={allAvalableMo}
                withPaginateApiCallback={async (params) =>
                  new CommonToolsApiRequest().getAvailableMoWithFilter(params).then((r) => r.result.items)
                }
              />
            );
          }}
        />
      </FormLine>
    );
  }, [allAvalableMo, control, avalableMo]);

  /** Методы и рендер Должность ФРМР */

  const renderMainWorkPosition = useMemo(() => {
    return (
      <FormLine>
        <Text>Основная должность:</Text>
        <Controller
          name="workPositionName"
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => {
            return (
              <CustomSelect
                isLongSingle
                htmlID={"createUser_workPosition"}
                SelectValue={value}
                options={workPosition}
                closeMenuOnSelect
                isSearchable
                onChange={(val) => onChange(val)}
                isError={!!errors.workPositionName}
              />
            );
          }}
        />
      </FormLine>
    );
  }, [workPosition, control, errors.workPositionName]);

  const renderAvailableWorkPositions = useMemo(() => {
    return (
      <FormLine>
        <Text>Дополнительные должности</Text>
        <Controller
          name="availableWorkPositions"
          control={control}
          render={({ onChange, value }) => {
            return (
              <CustomSelect
                htmlID={"avalable_work_position"}
                SelectValue={value}
                options={workPosition}
                isMulti
                closeMenuOnSelect={false}
                isSearchable={true}
                onChange={(val) => onChange(val)}
              />
            );
          }}
        />
      </FormLine>
    );
  }, [workPosition, control]);

  const renderAvailableGroups = useMemo(() => {
    return (
      <FormLine>
        <Text>Группы:</Text>
        <Controller
          name="availableGroups"
          control={control}
          render={({ onChange, value }) => {
            return (
              <CustomSelect
                htmlID={"avalable_user_group"}
                SelectValue={value}
                options={userGroups}
                isMulti
                closeMenuOnSelect={false}
                onChange={(val) => onChange(val)}
              />
            );
          }}
        />
      </FormLine>
    );
  }, [control, userGroups]);

  return {
    renderRoles,
    renderMainMo,
    renderAvailableMos,
    renderMainWorkPosition,
    renderAvailableWorkPositions,
    renderAvailableGroups,
  };
};

const Text = styled.p`
  color: #878990;
`;

const FormLine = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 20%;
  margin-bottom: 15px;
  align-items: center;
`;
