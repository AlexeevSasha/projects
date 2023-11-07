interface IProps {
  description?: string;
  urlImg: string;
  oldPrice?: string;
  price: string;
  link: string;
  currency: string;
  classNameImg?: string;
}

export const PaymentCard = ({
  urlImg,
  link,
  price,
  currency,
  description,
  classNameImg,
}: IProps) => {
  return (
    <div className=" w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white  shadow dark:border-gray-700 dark:bg-gray-800 ">
      <div className={`flex h-40 items-center justify-center ${classNameImg || ""}`}>
        <img
          src={`/${urlImg}`}
          style={{ maxHeight: 100, maxWidth: 100 }}
          alt={urlImg.split(".")[0]}
        />
      </div>
      <div className="p-4 text-center font-bold ">
        <div className={"mb-4  h-24 text-xl "}>{description}</div>
        <div className={"mt-1 text-5xl text-gray-700"}>
          {price} {currency}
        </div>
        <div className={"mt-1 text-indigo-500"}>при оплате сразу</div>

        <div>
          <a
            className={
              "mt-4 block w-full rounded-3xl bg-green-500 p-3 text-white transition-all hover:bg-yellow-400 hover:text-black"
            }
            target={"_blank"}
            href={link}
            rel="noreferrer"
          >
            Оплатить
          </a>
        </div>
      </div>
    </div>
  );
};
