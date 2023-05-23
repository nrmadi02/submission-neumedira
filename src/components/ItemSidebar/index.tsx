import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  title: string;
  icon: StaticImageData;
  url: string;
  prefix: string;
}

const ItemSidebar = ({icon, prefix, title, url}: Props) => {
  const router = useRouter();
  const routerURL = router.asPath + "/";

  return (
    <Link href={url} className="group">
      <div
        className={`flex w-max cursor-pointer flex-row items-center gap-3 transition-all group-hover:text-[#4D4D4D]  ${
          routerURL.startsWith(prefix) ? "text-[#4D4D4D]" : "text-[#8A8A8A]"
        }`}
      >
        <Image
          className="sibebar-item transition-all"
          alt="_iconside"
          src={icon}
          style={{
            height: 23,
            width: 23,
            filter: `brightness(${
              routerURL.startsWith(prefix) ? 3 : 1
            }) invert(1)`,
          }}
        />
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default ItemSidebar