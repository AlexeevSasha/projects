import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { generateQuery } from "../../common/constants/generateQuery";

export default function CheckEmail() {
  const { push } = useRouter();

  return (
    <div className={"mt-10 flex flex-col items-center justify-center"}>
      <div className={"inline-block bg-gray-300 p-4 font-bold"}>Ссылка больше не действительна</div>
      <button onClick={() => push("/")} className={"fond-medium mt-5 bg-blue-400 p-4 text-white"}>
        На главную
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const myQuery = generateQuery(query);
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/email/checkToken?token=${query.token}`
  );

  if (data.redirect) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.NEXT_PUBLIC_DEFAULT_URL_FORM_AFTER_PAY}${myQuery}`,
      },
    };
  }
  return { props: {} };
};
