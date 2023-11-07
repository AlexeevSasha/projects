export const TinkoffCard = () => {
  return (
    <div
      style={{ width: 400, height: 400 }}
      className=" overflow-hidden rounded-3xl bg-white  drop-shadow-md dark:bg-gray-800"
    >
      <div
        style={{ height: "50%" }}
        className={"flex flex-col items-center justify-center gap-1 bg-yellow-400"}
      >
        <p className={"text-lg font-bold text-white "}>Оплата из РФ</p>
        <h4 className={"text-5xl font-bold text-gray-800"}>Тинькофф</h4>
        <p className={"text-lg font-bold text-white "}>Оформите рассрочку</p>
        <p className={"text-center text-lg font-bold  "}>
          Личная диагностика <br /> <span className={"font-normal"}>+ консультация</span>
        </p>
      </div>

      <div style={{ height: "100%" }} className="  text-center  font-bold ">
        <div className={"flex items-end justify-center gap-4 pt-1 "}>
          <p className={"text-2xl text-gray-500"}>от</p>
          <div className={"mt-1 text-5xl text-gray-700"}>2 788 ₽</div>
        </div>
        <div className={"mt-2 font-normal text-gray-500"}>в месяц</div>
        <p style={{ color: "#6D5BF4" }} className={"text-md font-bold  "}>
          без %, без первого взноса, без переплат
        </p>

        <div className={"px-5"}>
          <a
            className={
              "mt-4 block w-full rounded-3xl bg-green-500  p-4 text-white transition-all hover:bg-yellow-400 hover:text-black"
            }
            target={"_blank"}
            href={`${process.env.NEXT_PUBLIC_DEFAULT_URL}/payment/tinkoff`}
            rel="noreferrer"
          >
            Оформить
          </a>
        </div>
      </div>
    </div>
  );
};
