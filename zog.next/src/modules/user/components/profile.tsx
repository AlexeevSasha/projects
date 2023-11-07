import { useState } from "react";
import { UserT } from "../interfaces/UserT";
import { updateUser } from "../../../api/user";
import { ChoiceRole } from "./choiceRole";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";
import { DownloadManual } from "./downloadManual";

interface IProps {
  user: UserT;
}

export const Profile = ({ user }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).common.profile;

  const [data, setData] = useState<Pick<UserT, "name" | "birthday">>({
    name: user.name || "",
    birthday: user.birthday || "",
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    updateUser({ id: user.id, ...data });
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 400 }} className={"p-4"}>
        <div className={"mb-5"}>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            <strong>{lang.your_name}</strong>
          </label>
          <input
            required
            value={data.name}
            className="block w-full rounded-lg    border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(event) => setData((prev) => ({ ...prev, name: event.target.value }))}
          />
        </div>
        <div className={"mb-5"}>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            <strong>{lang.birthdate}</strong>
          </label>
          <input
            value={data.birthday}
            type={"date"}
            className="block  w-full rounded-lg   border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(event) => setData((prev) => ({ ...prev, birthday: event.target.value }))}
          />
        </div>
        <button
          type={"submit"}
          className="block w-full  rounded-lg  bg-blue-500 py-2  px-2 text-white"
        >
          {Object.values(data).some((el) => el) ? lang.change_profile : lang.fill_out_profile}
        </button>
      </form>
      <ChoiceRole user={user} />
      {user.download_manual && <DownloadManual />}
    </div>
  );
};
