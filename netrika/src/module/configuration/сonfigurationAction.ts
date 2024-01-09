import { actionCreator } from "../../store/action/actionCreator";

export class ConfigurationAction {
  static getCheckControlEventsOptionAction = actionCreator.async<null, boolean, Error>(
    "Configuration/getCheckControlEventsOption"
  );
  static getShowUserPasswordOptionAction = actionCreator.async<null, boolean, Error>(
    "Configuration/getShowUserPasswordOptionAction"
  );
  static getContingentOptionAction = actionCreator.async<null, boolean, Error>(
    "Configuration/getContingentOptionAction"
  );
}
