import { SideBar } from "@/common/components/SideBar/SideBar";
import { Layout } from "@/common/components/Layout/Layout";

export const MainPage = () => {
  return (
    <div className={"container"}>
      <SideBar />
      <Layout />
    </div>
  );
};
