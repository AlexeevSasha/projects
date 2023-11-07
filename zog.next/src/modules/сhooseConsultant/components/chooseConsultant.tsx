import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { sendEmail } from "../../../api/email";
import { SendEmailEnum } from "../../../common/interfaces/SendEmail";
import { OrderT } from "../../order/interfaces/OrderT";
import { getLanguage } from "../../../../public/locales/lang";

export const ChooseConsultant = () => {
  const { query, locale } = useRouter();
  const lang = getLanguage(locale);

  const [order, setOrder] = useState<OrderT | null>(null);
  const [consultantList, setConsultantList] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`/api/clients/${query.id}`)
      .then((res: any) => {
        setOrder(res.data?.data);
      })
      .then(() => {
        axios.post("/api/users/getConsultants", {}).then((res: any) => {
          setConsultantList(res.data.data);
        });
      });
  }, []);

  const sendEmailConsultant = (id: string) => {
    if (id === "Не выбран") return;
    const consult = consultantList.find((el) => el.id === id);
    Promise.all([
      sendEmail(consult?.email, SendEmailEnum.CONSULTANT, {
        clientId: String(query.id),
        name: consult?.name,
      }),
      sendEmail(String(order?.email), SendEmailEnum.CONSULTANT_TO_CLIENT, {
        clientId: String(query.id),
        name: String(order?.name),
        email: String(consult?.email),
      }),
    ]);
  };

  const onChange = (value: ChangeEvent<HTMLSelectElement>) => {
    axios.post("/api/clients/changeConsultant", {
      id: query.id,
      consultant: value.target.value,
    });
    sendEmailConsultant(value.target.value);
  };

  return (
    <>
      <h2>{lang.table.appointed_consultant}</h2>
      {consultantList.length ? (
        <select
          defaultValue={order?.consultant}
          id="countries"
          className="mb-8 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(value) => {
            onChange(value);
          }}
        >
          <option>{lang.table.not_select}</option>
          {consultantList.map((elem) => (
            <option key={elem.id} value={elem.id}>
              {elem.name ? `${elem.name} - ` : ""}
              {elem.email}
            </option>
          ))}
        </select>
      ) : (
        <div className="mb-8">Нет консультантов</div>
      )}
    </>
  );
};
