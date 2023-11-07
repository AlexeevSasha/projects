import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";

export const DownloadManual = () => {
  return (
    <div className={"p-4 "}>
      <a
        href={"/files/manual.pdf"}
        download
        className="inline-flex items-center gap-2 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
      >
        <ArrowDownTrayIcon className={"h-6 w-6"} />
        <span>Скачать методичку</span>
      </a>
    </div>
  );
};
