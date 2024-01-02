"use client"
import {ElementType, FormElement, Forminstance, submitvalue} from "../Formelement"
import {MdTextFields} from "react-icons/md"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage,FormLabel } from "../ui/form";
import useDesigner from "../hooks/useDesigner";
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils";
import { LuHeading, LuHeading1 } from "react-icons/lu";
import {RiSeparator} from "react-icons/ri"
import { Separator } from "../ui/separator";
const type:ElementType="SeparatorField";

export const SeparatorfieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
    
    }),
    designerBtnElement:{
        icon:RiSeparator,
        label:"Seperator-field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    properties:PropertiesComponent,
    validate:()=>true
}




function FormComponent({elementinstance}:{elementinstance:Forminstance}){
  
return <Separator/>

}
function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
        Seperator Field
        </Label>
<Separator/>
    </div>)
}


function PropertiesComponent({elementinstance}:{elementinstance:Forminstance}){
   
return <p>No properties for this element</p>
}