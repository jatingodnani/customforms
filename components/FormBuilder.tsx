"use client"
import {Form} from "@prisma/client"
import PublishButton from "./PublishButton"
import PreviewButton from "./PreviewButton"
import SaveButton from "./SaveButton"
import Designer from "./Designer"
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors,} from '@dnd-kit/core';
import DragoverlayWrapper from "./DragoverlayWrapper"
function FormBuilder({form}:{
form:Form
}){
const mouseSensors=useSensor(MouseSensor,{
    activationConstraint:{
        distance:10
    }
})
const touchSensors=useSensor(TouchSensor,{
    activationConstraint:{
        delay:300,
        tolerance:5
    }
})

    const sensors=useSensors(mouseSensors,touchSensors);
return <DndContext sensors={sensors}>
   <main className="flex flex-col w-full">
    <nav className="flex justify-between  items-center border-b-2 p-4">
        <h2 className="truncate font-medium">
            <span className="text-muted-foreground">From:</span>
            {form.name}
        </h2>
        <div className="flex items-center gap-2">
            <PreviewButton/>
            {
                !form.published && <><SaveButton/>
                <PublishButton/></>
}
            </div>
        
        </nav>
        <div className="flex w-full flex-grow items-center justify-center 
        relative overflow-y-auto h-[200px] bg-red-500">
            <Designer/>
        </div>
    </main>
    <DragoverlayWrapper/>
    </DndContext>
}

export default FormBuilder