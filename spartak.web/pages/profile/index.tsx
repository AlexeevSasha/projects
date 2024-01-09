import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/profile/denarii");
  }, []);

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
  return { props: {} };
};
