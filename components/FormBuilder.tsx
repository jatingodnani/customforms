"use client"
import {Form} from "@prisma/client"
import PublishButton from "./PublishButton"
import PreviewButton from "./PreviewButton"
import SaveButton from "./SaveButton"
import Designer from "./Designer"
import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors,} from '@dnd-kit/core';
import DragoverlayWrapper from "./DragoverlayWrapper"
import { useEffect, useState } from "react"
import useDesigner from "./hooks/useDesigner"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Link from "next/link"
import Confetti from 'react-confetti'
function FormBuilder({form}:{
form:Form
}){
    
    
    const {setElement}=useDesigner()
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
    
    useEffect(()=>{
        const elements=JSON.parse(form.content)
    setElement(elements)
    console.log(window)
    },[form])
    
    let shareUrl=typeof window!==undefined ? `${window.location.origin}/submit/${form.shareUrl}`:"";
    console.log(shareUrl)

if(form.published){
    return(
    <Confetti 
    recycle={false}>
    <div className="flex flex-col w-full h-full items-center justify-center pb-2">
       <div className="max-w-md"><h1 className="text-4xl text-center font-bold text-primary bold border-b mb-10">
            Form Published
        </h1>
        <h2 className="text-2xl">Share this  Form</h2>
        <h3 className="text-muted-foreground text-xl border-b pb-6">
            Anyone with the link can view and submit the form</h3>
            <div className="my-4 flex flex-col gap-2 items-center  w-full border-b">
                <Input className="w-full" readOnly value={shareUrl}/>
            </div><Button className="w-full text-black bg-primary mt-2" onClick={()=>{ 
                navigator.clipboard.readText()
                toast({
                    title:"Link copied!!"
                })
                }}>
                Copy Link
            </Button>
            </div>

            <div className="flex justify-between mt-6 p-0">
<Button variant={"link"} asChild>
    <Link href={`/`} className="gap-2">
    <BsArrowLeft/>
    Go back to Home
    </Link>
</Button>
<Button variant={"link"} asChild>
    <Link href={`/forms/${form.id}`} className="gap-2">
  
  Form details
    <BsArrowRight/>
    </Link>
</Button>
            </div>
    </div>
    </Confetti>
)}


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
                !form.published && <><SaveButton id={form.id}/>
                <PublishButton  id={form.id}/></>
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