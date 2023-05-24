import { HeadphoneIcon } from " /assets/icons";
import { IBooks } from " /types/types";
import { LetterCapitalize } from " /utils";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ItemBookProps {
  data: IBooks;
}

const ItemBook = ({ data }: ItemBookProps) => {
  const router = useRouter();
  const goToDetailBook = (id: string) => {
    router
      .push(`/my-shelf/book/${id}`)
      .catch(() => console.log("error router.."));
  };
  const num = data.rating / 20;
  return (
    <div className="relative z-10 flex md:h-[260px] w-full sm:w-[308px] flex-row items-center justify-center gap-[50px] md:justify-between rounded-[10px] bg-white pb-[12px] pl-[15px] pr-[20px] pt-[16px]">
      {data.id == "4" || data.id == "5" || data.id == "6" ? (
        <div className="absolute right-[10px] top-[11px] h-[10px] w-[10px] rounded-full bg-[#FC4141]"></div>
      ) : null}
      <div className="flex  z-10 h-full flex-col items-start">
        <Image
          style={{ minHeight: 170 }}
          width={127}
          height={170}
          priority
          onClick={() => goToDetailBook(data.id)}
          src={data.image}
          alt="_book_image"
          className="cursor-pointer"
        />
        <div className="mt-[10px] flex flex-col gap-[2px]">
          <p className="max-w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[12px] font-normal">
            {LetterCapitalize(data.Title|| '')}
          </p>
          <p className="max-w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[10px] font-normal">
            {data.author}, {moment(data.published).format("YYYY")}
          </p>
          <p className="max-w-[130px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[10px] font-normal">
            <strong>{Math.round(num * 10) / 10}</strong>/5
          </p>
        </div>
      </div>
      <div className=" z-10">
        <p className="text-[15px] font-normal">Borrowed on</p>
        <p className="mt-[9px] text-[10px] font-normal">11 Mar 2023 09:00 AM</p>
        <p className="mt-[9px] text-[15px] font-normal">Submission Due</p>
        <p className="mt-[9px] text-[10px] font-normal">14 Mar 2023</p>
        <div className="mt-[11px] w-full">
          {data.id == "2" || data.id == "4" ? (
            <button
              onClick={() => goToDetailBook(data.id)}
              className="btn btn-green h-[40px] w-[125px] rounded-[5px]"
            >
              E-Book
            </button>
          ) : (
            <button
              onClick={() => goToDetailBook(data.id)}
              className="btn btn-borrow h-[40px] w-[125px] rounded-[5px]"
            >
              Borrowed
            </button>
          )}
          {data.id == "2" ? (
            <button
              onClick={() => goToDetailBook(data.id)}
              className="btn btn-outline-primary mt-[15px] grid h-[40px] w-[125px] grid-cols-3 items-center rounded-[5px]"
            >
              <div className="col-span-2">
                <p>Read</p>
              </div>
              <div className="col-span-1 flex h-full w-full flex-col items-center justify-center border-l-[1px] border-[#f76b56]">
                <Image
                  style={{ minHeight: 15 }}
                  width={15}
                  height={15}
                  src={HeadphoneIcon}
                  alt="_icon"
                />
              </div>
            </button>
          ) : (
            <button
              onClick={() => goToDetailBook(data.id)}
              className="btn btn-outline-primary mt-[15px] h-[40px] w-[125px] rounded-[5px]"
            >
              Read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemBook;
