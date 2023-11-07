import { InputFile } from "../../../../common/components/inputFile";
import { useState } from "react";
import { Loading } from "../../../../common/components/loading/loading";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../../public/locales/lang";
import { paymentCurrencyOption, paymentSystemOption } from "../../constants/paymentOptions";
import { IPaymentBanner, IPaymentForm } from "../../interfaces/Payment";
import { useForm } from "../../../../common/hooks/useForm";
import { Select } from "../../../../common/components/ui/Input/Select";
import { Input } from "../../../../common/components/ui/Input/Input";
import { transformPaymentForm } from "../../constants/getPaymentForm";

interface IProps {
  onClose: () => void;
  onSubmit: (file: File, body: IPaymentForm) => void;
  initialValues?: IPaymentBanner;
  edit?: boolean;
}

export const PaymentForm = ({ onClose, onSubmit, initialValues, edit }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { values, handleSubmit, handleChange } = useForm<IPaymentForm>({
    initialValues: {
      sum: initialValues?.sum || "",
      currency: initialValues?.currency || "eur",
      system: initialValues?.system || "robokassa",
      successUrl: initialValues?.successUrl || "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await onSubmit(files?.[0] as File, transformPaymentForm(values));
      setLoading(false);
    },
  });

  return (
    <div className={"relative"}>
      <form
        onSubmit={handleSubmit}
        className={`relative flex-auto p-6 ${loading ? "pointer-events-none opacity-30" : ""}`}
      >
        <div className={"mb-5"}>
          <InputFile files={files} setFiles={setFiles} />
          {edit && initialValues?.url && !files.length ? (
            <img
              className={"h-48 w-full  object-contain"}
              key={initialValues.url}
              src={initialValues.url}
              alt="banners"
            ></img>
          ) : null}
        </div>
        <div className={"mb-5 flex  gap-4"}>
          <Select
            defaultValue={values.system}
            label={lang.modal.pay_banner.input_pay_system}
            id={"payment-type"}
            options={paymentSystemOption}
            name={"system"}
            onChange={handleChange}
            required
            classWrapper={"flex-1"}
          />
          {values.system !== "robokassa" && (
            <Select
              defaultValue={values.currency}
              options={paymentCurrencyOption}
              name={"currency"}
              label={lang.modal.pay_banner.input_currency}
              id={"currency"}
              required
              onChange={handleChange}
            />
          )}
        </div>
        <div className={"mb-5 flex  gap-4"}>
          <Input
            value={values.sum}
            classWrapper={"flex-1"}
            required
            label={lang.modal.pay_banner.input_sum}
            id={"payment-type"}
            name={"sum"}
            type={"number"}
            onChange={handleChange}
          />
        </div>
        {values.system === "stripe" && (
          <div className={"mb-5 flex  gap-4"}>
            <Input
              value={values.successUrl}
              classWrapper={"flex-1"}
              label={lang.modal.pay_banner.success_url}
              id={"payment-successUrl"}
              name={"successUrl"}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 pt-6 pl-6">
          <button
            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
            type="button"
            onClick={onClose}
          >
            {lang.common.cancel}
          </button>
          <button
            disabled={(!files.length && !edit) || loading}
            className={`mr-1 mb-1 cursor-pointer rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600 ${
              (!files.length && !edit) || loading
                ? "pointer-events-none bg-gray-500 opacity-50"
                : ""
            }`}
            type="submit"
          >
            {lang.common.add}
          </button>
        </div>
      </form>
      {loading ? <Loading /> : null}
    </div>
  );
};
