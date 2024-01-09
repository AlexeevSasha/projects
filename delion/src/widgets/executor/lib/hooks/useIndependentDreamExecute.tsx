// import { useStores } from '@shared/lib';

export type UseIndependentDreamExecuteCallbacks = {
  onDreamSelfExecute(dreamApplicationId: string): void;
  onDreamSelfReject(): void;
  onDreamAttachReport(): void;
};

export const useIndependentDreamExecute = (): UseIndependentDreamExecuteCallbacks => {
  // const { executorS } = useStores();
  // const

  // TODO: Implement when BE will be ready
  const onDreamSelfExecute = (dreamApplicationId: string) => {
    console.log('executed', dreamApplicationId);
  };
  const onDreamSelfReject = () => {};
  const onDreamAttachReport = () => {};

  return { onDreamSelfExecute, onDreamSelfReject, onDreamAttachReport };
};
