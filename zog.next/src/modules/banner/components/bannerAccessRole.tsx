import { OptionsT } from "../../../common/interfaces/Options";
import Select from "react-select";
import { useCallback, useMemo } from "react";
import { userRoles } from "../../../common/constants/userRoles";
import { getRolesValue } from "../../user/constants/getRolesValue";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  value: OptionsT[];
  setValue: (v: OptionsT[]) => void;
}

export const BannerAccessRole = ({ value, setValue }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const optionSelect: OptionsT[] = useMemo(
    () => [
      { value: "All", label: "Всем" },
      ...userRoles?.map((elem) => ({
        value: elem,
        label: getRolesValue(lang)[elem],
      })),
    ],
    [lang]
  );

  const handleChange = useCallback((options: OptionsT[]) => {
    const check = options.findIndex((el) => el.value === "All");
    if (!options.length || check > 0) {
      setValue([{ value: "All", label: "Всем" }]);
    } else if (check === 0 && options.length > 1) {
      setValue(options.filter((el) => el.value !== "All"));
    } else {
      setValue(options);
    }
  }, []);

  return (
    <div>
      <p className={"mb-2 block text-sm font-medium text-gray-900 dark:text-white"}>
        Роли которые смогут видеть баннер
      </p>
      <Select
        value={value}
        onChange={(newValue) => handleChange(newValue as OptionsT[])}
        isMulti
        id={"roles"}
        name="roles"
        options={optionSelect}
        className="basic-multi-select"
        classNamePrefix="select"
        isClearable={true}
      />
    </div>
  );
};
