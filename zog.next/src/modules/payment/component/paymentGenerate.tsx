import { useEffect, useState } from "react";
import { createUniqLink } from "../../../api/email";
import { toast } from "react-toastify";
import { generateQuery } from "../../../common/constants/generateQuery";
import { useCopyToClipboard } from "../../../common/hooks/useCopyToClipboard";
import { PaymentsLink } from "./paymentsLink";
import { useRouter } from "next/router";
import { getLanguage } from "../../../../public/locales/lang";

interface IProps {
  utm: string;
  form: string;
}

export const PaymentGenerate = ({ utm, form }: IProps) => {
  const { locale } = useRouter();
  const lang = getLanguage(locale).modal.generate_pay;

  const [link, setLink] = useState("");
  const [linkForeign, setLinkForeign] = useState("");
  const [linkForm, setLinkForm] = useState("");

  const { copy } = useCopyToClipboard();

  const createLinkAfterPay = async (utm: string, form: string) => {
    const url = await createUniqLink({ utm, form });
    if (!url) return toast.error("Не удалось создать ссылку на форму после оплаты");
    setLinkForm(url);
  };

  const createPay = async (utm: string, form: string) => {
    const payUrl = process.env.NEXT_PUBLIC_DEFAULT_URL + "/payment";
    const url = payUrl + generateQuery({ utm, form });
    await copy(url);
    await createLinkAfterPay(utm, form);
    setLink(url);
    setLinkForeign(payUrl + "/foreign" + generateQuery({ utm, form }));
  };

  useEffect(() => {
    createPay(utm, form).then();
  }, [utm, form]);

  return (
    <div className={"p-4"}>
      <PaymentsLink title={lang.link_rf} link={link} onClick={() => copy(link)} />
      <PaymentsLink
        title={lang.link_foreign}
        link={linkForeign}
        onClick={() => copy(linkForeign)}
      />
      <PaymentsLink
        title={<span className={"text-3xl font-bold"}>{lang.link_after_pay}!!!</span>}
        link={linkForm}
        onClick={() => copy(linkForm)}
        classNameBG={"bg-green-600"}
      />
    </div>
  );
};
