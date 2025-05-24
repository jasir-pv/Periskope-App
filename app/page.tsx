import Header from "@/components/Header";
import RightBar from "@/components/RightBar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
  <div className="flex h-screen overflow-hidden">

   <Sidebar />

    <div className="flex-1 flex flex-col">
   <Header />
    <div className="p-4">
    
    </div>

    </div>

    <RightBar/>

   </div>

  );
}
