import { XMarkIcon } from "@heroicons/react/24/solid";
import { Loading } from "../loading/loading";

interface IProps {
  title: string;
  content: JSX.Element;
  outsideClick: () => void;
  description?: string;
  classNames?: string;
  loading?: boolean;
}

export const Modal = (props: IProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div
          className={`relative my-6 max-h-full w-full max-w-2xl p-2 ${props.classNames || ""} ${
            props.loading ? "pointer-events-none " : ""
          }`}
        >
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-4">
              <div>
                <h3 className="text-2xl font-semibold">{props.title}</h3>
                {props.description ? <div className={"mt-1"}>{props.description}</div> : null}
              </div>

              <button
                className="opacity-7 float-right ml-auto rounded-3xl border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none hover:bg-gray-200 focus:outline-none"
                onClick={props.outsideClick}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                  <XMarkIcon />
                </span>
              </button>
            </div>
            <div>{props.content}</div>
          </div>
        </div>
        {props.loading && <Loading />}
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};
