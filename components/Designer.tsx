"use client"
import React,{useContext, useState} from 'react'
import SideBar from "./Sidebar.tsx"
import {useDroppable,useDndMonitor, useDraggable} from '@dnd-kit/core'
import { ElementType, FormElemnts, Forminstance } from './Formelement.tsx'
import useDesigner from "./hooks/useDesigner.tsx"
import idgenderator from '@/lib/idgenderator.ts'
import { cn } from '@/lib/utils.ts'
import { Button } from './ui/button.tsx'
import { FaRegTrashAlt } from 'react-icons/fa'


function Designer() {

const {elements,addElement}=useDesigner();
console.log(elements)
    const droppable=useDroppable({
        id:"designear-drop-area",
        data:{
          isdesignerdroparea:true
        }
       
    })
    useDndMonitor({
      onDragEnd:(event:DragEndEvent)=>{
        const {active,over}=event
        if(!active ||!over) return ;
        const isdesignerbutton=active.data?.current?.isdesignerdraggable;
        if(isdesignerbutton) {
          const type=active.data?.current?.type;
          const newElemt=FormElemnts[type as ElementType].construct(idgenderator());
          console.log("New elemenrt",newElemt)
          addElement(newElemt)
          console.log(elements)
        }

      
      }
    })
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div 
         style={{scrollbarWidth: 'thin' }}
        ref={droppable.setNodeRef}
        className="bg-background  max-w-[920px] h-full overflow-auto  rounded-xl flex flex-col flex-grow flex-1 p-6">

            
{!droppable.isOver &&  !elements.length &&<p className="text-muted-foreground  font-bold text-3xl flex flex-grow items-center m-auto
            ">DropHere</p>}
          {
            droppable.isOver && <div className="p-4 w-full"><div className="h-[120px] rounded bg-primary/20"></div></div>
          }
         
            {
              elements.length>0 && <div className='flex flex-col gap-3 w-full'>
{
  elements.map((element,index)=>{
    return <DesignElementWrapper key={element.id} element={element} />
  })
}
                
              </div>
            }
            </div> 
            
      </div>
      <SideBar/>
    </div>
  )
}
export function DesignElementWrapper({element}:{element:Forminstance}){
  const [Mouseisover,setMouserover]=useState<boolean>(false)
  const {removeElement}=useDesigner();

  const draggable=useDraggable({
    id:element.id +"-drag-handler",
    data:{
      type:element.type,
      elementId:element.id,
      isDesigner:true
    }
  })
const topHalf=useDroppable({
  id:element.id+"-top",
  data:{
    type:element.type,
    elementId:element.id,
    isTopHalfDroppable:true,
  }
})

const BottomHalf=useDroppable({
  id:element.id+"-bottom",
  data:{
    type:element.type,
    elementId:element.id,
    issBottomHalfDroppable:true,
  }
})

  const Designcomponent=FormElemnts[element.type].designerComponent;
return (
  <div 
  ref={draggable.setNodeRef}
  onMouseEnter={()=>setMouserover(true)}
onMouseLeave={()=>setMouserover(false)}
{...draggable.listeners}
{...draggable.attributes}
  className='relative h-[120px] ring-accent ring-inset rounded-md flex  flex-col text-foreground hover:cursor-pointer rounded-t-md'>
    <div
     ref={topHalf.setNodeRef} 
     className= "absolute w-full h-1/2  rounded-t-md"/>
    <div ref={BottomHalf.setNodeRef} className='absolute w-full h-1/2  bottom-0 rounded-b-md'/>
    {
      Mouseisover &&<>
      <div className='absolute right-0 h-full'>
<Button
className='flex justify-center items-center h-full rounded-md rounded-l-none bg-red-500'
onClick={()=>removeElement(element.id)}
variant={"outline"}>
  <FaRegTrashAlt className="w-6 h-6 text-white"/>
</Button>
      </div>
      
      <div className='absolute left-1/2 animate-pulse top-1/2 -translate-x-1/2  -translate-y-1/2'>
        <p className='text-muted-foreground text-sm'>Click for Properties or drag to move</p> </div></>
    }
  <div  className={cn(
    'flex w-full h-[120px] items-center rounded-md bg-accent/40 p-2 pointer-events-none opacity-100',
    Mouseisover && "opacity-20")}>
<Designcomponent elementinstance={element}/>
</div>

</div>
)
}
export default Designer
