"use client"
import React from 'react'
import { FormElement } from './Formelement'
import { Button } from './ui/button'
import {DndContext, useDraggable, useDroppable} from '@dnd-kit/core';
function SidebarbtnElement({formelement}:{formelement:FormElement}) {
    const {icon:Icon,label}=formelement.designerBtnElement
    const draggable=useDraggable({
      id:`designer-btn-${formelement.type}`,
      data:{
        type:formelement.type,
        isdesignerdraggable:true
      }
    })
  return (
   <Button 
   ref={draggable.setNodeRef}
   variant={"outline"}
   className="h-[120px] w-[120px] flex flex-col gap-2 cursor-grab"
   {...draggable.listeners}
   {...draggable.attributes}
   >
    <Icon className="h-8 w-8  text-primary  cursor-grab"/>
    <p className="text-xs">{label}</p>
   </Button>
  )
}
export function SidebarbtnoverlayElement({formelement}:{formelement:FormElement}) {
  const {icon:Icon,label}=formelement.designerBtnElement

return (
 <Button 

 variant={"outline"}
 className="h-[120px] w-[120px] flex flex-col gap-2 cursor-grab "
>
  <Icon className="h-8 w-8  text-primary  cursor-grab"/>
  <p className="text-xs">{label}</p>
 </Button>
)
}

export default SidebarbtnElement
