import { IUser, IUserForm } from "../../../common/interfaces/user/IUser";

export const getObjectUser = (isFRMR: boolean, objForm: IUserForm, user: IUser, snilsUser: IUser, id?: string) => {
  if (isFRMR) {
    return {
      ...user,
      ...snilsUser,
      id: id ? +id : 0,
      login: objForm.login,
      availableMos: objForm?.availableMos?.map((item) => ({ moId: item.value, moName: item.label })),
      availableWorkPositions: objForm?.availableWorkPositions?.map((item) => ({
        id: Number(item.value),
        name: item.label,
      })),
      availableGroups: objForm?.availableGroups?.map((item) => ({
        userGroupId: Number(item.value),
        groupName: item.label,
      })),
      role: Number(objForm.role.value),
      roleName: user.roleName || snilsUser.roleName || objForm.role.label,
      isFrmrUser: isFRMR,
      isSysAcc: user.isSysAcc || false,
    };
  } else {
    return {
      ...user,
      ...objForm,
      snils: objForm.snils.replace(/[- ]{1}/g, ""),
      lpuNameFrmr: objForm.lpuNameFrmr.label,
      lpuBizKeyFrmr: objForm.lpuNameFrmr.value,
      workPositionCodeFrmr: Number(objForm.workPositionName.value),
      workPositionName: objForm.workPositionName.label,
      availableMos: objForm.availableMos
        ? objForm.availableMos.map((item) => ({ moId: item.value, moName: item.label }))
        : [],
      availableWorkPositions: objForm?.availableWorkPositions
        ? objForm.availableWorkPositions.map((item) => ({
            id: Number(item.value),
            name: item.label,
          }))
        : [],
      availableGroups: objForm.availableGroups
        ? objForm.availableGroups?.map((item) => ({
            userGroupId: Number(item.value),
            groupName: item.label,
          }))
        : [],
      role: Number(objForm.role.value),
      roleName: user.roleName || snilsUser.roleName || objForm.role.label,
      isFrmrUser: isFRMR,
      isSysAcc: user.isSysAcc || false,
    };
  }
};
