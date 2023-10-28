"use client"
import React, { useState } from 'react';

import {DndContext, useDndMonitor,DragOverlay} from '@dnd-kit/core';
import SidebarbtnoverlayElement from "./SidebarbtnElement";
import { FormElemnts,ElementType } from "./Formelement";

export default function  Dragoverlaywrappper(){
    const [draggeditem,setdraggeditem]=useState<Active | null>(null);
    useDndMonitor({
        onDragStart:(event)=>{
            console.log("drag item",event)
            setdraggeditem(event.active)
        },
        onDragEnd:(event)=>{
            setdraggeditem(null)
        },
        onDragCancel:(event)=>{
            setdraggeditem(null)
        }

    })
   
    if(!draggeditem) return null;
let node=<div>No drag overlay</div>
const sidebaritem=draggeditem.data.current?.isdesignerdraggable;
console.log(draggeditem,sidebaritem);
if(sidebaritem){
    const type=draggeditem.data?.current.type as ElementType;

    node=<SidebarbtnoverlayElement formelement={FormElemnts["TextField"]}/>
}
    return <DragOverlay>

        <div>{node}
        </div>
    </DragOverlay>
}