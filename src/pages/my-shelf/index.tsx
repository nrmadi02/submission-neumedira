import { getAllBooksFn } from " /api/BooksAPI";
import ItemBook from " /components/ItemBook";
import Spinner from " /components/Spinner";
import useStore from " /store";
import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const dataNavbar = [
  "All Books",
  "Favourite",
  "Borrowed Books",
  "E-Books",
  "Audio Books",
  "Articles & Journals",
];

const MyShelfPage: NextPage = () => {
  const store = useStore();
  const [selectNav, setSelectNav] = useState(dataNavbar[0]);

  const { data: dataBooks, isLoading } = useQuery(
    ["allBooks", store.token],
    async () => await getAllBooksFn(store.token)
  );

  return (
    <>
      <Head>
        <title>My Book Shelf</title>
        <meta name="description" content="Submission Neumedira" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-[30px] px-[20px] md:pl-[44px] md:pr-[60px]">
        <h1 className="text-[25px] font-bold text-primary">
          Your <span className="text-[#EF8361]">Shelf</span>
        </h1>
        <div className="mt-[37px] flex flex-row flex-wrap items-center gap-x-[20px] md:gap-x-[100px] gap-y-[30px]">
          {dataNavbar.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`${
                  item == selectNav ? "text-primary" : "text-second"
                } cursor-pointer text-[20px] font-medium`}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-[34px] z-30 relative justify-normal sm:justify-evenly xxl:justify-normal md:static flex h-auto min-h-[260px] flex-row flex-wrap items-center  gap-x-[20px] md:gap-x-[30px] xxl:gap-x-[60px] transition-all gap-y-[28px]">
          {isLoading == false ? (
            dataBooks?.data.map((item, idx) => {
              return <ItemBook key={idx} data={item} />;
            })
          ) : (
            <div className="center-div absolute flex flex-row items-center gap-1">
              <Spinner />
              <p className="font-medium text-second">Loading</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyShelfPage;
