export default function ManualSuccess() {
  return (
    <div className={"mt-10 flex flex-col items-center justify-center"}>
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Оплата успешно проведена</h1>
        <p className="mb-4 text-center">
          Данные о входе были отправлены <br />
          <strong>на вашу почту</strong>
        </p>
      </div>
    </div>
  );
}
