import React from 'react'
import { FormElemnts } from './Formelement'
import SidebarbtnElement from './SidebarbtnElement'
import useDesigner from './hooks/useDesigner'
import { RxCross2 } from "react-icons/rx";
import FormsElementSidebar from './FormsElementSidebar';
import { Separator } from './ui/separator';
function Sidebar() {
  const {selectedElement}=useDesigner()
  return (
    <div className="h-full realtive w-[400px]  max-w-[400px]  flex flex-col
     flex-grow gap-2 border-l-2 p-4 bg-background overflow-y-auto">
      
      {
         selectedElement?<FormsElementSidebar/>:
    <div>
     <p className='text-sm text-foreground'>Drag and drop elements</p>
      <Separator className='my-2'/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
      <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
        layout Element</p>
   
      <SidebarbtnElement formelement={FormElemnts.TitleField}/>
      <SidebarbtnElement formelement={FormElemnts.SubTitleField}/>
      <SidebarbtnElement formelement={FormElemnts.ParagraphField}/>
      <SidebarbtnElement formelement={FormElemnts.SeparatorField}/>
      <SidebarbtnElement formelement={FormElemnts.SpaceField}/>
      <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
       Form Element
       </p>
       <SidebarbtnElement formelement={FormElemnts.TextField}/>
       <SidebarbtnElement formelement={FormElemnts.NumberField}/>
       <SidebarbtnElement formelement={FormElemnts.TextAreaField}/>
       <SidebarbtnElement formelement={FormElemnts.DateField}/>
       <SidebarbtnElement formelement={FormElemnts.SelectField}/>
       <SidebarbtnElement formelement={FormElemnts.CheckField}/>
      </div>
      </div>
    
}
    </div>
  )
}

export default Sidebar
