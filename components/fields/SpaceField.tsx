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
import { LuHeading, LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slice } from "lucide-react";
import { Slider } from "../ui/slider";

const type:ElementType="SpaceField";
const  extraAttributes={
   height:20,
   
   }
export const SpacefieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes
    }),
    designerBtnElement:{
        icon:LuSeparatorHorizontal,
        label:"Space field"
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
    height:z.string().min(5).max(200),
   
})
function FormComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
const {height}=element.extraAttributes;

return (<p style={{height,width:"100%"}}></p>)

}
function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
  const {height}=element.extraAttributes
    return (<div className="flex-col gap-2 ml-auto justify-center items-center w-full">
        <Label className="text-muted-foreground">
          Space Field:{height}px
        </Label>

<LuSeparatorHorizontal className="h-8 w-8"/>
    </div>)
}
type propertiesformschema=z.infer<typeof PropertiesSchema>

function PropertiesComponent({elementinstance}:{elementinstance:Forminstance}){
    const {updateElement}=useDesigner()
    const element=elementinstance as custominstance;
    const {height}=element.extraAttributes;
    console.log()
const form=useForm<propertiesformschema>({
    resolver:zodResolver(PropertiesSchema),
    mode:"onBlur",
    defaultValues:{
        height:height
    }


})
   useEffect(()=>{
 form.reset(element.extraAttributes)
   },[element,form])

   function applyChanges(values:propertiesformschema){
    const {height}=values
     updateElement(element.id,{
        ...element,
        extraAttributes:{
            height
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
    name="height"
    render={({field}) => (
      <FormItem>
        <FormLabel>Height:{form.watch("height")}px</FormLabel>
        <FormControl>
        <Slider
        className="pt-4"
        min={5}
        max={500}
        step={1}
        onValueChange={(value)=>
            {
                field.onChange(value[0])
            }
        }
        defaultValue={[field.value]}/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />
   
  </form>
 </Form>
)
}