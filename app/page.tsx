'use client'

import MainContainer from "@/components/chat/MainContainer";
import Header from "@/components/Header";
import RightBar from "@/components/RightBar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {

  const [expand, setExpand] = useState(false);

  return (
  <div className="flex h-screen flex-col overflow-hidden">

   <Header />

    <div className="flex-1 flex flex-col">
   <Sidebar expand={expand} setExpand={setExpand}/>

    <RightBar/>
      <MainContainer params={{ userId: "" }}/>
</div>

</div>

  );
}
