import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ShowFor } from "../modules/layout/components/showFor";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Амрита</title>
        <meta name="description" content="Команда Торсунова" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#eae470] to-[#5c7c36]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-600 sm:text-[5rem]">
            Команда Торсунова
          </h1>
          <div className="flex ">
            {/*Auth area*/}
            <ShowFor
              showForOther={
                <Link href={"/auth/signin"} className={"btn"}>
                  Вход
                </Link>
              }
            >
              <>
                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-slate-600 hover:bg-white/20"
                  href="/lk"
                >
                  <h3 className="text-2xl font-bold">Клиент</h3>
                </Link>
                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-slate-600 hover:bg-white/20"
                  href="/w"
                >
                  <h3 className="text-2xl font-bold">Сотрудник</h3>
                </Link>

                <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-slate-600 hover:bg-white/20"
                  href="/partner"
                >
                  <h3 className="text-2xl font-bold">Партнер</h3>
                </Link>
              </>
            </ShowFor>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
