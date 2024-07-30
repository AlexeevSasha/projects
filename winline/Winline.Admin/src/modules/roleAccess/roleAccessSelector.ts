import { createSelector } from "@reduxjs/toolkit";
import { getAccessNameInString } from "../../common/helpers/employees/getAccessName";
import type { IPoliceFormatted } from "../../api/dto/employees/IAccess";
import { resetDuplicatePoliceRole } from "../../common/helpers/employees/resetDuplicatePoliceRole";
import type { StateType } from "../../core/redux/store";

const getAccesState = (state: StateType) => state;

interface IRoleAccess {
  category: string;
  defaultValue: IPoliceFormatted;
  policies: IPoliceFormatted[];
}

export const roleAccessAll = createSelector(getAccesState, (state) =>
  state.roleAccess.ids
    .map<false | IRoleAccess>((id) => {
      const roleItem = state.roleAccess.entities[id];

      if (roleItem) {
        return {
          category: roleItem.category,
          defaultValue: roleItem.policies.find((police) => police.value.includes("none"))!,
          policies: roleItem.policies
        };
      }

      return false;
    })
    .filter<IRoleAccess>((role: false | IRoleAccess): role is IRoleAccess => typeof role !== "boolean")
);

const getAccessStateAndPolices = (state: StateType, polices: string[]) => ({ state, polices });

export const roleAccessAllForRoleUpdate = createSelector(getAccessStateAndPolices, ({ state, polices }) => {
  const policeRoleWithoutDuplicate = resetDuplicatePoliceRole(polices);

  return policeRoleWithoutDuplicate
    .map<false | IRoleAccess>((police) => {
      const keyAcces = getAccessNameInString(police);
      const roleAccessItem = state.roleAccess.entities[keyAcces];

      if (roleAccessItem) {
        return {
          category: roleAccessItem.category,
          defaultValue: roleAccessItem.policies.find((policeItem) => policeItem.value === police)!,
          policies: roleAccessItem.policies
        };
      }

      return false;
    })
    .filter<IRoleAccess>((role: false | IRoleAccess): role is IRoleAccess => typeof role !== "boolean");
});
