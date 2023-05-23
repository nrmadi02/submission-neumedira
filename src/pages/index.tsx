import useStore from " /store";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const store = useStore()
  return (
    <>
      <Head>
        <title>My Book Shelf</title>
        <meta name="description" content="Submission Neumedira" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-[30px] pt-[10px] md:pt-[0px] px-[20px] md:pr-[40px] md:pl-[44px]">
        <h1 className="text-[25px] font-bold text-primary">
          My Book <span className="text-[#EF8361]">Shelf</span>
        </h1>
      </main>
    </>
  );
};

export default Home;
