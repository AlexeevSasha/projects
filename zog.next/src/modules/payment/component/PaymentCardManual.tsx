import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../../common/components/ui/Input/Input";

interface IProps {
  onSubmit: (price: string, email: string) => void;
}

export const PaymentCardManual = ({ onSubmit }: IProps) => {
  const [values, setValues] = useState({
    price: "",
    email: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(values.price, values.email);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, name: "price" | "email") => {
    if (name === "price") {
      const value = event.target.value.replace(/^0+|[^\d.]/g, "");
      setValues((prev) => ({ ...prev, price: value }));
    } else {
      setValues((prev) => ({ ...prev, [name]: event.target.value }));
    }
  };

  const onKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-|e/.test(keyValue)) event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white  shadow dark:border-gray-700 dark:bg-gray-800"
    >
      <div style={{ background: "#f4f4ff" }} className={"flex h-40 items-center justify-center "}>
        <img src={"/rb.png"} style={{ width: "80%" }} alt={"stripe"} />
      </div>
      <div className="flex flex-col gap-6 p-4 text-center">
        <Input
          id={"rb-price"}
          name={"price"}
          placeholder={"Введите любую сумму"}
          label={"Оплата методического пособия (в рублях)"}
          type={"number"}
          value={values.price}
          onKeyPress={onKeyPress}
          onChange={(e) => onChange(e, "price")}
        />
      </div>
      <div className="flex flex-col gap-6 p-4 text-center">
        <Input
          id={"email"}
          name={"email"}
          required
          type={"email"}
          placeholder={"Введите почту"}
          label={"Введите почту, на которую мы пришлём вам письмо"}
          value={values.email}
          onChange={(e) => onChange(e, "email")}
        />
      </div>
      <div className="p-4 text-center font-bold ">
        <button
          type={"submit"}
          className={
            " block w-full rounded-3xl bg-green-500 p-3 text-white transition-all hover:bg-yellow-400 hover:text-black"
          }
        >
          Оплатить
        </button>
      </div>
    </form>
  );
};
