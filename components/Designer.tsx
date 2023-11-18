"use client"
import React,{useContext, useState} from 'react'
import SideBar from "./Sidebar.tsx"
import {useDroppable,useDndMonitor} from '@dnd-kit/core'
import { Forminstance } from './Formelement.jsx'
import useDesigner from "./hooks/useDesigner.tsx"


function Designer() {

const conmt=useDesigner();
console.log(conmt)
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
          const type=active.daya.current.type;
          const newElemt=FormatElement[type as ElementTypes].constructor(
            
          )
        }

        console.log(event)

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
