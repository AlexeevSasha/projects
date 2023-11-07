import { GetServerSideProps } from "next";
import axios from "axios";
import { generateQuery } from "../../common/constants/generateQuery";

export default function RobokassaPayPage() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const myQuery = generateQuery(query);
  const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/payment/robokassa${myQuery}`);

  return {
    redirect: {
      permanent: false,
      destination: data.url,
    },
  };
};
