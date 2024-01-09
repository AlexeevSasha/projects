import { actionCreator } from "../../store/action/actionCreator";
import { IDictionaryUserRole } from "../../common/interfaces/dictionary/IDictionaryUserRole";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export class DictionaryRolesUserAction {
  static rolesList = actionCreator.async<null, IPaginateItems<IDictionaryUserRole[]>, Error>(
    "Dictionary/ROLES_USER/LIST"
  );
}
