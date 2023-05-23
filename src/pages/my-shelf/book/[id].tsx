import { getBooksByIDFn } from " /api/BooksAPI";
import { BackIcon, NotesIcon, ReviewIcon, SearchSelectIcon, ShareIcon } from " /assets/icons";
import ItemBook from " /components/ItemBook";
import Spinner from " /components/Spinner";
import useStore from " /store";
import { LetterCapitalize } from " /utils";
import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment"
import {
  Rating,
  ThinStar
} from "@smastrom/react-rating";

const MyShelfBookPage: NextPage = () => {
  const store = useStore();
  const { query, back } = useRouter();
  const id = query.id !== undefined ? query.id : "";

  const [showDescript, setShowDescript] = useState(false)

  const { data: dataBook, isLoading } = useQuery(
    ["allBooks", query.id, store.token],
    async () => await getBooksByIDFn(String(id), store.token)
  );

  return (
    <>
      <Head>
        <title>My Book Shelf - {LetterCapitalize(dataBook?.data.Title || "")}</title>
        <meta name="description" content="Submission Neumedira" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-[20px] pb-[30px] md:pl-[44px] md:pr-[60px]">
        <div
          onClick={() => {
            back();
          }}
          className="mt-[20px] flex w-max cursor-pointer flex-row items-center gap-3 text-[15px]"
        >
          <Image
            height={12}
            width={12}
            style={{
              height: 12,
            }}
            src={BackIcon}
            alt="_icon"
          />
          <p>Back to results</p>
        </div>

        {isLoading ? (
          <div className="center-div absolute flex flex-row items-center gap-1">
            <Spinner />
            <p className="font-medium text-second">Loading</p>
          </div>
        ) : (
          <div className="mt-[20px] flex min-h-[200px] w-full flex-col md:flex-row gap-x-[76px]">
            <div className="flex max-h-[405px] min-h-[405px] min-w-[273px] flex-col items-center rounded-[10px] bg-white px-[32px] pb-[31px] pt-[24px]">
              <Image
                height={277}
                width={209}
                style={{
                  height: 277,
                  border: "2px solid #8A8A8A",
                }}
                src={dataBook?.data.image ? dataBook.data.image : ""}
                alt="_icon"
              />
              <div className="mt-[27px] flex w-full flex-row items-center justify-evenly">
                <ItemBookUtils icon={ReviewIcon} title="Reviews" />
                <ItemBookUtils icon={NotesIcon} title="Notes" />
                <ItemBookUtils icon={ShareIcon} title="Share" />
              </div>
            </div>
            <div className="flex w-full flex-col mt-5">
              <div>
                <h1 className="text-[35px] font-normal">
                  {LetterCapitalize(dataBook?.data.Title || "")}
                </h1>
                <p className="text-[15px]">
                  By{" "}
                  <span className="cursor-pointer underline">
                    {dataBook?.data.author}
                  </span>
                  , {moment(dataBook?.data.published).format("YYYY")}
                </p>
                <p className="mt-[10px] text-[15px] text-[#9A9A9A]">
                  Second Edition
                </p>
              </div>
              <div className="mt-[29px] flex w-full flex-row flex-wrap items-center gap-[19px]">
                <div className="flex flex-row items-center">
                  <Rating
                    value={
                      Math.round((Number(dataBook?.data.rating) / 20) * 10) / 10
                    }
                    readOnly
                    style={{
                      maxWidth: "82px",
                    }}
                    itemStyles={{
                      itemShapes: ThinStar,
                      activeFillColor: "#FACB10",
                      inactiveFillColor: "#ffedd5",
                    }}
                  />
                  <p className="ml-1 mt-1 text-[14px] font-medium">
                    {Math.round((Number(dataBook?.data.rating) / 20) * 10) / 10}{" "}
                    Ratings
                  </p>
                </div>
                <p className="ml-2 mt-1 text-[14px] font-medium">
                  25 Currently reading
                </p>
                <p className="ml-2 mt-1 text-[14px] font-medium">
                  119 Have read
                </p>
              </div>
              <div className="mt-[60px] flex flex-row items-center justify-between md:justify-normal md:gap-[116px]">
                <button className="btn btn-primary h-[61px] w-[209px] rounded-[5px] text-[20px]">
                  Baca Buku
                </button>
                <button className="btn btn-borrow flex h-[40px] w-[127px] flex-row items-center rounded-[5px] !bg-[#4D4D4D] text-[15px] font-normal">
                  <p>Add to List</p>
                  <Image
                    style={{
                      height: 9,
                      width: 17,
                      filter: "brightness(0) invert(1) ",
                    }}
                    priority
                    src={SearchSelectIcon}
                    alt="_icons"
                  />
                </button>
              </div>
              <div className="mt-[69px]">
                <p className="text-[12px] font-semibold">
                  Previews available in:{" "}
                  <span className="text-[#F27851] underline">English</span>
                </p>
              </div>
              <div
                className={`relative mt-10 ${
                  showDescript ? "h-auto" : "h-[40px]"
                } overflow-hidden overflow-ellipsis text-[13px] transition-all`}
              >
                <p>
                  {dataBook?.data.description} {dataBook?.data.description}
                </p>
                {!showDescript ? (
                  <p
                    onClick={() => setShowDescript(true)}
                    className="absolute right-4 top-5 cursor-pointer bg-[#F3F3F7]"
                  >
                    ... <span className="text-[#F27851]">Readmore</span>
                  </p>
                ) : null}
                {showDescript ? (
                  <p
                    onClick={() => setShowDescript(false)}
                    className=" cursor-pointer bg-[#F3F3F7]"
                  >
                    <span className="text-[#F27851]">Close</span>
                  </p>
                ) : null}
              </div>
              <div className="mt-5 flex w-full md:w-[507px] flex-col rounded-[5px] border-[1px] border-solid border-[#DDDDDD] bg-white px-[40px] py-[29px]">
                <p className="text-[22px] font-semibold ">Book Details</p>
                <p className="mt-[28px] text-[14px] font-semibold">
                  Published in
                </p>
                <p className="mt-[13px] text-[12px] font-semibold">
                  United States
                </p>
                <p className="mt-[18px] text-[14px] font-semibold">
                  Edition Notes
                </p>
                <table className="table text-[11px] leading-[20px]">
                  <tbody>
                    <tr>
                      <td width={120} className="font-bold">
                        Series
                      </td>
                      <td className="font-semibold">
                        Dover large print classics
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="font-bold">
                        Genre
                      </td>
                      <td className="font-semibold">Fiction.</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-[30px] text-[12.8px] font-semibold">
                  Classifications
                </p>
                <table className="mt-[3px] table text-[11px] leading-[20px]">
                  <tbody>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">Dewey Decimal Class</p>
                      </td>
                      <td className="font-bold text-[#333333]">823/.8</td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        Library of Congress
                      </td>
                      <td className="font-bold text-[#333333]">
                        PR5485 .A1 2002
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-[30px] text-[12.8px] font-semibold">
                  The Physical Object
                </p>
                <table className="mt-[3px] table text-[11px] leading-[20px]">
                  <tbody>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">Pagination</p>
                      </td>
                      <td className="font-bold text-[#333333]">
                        ix, 112 p. (large print) ;
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        Number of pages
                      </td>
                      <td className="font-bold text-[#333333]">216</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-[30px] text-[12.8px] font-semibold">
                  ID Numbers
                </p>
                <table className="mt-[3px] table text-[11px] leading-[20px]">
                  <tbody>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">My Book Shelf</p>
                      </td>
                      <td className="font-bold text-[#333333]">OL3570252M</td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        ISBN 10
                      </td>
                      <td className="font-bold text-[#333333]">0486424715</td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">LCCN</p>
                      </td>
                      <td className="font-bold text-[#333333]">2002073560</td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">Library Thing</p>
                      </td>
                      <td className="font-bold text-[#333333]">12349</td>
                    </tr>
                    <tr>
                      <td width={120} className="font-semibold">
                        <p className="w-[80px]">Goodreads</p>
                      </td>
                      <td className="font-bold text-[#333333]">690668</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default MyShelfBookPage;

interface ItemBookUtilsProps {
  title:string,
  icon: StaticImageData
}

const ItemBookUtils = ({icon, title}:ItemBookUtilsProps) => {
  return (
    <div className="flex flex-col items-center text-[11px] font-bold text-[#333333]">
      <Image
        height={32}
        width={32}
        style={{
          height: 32,
        }}
        src={icon}
        alt="_icon"
      />
      <p>{title}</p>
    </div>
  );
}
