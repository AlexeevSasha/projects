import {getAccessNameInString} from "./getAccessName";

export const resetDuplicatePoliceRole = (policies: string[] | string | undefined): string[] => {
 if(!policies) {
     return [''];
 }
 const policiesRole = policies instanceof Array
     ? policies
     : policies.trim().split(',');

 const objValuesWithoutDuplicate = policiesRole.reduce<any>((acc, police) => {
   const key = getAccessNameInString(police);
   acc[key] = police;
   if (acc[key] && !/\.write/.test(acc[key])) {
       acc[key] = police;
   }

   return acc;
 }, {});

 return Object.values(objValuesWithoutDuplicate);
};
