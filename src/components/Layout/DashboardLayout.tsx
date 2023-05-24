import {
  BookshelfIcon,
  GiveGiftIcon,
  HamburgerIcon,
  HomeIcon,
  SearchIcon,
} from " /assets/icons";
import { LogoMyBook } from " /assets/images";
import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect, useState } from "react";
import ItemSidebar from "../ItemSidebar";
import SearchBar from "../SearchBar";
import PersonInfo from "../PersonInfo";
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

interface Sidebar {
  title: string;
  icon: StaticImageData;
  url: string;
  prefix: string;
}

const dataSidebar: Sidebar[] = [
  {
    title: "Home",
    icon: HomeIcon,
    url: "/",
    prefix: "//",
  },
  {
    title: "Search",
    icon: SearchIcon,
    url: "/search",
    prefix: "/search/",
  },
  {
    title: "My Shelf",
    icon: BookshelfIcon,
    url: "/my-shelf",
    prefix: "/my-shelf/",
  },
  {
    title: "Contribute",
    icon: GiveGiftIcon,
    url: "/contribute",
    prefix: "/contribute/",
  },
];

const DashboardLayout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState<number>();
  const router = useRouter()

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(window.innerWidth)
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  

  useEffect(() => {
    const isMobile = width != undefined ? width <= 768 : undefined;
    isMobile ? null : setIsOpen(false);
  }, [width]);

  useEffect(() => {
    setIsOpen(false)
  }, [router])
  
  return (
    <div className="relative h-full  w-full bg-[#F3F3F7] font-Inter text-primary md:rounded-[10px]">
      <div className="float-left hidden h-full flex-col justify-between  overflow-y-auto bg-white pb-[50px] pl-[68px] pt-[38px] md:flex md:w-[306px] md:rounded-l-[10px]">
        <div className="flex flex-col">
          <Image
            style={{
              height: 72,
              width: 120,
            }}
            priority
            src={LogoMyBook}
            alt="_logo"
          />
          <div className="xxl:mt-[99px] md:mt-[60px] flex flex-col gap-[34px] text-[20px]">
            {dataSidebar.map((item, idx) => {
              return (
                <ItemSidebar
                  icon={item.icon}
                  prefix={item.prefix}
                  title={item.title}
                  url={item.url}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-[200px] flex flex-col gap-[15px] text-[15px] text-second">
          <p className="cursor-pointer">About</p>
          <p className="cursor-pointer">Support</p>
          <p className="cursor-pointer">Terms & Condition</p>
        </div>
      </div>
      <div className="relative z-50 h-full overflow-y-auto ">
        <button
          onClick={() => setIsOpen(true)}
          className="btn fixed z-50 left-[20px] top-[40px] sm:top-[50px] block md:hidden"
        >
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            priority
            src={HamburgerIcon}
            alt="_icons"
          />
        </button>
        <div className="left-0 right-0 top-0 flex h-[150px] sm:h-[120px] w-full flex-row flex-wrap items-center justify-end gap-x-5 px-[20px] pt-[20px] md:h-[120px] md:flex-nowrap md:justify-between md:pl-[46px] md:pr-[45px] md:pt-[0]">
          <SearchBar />
          <PersonInfo />
        </div>
        {children}
      </div>
      <Drawer
        open={isOpen}
        className="!w-full !max-w-[80%]"
        onClose={toggleDrawer}
        direction="left"
      >
        <div className="flex h-full flex-col justify-between py-[40px] pl-[40px] pr-[20px]">
          <div className="flex flex-col">
            <Image
              style={{
                height: 72,
                width: 120,
              }}
              priority
              src={LogoMyBook}
              alt="_logo"
            />
            <div className="mt-[99px] flex flex-col gap-[34px] text-[20px]">
              {dataSidebar.map((item, idx) => {
                return (
                  <ItemSidebar
                    icon={item.icon}
                    prefix={item.prefix}
                    title={item.title}
                    url={item.url}
                    key={idx}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-[100px] flex flex-col gap-[15px] text-[15px] text-second">
            <p className="cursor-pointer">About</p>
            <p className="cursor-pointer">Support</p>
            <p className="cursor-pointer">Terms & Condition</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardLayout;
