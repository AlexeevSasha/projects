import { TabSwitch } from "../../../common/components/tabSwitch/tabSwitch";
import { diagnoseTab } from "../constants/diagnoseTab";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

const DiagnoseDiagram = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  return (
    <div className={" mt-1 grid grid-cols-2 gap-2 shadow-md"}>
      <div className={"overflow-auto"}>
        <div className="card lg:card-side card-compact">
          <div className="card-body">
            <TabSwitch defaultTab={0} tabs={diagnoseTab(lang)} />
          </div>
        </div>
      </div>
      <div className={"overflow-auto shadow-md"}>
        <div className="card lg:card-side card-compact">
          <div className="card-body">
            <TabSwitch defaultTab={1} tabs={diagnoseTab(lang)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DiagnoseDiagram };
