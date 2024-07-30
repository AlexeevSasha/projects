export const pickPoliciesNameRoleInArray = (dataRole: any) => {
    const {name, ...data} = dataRole;
    const policies = Object.values(data).filter((value) => /^\w+\.\w+$/.test(value as string));
    if ('id' in dataRole) {
        return {id: dataRole.id, name, policies};
    }

    return {name, policies};
};
