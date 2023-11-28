import React from 'react'
import { FormElemnts } from './Formelement'
import SidebarbtnElement from './SidebarbtnElement'
import useDesigner from './hooks/useDesigner'
import { RxCross2 } from "react-icons/rx";
import FormsElementSidebar from './FormsElementSidebar';
function Sidebar() {
  const {selectedElement}=useDesigner()
  return (
    <div className="h-full realtive w-[400px]  max-w-[400px]  flex flex-col
     flex-grow gap-2 border-l-2 p-4 bg-background overflow-y-auto">
      
      {
         selectedElement?<FormsElementSidebar/>:
    <div>
      Elements
      <SidebarbtnElement formelement={FormElemnts.TextField}/>
      </div>
    
}
    </div>
  )
}

export default Sidebar
