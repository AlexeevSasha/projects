import { useRouter } from "next/router";

export default function TinkoffAfterPay() {
  const { push } = useRouter();
  return (
    <div className={"mt-10 flex flex-col items-center justify-center"}>
      <div className={"mb-4 inline-block  p-4 text-2xl font-bold"}>Оплата успешно проведена</div>

      <div className={"inline-block bg-green-300 p-4 "}>
        На вашу почту отправлено <strong>письмо c анектой</strong>
      </div>

      <button onClick={() => push("/")} className={"fond-medium mt-5 bg-blue-400 p-4 text-white"}>
        На главную
      </button>
    </div>
  );
}
