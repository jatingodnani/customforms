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
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type:ElementType="ParagraphField";
const  extraAttributes={
    text:"Text here",
   
   }
export const ParaGraphfieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes
    }),
    designerBtnElement:{
        icon:BsTextParagraph,
        label:"Paragraph field"
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
    title:z.string().min(3).max(500),

})
function FormComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
const {text}=element.extraAttributes;

return (<p>{text}</p>)

}
function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
  const {text}=element.extraAttributes
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
          ParaGraph Field
        </Label>

<p >{text}</p>
    </div>)
}
type propertiesformschema=z.infer<typeof PropertiesSchema>

function PropertiesComponent({elementinstance}:{elementinstance:Forminstance}){
    const {updateElement}=useDesigner()
    const element=elementinstance as custominstance;
    const {text}=element.extraAttributes;
    console.log()
const form=useForm<propertiesformschema>({
    resolver:zodResolver(PropertiesSchema),
    mode:"onBlur",
    defaultValues:{
        text:text
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
            text
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
    name="text"
    render={({field}) => (
      <FormItem>
        <FormLabel>Text</FormLabel>
        <FormControl>
        <Textarea
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