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
import { LuHeading, LuHeading2 } from "react-icons/lu";

const type:ElementType="TitleField";
const  extraAttributes={
    title:"SubTitle field",
   
   }
export const ParaGraphfieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes
    }),
    designerBtnElement:{
        icon:LuHeading2,
        label:"SubTitle field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    properties:PropertiesComponent,
    validate:()=>true
}



type custominstance=Forminstance &{
    extraAttributes:typeof extraAttributes
}
const  PropertiesSchema=z.object({
    title:z.string().min(3).max(50),

})
function FormComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
const {title}=element.extraAttributes;

return (<p className="text-lg">{title}</p>)

}
function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
  const {title}=element.extraAttributes
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
          Text Field
        </Label>

<p className="text-lg">{title}</p>
    </div>)
}
type propertiesformschema=z.infer<typeof PropertiesSchema>

function PropertiesComponent({elementinstance}:{elementinstance:Forminstance}){
    const {updateElement}=useDesigner()
    const element=elementinstance as custominstance;
    const {title}=element.extraAttributes;
    console.log()
const form=useForm<propertiesformschema>({
    resolver:zodResolver(PropertiesSchema),
    mode:"onBlur",
    defaultValues:{
        title:title
    }


})
   useEffect(()=>{
 form.reset(element.extraAttributes)
   },[element,form])

   function applyChanges(values:propertiesformschema){
    const {title}=values
     updateElement(element.id,{
        ...element,
        extraAttributes:{
            title
        }
     })
   }

return(
 <Form {...form} >
    <form 
    onSubmit={(e)=>{
e.preventDefault()
    }}
    onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
      <FormField
    control={form.control}
    name="title"
    render={({field}) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
        <Input
        onKeyDown={(e)=>{
            if(e.key=="Enter") e.currentTarget.blur()
        }}
         {...field}/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />
   
  </form>
 </Form>
)
}