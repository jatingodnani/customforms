"use client"
import React,{useContext} from 'react'
import SideBar from "./Sidebar.tsx"
import {useDroppable} from '@dnd-kit/core'
import { ElementContext } from './provider/contextprovider.jsx'
function Designer() {
  const { element} = useContext(ElementContext);
  console.log(element)
    const droppable=useDroppable({
        id:"designear-drop-area",
        data:{
          isdesignerdroparea:true
        }
       
    })
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div 
        ref={droppable.setNodeRef}
        className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-center flex-1">

            
{!droppable.isOver && <p className="text-muted-foreground font-bold text-3xl flex flex-grow items-center
            ">DropHere</p>}
          {
            droppable.isOver && <div className="p-4 w-full"><div className="h-[120px] rounded bg-primary/20"></div></div>
          }
         
            
            </div> 
            
      </div>
      <SideBar/>
    </div>
  )
}

export default Designer
