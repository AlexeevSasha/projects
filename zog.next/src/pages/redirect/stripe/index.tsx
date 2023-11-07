import { GetServerSideProps } from "next";
import axios from "axios";
import { generateQuery } from "../../../common/constants/generateQuery";

export default function StripePayPage() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const myQuery = generateQuery(query);
  const data = await axios.get(`${process.env.NEXTAUTH_URL}/api/payment/stripe${myQuery}`);

  return {
    redirect: {
      permanent: false,
      destination: data.data.data.url,
    },
  };
};
