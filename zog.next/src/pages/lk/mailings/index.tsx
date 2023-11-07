import Head from "next/head";
import { Layout } from "../../../modules/layout/components/layout";
import { Mailing } from "../../../modules/mailing/components/Mailing";

export default function MailingsPage() {
  return (
    <>
      <Head>
        <title>Рассылки - Амрита</title>
        <meta name="description" content="Рассылки - Амрита" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col justify-center gap-12 px-4 py-16 ">
          <Mailing.MailingLetter />
        </div>
      </main>
    </>
  );
}

MailingsPage.getLayout = Layout.Auth;
MailingsPage.auth = {
  roles: ["Admin"],
};
