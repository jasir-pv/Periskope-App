import { RxAvatar } from "react-icons/rx";

export default function SidebarHeader() {
  return (
       <div className="w-full flex p-2 gap-1 bg-gray-100  border-b border-gray-300">
      <div className="flex items-center">
        <div className="rounded p-2 mr-2">
               <RxAvatar/> 
        </div>
        <div>
        <h2 className="font-semibold text-xs">Test El Centro</h2>
        <p className="text-[10px] text-gray-500">Roshnaq Airtel, etc.</p>
        </div>
      </div>
      {/* Optional buttons */}
    </div>
  )
}