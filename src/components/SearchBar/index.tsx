import { ScannerIcon, SearchBarIcon, SearchSelectIcon } from " /assets/icons";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="search-bar grid h-[50px] w-[270px] md:w-[541px] grid-cols-12 overflow-hidden">
      <div className="col-span-2">
        <div className="flex h-full w-full cursor-pointer flex-row items-center gap-[5px] md:gap-[10px] md:pl-[30px] bg-[#F7F7FA] pl-[20px]">
          <p className="text-[20px] hidden md:block">All</p>
          <Image
            style={{
              height: 9,
              width: 17,
            }}
            priority
            src={SearchSelectIcon}
            alt="_icons"
          />
        </div>
      </div>
      <div className="col-span-7">
        <input
          placeholder="Search"
          className="ml-[15px] h-full w-full text-[20px] focus:outline-none"
        />
      </div>
      <div className="col-span-3">
        <div className="flex h-full w-full items-center pr-2">
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            priority
            src={SearchBarIcon}
            alt="_icons"
          />
          <div className="h-0 w-[33px] rotate-[90deg] border-[1px] border-solid border-[#DCDCDC]"></div>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            priority
            src={ScannerIcon}
            alt="_icons"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
