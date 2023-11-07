import { Select } from "../../../common/components/ui/Input/Select";
import { letterOptions } from "../constants/letterOptions";
import { useForm } from "../../../common/hooks/useForm";
import { IMailingFilter } from "../interfaces/MailingFilter";
import { useState } from "react";
import { Loading } from "../../../common/components/loading/loading";
import { criterionOptions } from "../constants/criterionOptions";
import { mailingEmail } from "../../../api/email";
import { Input } from "../../../common/components/ui/Input/Input";

export const MailingLetter = () => {
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit } = useForm<IMailingFilter>({
    initialValues: {
      letter: "",
      criterion: "",
      title: "",
      target_email: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      mailingEmail(values).finally(() => setLoading(false));
    },
  });

  return (
    <div className={"relative max-w-2xl"}>
      <form
        onSubmit={handleSubmit}
        className={`relative flex flex-col gap-6 ${
          loading ? "pointer-events-none opacity-30" : ""
        }`}
      >
        <Select
          required
          defaultValue={values.criterion}
          name={"criterion"}
          id={"criterion"}
          options={criterionOptions}
          label={"Критерий выбора клиентов"}
          onChange={handleChange}
        />
        {values.criterion === "target_email" ? (
          <Input
            defaultValue={values.target_email}
            required
            label={"Введите почту"}
            type={"email"}
            id={"target_email"}
            name={"target_email"}
            onChange={handleChange}
          />
        ) : null}
        <Select
          required
          defaultValue={values.letter}
          name={"letter"}
          id={"letter"}
          options={[{ label: "", value: "" }, ...letterOptions]}
          label={"Выберете письмо"}
          onChange={handleChange}
        />
        <Input
          value={values.title}
          required
          label={"Введите заголовок письма"}
          id={"title"}
          name={"title"}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className={`mr-1 mb-1 cursor-pointer rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 ${
            loading ? "pointer-events-none bg-gray-500 opacity-50" : ""
          }`}
          type="submit"
        >
          отправить письмо
        </button>
        {loading ? <Loading /> : null}
      </form>
    </div>
  );
};
