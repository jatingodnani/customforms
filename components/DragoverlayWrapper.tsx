"use client";
import React, { useState } from "react";

import { DndContext, useDndMonitor, DragOverlay } from "@dnd-kit/core";
import SidebarbtnoverlayElement from "./SidebarbtnElement";
import { FormElemnts, ElementType } from "./Formelement";
import useDesigner from "./hooks/useDesigner";
import { DesignElementWrapper } from "./Designer";

export default function Dragoverlaywrappper() {
 const {elements}=useDesigner()
  const [draggeditem, setdraggeditem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
  
      setdraggeditem(event.active);
    },
    onDragEnd: (event) => {

        
      setdraggeditem(null);
    },
    onDragCancel: (event) => {
      setdraggeditem(null);
    },
  });

  if (!draggeditem) return null;
  let node = <div>No drag overlay</div>;
  const sidebaritem = draggeditem.data.current?.isdesignerdraggable;
  
  if (sidebaritem) {
    const type = draggeditem.data?.current.type as ElementType;

    node = <SidebarbtnoverlayElement formelement={FormElemnts["TextField"]} />;
  }

  const isdesignerelement=draggeditem.data?.current?.isDesigner
  if(isdesignerelement){
    const elementId=draggeditem.data?.current?.elementId
    const findele=elements.find((e)=>e.id==elementId);
    if(!findele) node=<div>element not found</div>
    else{
      const Designcompo=FormElemnts[findele.type as ElementType].designerComponent
      node=<div className="flex border bg-accent p-2 
      opacity-80  h-[120px] w-full rounded-md pointer pointer-events-none"><Designcompo elementinstance={findele}/></div>
       }
  }
  return (
    <DragOverlay>
      <div>{node}</div>
    </DragOverlay>
  );
}
