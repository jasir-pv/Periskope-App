import MainContainer from "@/components/chat/MainContainer";
import Header from "@/components/Header";
import RightBar from "@/components/RightBar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
  <div className="flex h-screen flex-col overflow-hidden">

   <Header />

    <div className="flex-1 flex flex-col">
   <Sidebar />
    <RightBar/>
      <MainContainer/>
</div>

</div>

  );
}
