import { SearchSelectIcon } from " /assets/icons";
import useStore from " /store";
import Image from "next/image";

const PersonInfo = () => {
  const store = useStore()
  return (
    <div className="person-info z-50 flex h-[50px] w-[203px] flex-row items-center px-[3px] py-[2px]">
      {store.authUser?.image !== undefined ? <Image
        style={{
          height: 45,
          width: 45,
          borderRadius: "100%",
        }}
        width={45}
        height={45}
        priority
        src={store.authUser.image}
        alt="_images"
      />: null}
      <div className="flex flex-row items-center justify-evenly w-full">
        <p>{store.authUser?.firstName}</p>
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
  );
};

export default PersonInfo;
