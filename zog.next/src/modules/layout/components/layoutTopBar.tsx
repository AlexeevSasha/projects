import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

interface IProps {
  showNav: boolean;
  setShowNav: (value: boolean) => void;
}

export function LayoutTopBar({ showNav, setShowNav }: IProps) {
  return (
    <div
      className={`fixed z-10 flex h-16 w-full items-center justify-between transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div
        style={{ background: "rgb(243 244 246 / var(--tw-bg-opacity)" }}
        className="pl-4 md:pl-16"
      >
        <Bars3CenterLeftIcon
          className="h-8 w-8 cursor-pointer text-gray-700"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
    </div>
  );
}
