import { useRouter } from "next/router";
import { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";

interface Props {
  children: ReactNode
}

const WrapperLayout = ({children}: Props) => {
  const router = useRouter()
  if(router.pathname == "/login"){
    return (
      <div className="h-screen w-full overflow-scroll overflow-x-hidden bg-login bg-cover bg-center md:px-[35px] md:pb-[38px] md:pt-[48px] font-Inter">
        {children}
      </div>
    );
  }
  return (
    <div className="h-screen w-full overflow-scroll overflow-x-hidden bg-login bg-cover bg-center md:px-[35px] md:pb-[38px] md:pt-[48px] font-Inter">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default WrapperLayout
