import { useContext, useState } from "react";
import { EnumCartTabs } from "../../../common/interfaces/EnumDrawerTabs";
import { ShopTab } from "./shopTab";
import { TabHeaderCart } from "./TabHeaderCart";
import { TicketsTab } from "./tickets/ticketsTab";
import { DataContext } from "../../../core/dataProvider";

const dispatcherComponents = {
  [EnumCartTabs.tickets]: TicketsTab,
  [EnumCartTabs.shop]: ShopTab,
};

export const CartTabs = () => {
  const dataContext = useContext(DataContext);
  const { shop: { activeTab = EnumCartTabs.shop } = {} } = dataContext;
  const [currentStep, setCurrentStep] = useState(activeTab);
  const CurrentTab = dispatcherComponents[currentStep];
  return (
    <>
      <TabHeaderCart currentStep={currentStep} setCurrentStep={setCurrentStep} steps={["tickets", "shop"]} />
      <CurrentTab />
    </>
  );
};
