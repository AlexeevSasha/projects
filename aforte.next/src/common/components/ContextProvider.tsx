import { InitialDataT, useInitialData } from "common/hooks/useInitialData";
import { useLoading } from "common/hooks/useLoading";
import { useModal } from "common/hooks/useModal";
import { LocationT } from "common/interfaces/location";
import { createContext, ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { useBasket } from "../hooks/useBasket";
import { useFavourites } from "../hooks/useFavourites";

type Props = {
  initialValues?: InitialDataT;
  children: ReactNode;
};

export type ContextType = ReturnType<typeof useModal> &
  ReturnType<typeof useBasket> &
  ReturnType<typeof useFavourites> &
  ReturnType<typeof useLoading> & {
    initialData?: InitialDataT;
    updateLocation?: (location: LocationT) => void;
  };

export const AppContext = createContext<ContextType>({} as ContextType);

export const ContextProvider = ({ children, initialValues }: Props) => {
  const initialDataValue = useInitialData({ initialData: initialValues });
  const modalContext = useModal();
  const loadingContext = useLoading();
  const basketContext = useBasket();
  const favouritesContext = useFavourites();

  return (
    <AppContext.Provider
      value={{
        ...modalContext,
        ...loadingContext,
        ...initialDataValue,
        ...basketContext,
        ...favouritesContext,
      }}
    >
      {children}
      {modalContext.Modals}
      {loadingContext.loading ? <LoadingScreen /> : null}
    </AppContext.Provider>
  );
};
