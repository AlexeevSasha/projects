import { useState } from "react";
import { TabSwitchT } from "../../interfaces/TabSwitchT";

interface IProps {
  tabs: TabSwitchT[];
  defaultTab?: number;
}

export const TabSwitch = ({ tabs, defaultTab = 0 }: IProps) => {
  const [active, setActive] = useState(defaultTab);
  const tabName = tabs.map((tab) => tab.title);

  return (
    <div>
      <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        {tabName.map((tab, index) => (
          //tab-lg
          <li key={index} className="mr-2">
            <a
              className={`inline-block cursor-pointer rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 
                            ${
                              index == active &&
                              "active inline-block rounded-t-lg bg-gray-50 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500 "
                            }
                            `}
              onClick={() => setActive(index)}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
      {tabs[active]?.component}
    </div>
  );
};
