import Head from "next/head";
import { Layout } from "../../modules/layout/components/layout";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUniqLink } from "../../api/email";

export default function PagePayment() {
  const [data, setData] = useState({});
  const [link, setLink] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const url = await createUniqLink(data);
    if (!url) return toast.success("Не удалось создать ссылку");
    await navigator.clipboard.writeText(url);
    toast.success("Ссылка успешно создана");
    setLink(url);
  };
  return (
    <>
      <Head>
        <title>Отправка анкеты на почту - Амрита</title>
        <meta name="description" content="Генерация ссылки на оплатту - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col justify-center   py-16 ">
          <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 400 }} className={"p-4"}>
            <div className={"mb-5"}>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Введите <strong>utm_partner</strong>, если он есть
              </label>
              <input
                className="block  w-full rounded-lg   border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(event) =>
                  setData((prev) => ({ ...prev, utm_partner: event.target.value }))
                }
              />
            </div>
            <button
              type={"submit"}
              className="block w-full  rounded-lg  bg-blue-500 py-2  px-2 text-white"
            >
              Сгенерировать ссылку на анкету
            </button>
          </form>
          {link ? (
            <div className={" p-4"}>
              <strong>Ссылка успешно скопирано в буфер обмена</strong>
              <p className={"text-sm"}>или же скопируйте ниже ссылку</p>
              <div className={"mt-2 inline-block bg-gray-500 p-4 font-bold text-white"}>{link}</div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}

PagePayment.getLayout = Layout.Auth;
PagePayment.auth = {
  roles: ["Admin"],
};
