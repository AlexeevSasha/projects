import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MultiRangeSlider from "../../../components/ui/multiRangeSlider/multirangeslider";
import { getLanguage } from "../../../../public/locales/lang";

const Ranges = ({ labels, label, defaultValues = [33, 66], type, onChange, isDisabled }: any) => {
  const [timeOutId, setTimeOutId] = useState<any>();
  const [minValue, setMinValue] = useState(defaultValues[0]);
  const [maxValue, setMaxValue] = useState(defaultValues[1]);

  const [value, setValue] = useState<[number, number, number]>(defaultValues);

  useEffect(() => {
    setValue([minValue, maxValue - minValue, 99 - maxValue]);
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    const timeOut = setTimeout(() => {
      onChange(type, minValue, maxValue);
    }, 500);
    setTimeOutId(timeOut);
  }, [minValue, maxValue]);

  return (
    <div className={""}>
      <p className={"text-center"}>
        <strong>{label}</strong>
      </p>
      <MultiRangeSlider
        min={0}
        max={99}
        step={1}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e: any) => {
          setMinValue(e.minValue);
          setMaxValue(e.maxValue);
        }}
        style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
        label="false"
        rules="false"
        barLeftColor="rgb(255,166,0)"
        barInnerColor="rgb(0,129,0)"
        barRightColor="rgb(253,0,2)"
        thumbLeftColor="rgb(255,166,0)"
        thumbRightColor="rgb(0,129,0)"
        ruler="false"
        isDisabled={isDisabled}
      />
      <div className={"grid grid-cols-3 text-sm"}>
        {labels.map((label: any, i: any) => (
          <div className="text-center" key={label}>
            {label} {Math.round((value[i]! * 100) / (value[0] + value[1] + value[2]))}%
          </div>
        ))}
      </div>
    </div>
  );
};

export const DiagnoseDamageRanges = () => {
  const { data: userDada } = useSession();
  const { query, locale } = useRouter();
  const lang = getLanguage(locale).table;
  const [damages, setDamages] = useState<any>(null);

  useEffect(() => {
    getDataHandler(query.id);
  }, []);

  const getDataHandler = (id: string | string[] | undefined) => {
    axios.get(`/api/areaOfLife/${id}`).then(({ data }) => {
      if (data.data.kapha) {
        setDamages(data.data);
      } else {
        setDamages({
          ...data.data,
          pitta: [33, 66],
          wata: [33, 66],
          kapha: [33, 66],
        });
      }
    });
  };

  const changeHandler = (type: any, value1: any, value2: any) => {
    if (userDada?.user?.userRole === "Admin") {
      const prevVal = damages[`${type}`];
      if (prevVal[0] !== value1 || prevVal[1] !== value2) {
        const val = { ...damages, [type]: [value1, value2] };
        setDamages(val);
        if (damages)
          if (damages.id) {
            axios.post("/api/areaOfLife/update", {
              ...damages,
              ...val,
            });
          } else {
            axios
              .post("/api/areaOfLife/create", {
                ...damages,
                ...val,
              })
              .then(({ data }) => setDamages({ id: data.data.id, ...damages }));
          }
      }
    }
  };

  return damages ? (
    <div className="p-4">
      <br />
      <h3 className={"text-xl"}>{lang.distribution_lesions}</h3>
      <br />
      <br />
      <br />
      <Ranges
        label={`${lang.pitta} (${lang.static})`}
        labels={[lang.work, lang.health, lang.personal_life]}
        defaultValues={damages?.pitta}
        type="pitta"
        onChange={changeHandler}
        isDisabled={userDada?.user?.userRole !== "Admin"}
      />
      <br />
      <br />
      <Ranges
        label={`${lang.wata} (${lang.dynamic})`}
        labels={[lang.work, lang.health, lang.personal_life]}
        defaultValues={damages?.wata}
        type="wata"
        onChange={changeHandler}
        isDisabled={userDada?.user?.userRole !== "Admin"}
      />
      <br />
      <br />
      <Ranges
        label={`${lang.kapha} (${lang.negative_mood})`}
        labels={[lang.work, lang.health, lang.personal_life]}
        defaultValues={damages?.kapha}
        type="kapha"
        onChange={changeHandler}
        isDisabled={userDada?.user?.userRole !== "Admin"}
      />
    </div>
  ) : (
    <>Загрузка...</>
  );
};
