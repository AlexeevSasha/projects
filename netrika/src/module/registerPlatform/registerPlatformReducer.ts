import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterPlatformAction } from "./registerPlatformAction";
import { IManual } from "../../common/interfaces/IManual";

interface IState {
  loading: boolean;
  manual: IManual | null;
  manualFile: Blob | null;
}

const InitialState: IState = {
  loading: false,
  manual: null,
  manualFile: null,
};

export const registerPlatformReducer = reducerWithInitialState(InitialState)
  .case(RegisterPlatformAction.manual.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(RegisterPlatformAction.manual.done, (state, { result }) => ({
    ...state,
    loading: false,
    manual: result,
  }))
  .case(RegisterPlatformAction.manual.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(RegisterPlatformAction.manualFile.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(RegisterPlatformAction.manualFile.done, (state, { result }) => ({
    ...state,
    loading: false,
    manualFile: result,
  }))
  .case(RegisterPlatformAction.manualFile.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(RegisterPlatformAction.uploadFile.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(RegisterPlatformAction.uploadFile.done, (state) => ({
    ...state,
    loading: false,
  }))
  .case(RegisterPlatformAction.uploadFile.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .build();
