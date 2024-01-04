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
import { BsFillCalculatorFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
  
const type:ElementType="DateField";
const  extraAttributes={
    label:"Date field",
    helperText: "Pick a Date",
    required:false,
   
   }
export const DatefieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes
    }),
    designerBtnElement:{
        icon:BsFillCalculatorFill,
        label:"Date field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    properties:PropertiesComponent,
    validate:(forelement:Forminstance,currentvalue:string):boolean=>{
      const element=forelement as custominstance;
      if(element.extraAttributes.required){
      return currentvalue.length>0
      }
      return true
    }
}



type custominstance=Forminstance &{
    extraAttributes:typeof extraAttributes
}
const  PropertiesSchema=z.object({
    label:z.string().min(3).max(50),
    helperText:z.string().max(50),
    required:z.boolean().default(false),
    placeholder:z.string().max(50)
})
function FormComponent({elementinstance, submitvalue,
  isInvalid,defaultvalue}:{elementinstance:Forminstance, submitvalue?:submitvalue,isInvalid:boolean,defaultvalue:string}){
  const element=elementinstance as custominstance
const {label,required,placeholder,helperText}=element.extraAttributes;
const [date,setdate]=useState<Date | undefined>(defaultvalue?new Date(defaultvalue):undefined);
const [error,seterror]=useState(false)

useEffect(()=>{
seterror(isInvalid===true)
},[isInvalid])


return (<div className="flex flex-col gap-2 w-full">
<Label className={cn(error && "text-red-500")}>
    {label}
    {required && <span className="text-red-500 ml-1 ">*</span>}
</Label>
<Popover>
  <PopoverTrigger>
  <Button variant={"outline"} 
  className={cn("w-full justify-start text-left font-normal",
  !date && "text-muted-foreground",error && "border-red-500")}>
  <CalendarIcon className="mr-2 h-4 w-4"/>
  {date? format(date,"PPP"):<span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar 
    mode="single"
    selected={date}
    onSelect={(date)=>{
        setdate(date);
        if(!submitvalue) return ;
        const value=date?.toUTCString() || "";
        const valid=DatefieldFormElement.validate(element,value);
        seterror(!valid);
        submitvalue(element.id,value)
    }}
    initialFocus
    />
  </PopoverContent>
 
</Popover>

{helperText && <p className={cn(
"text-muted-foreground text-[0.8rem]",error && "text-red-500")}>{helperText}</p>}
</div>)

}
function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
  const {label,required,placeholder,helperText}=element.extraAttributes
    return (<div className="flex flex-col gap-2 w-full">
        <Label>
            {label}
            {required && <span className="text-red-500">*</span>}
        </Label>
<Button variant={"outline"} className="w-full justify-start text-left font-normal">
  <CalendarIcon className="mr-2 h-4 w-4"/>
  <span>Pick a date</span>
    </Button>
{helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>)

}
type propertiesformschema=z.infer<typeof PropertiesSchema>

function PropertiesComponent({elementinstance}:{elementinstance:Forminstance}){
    const {updateElement}=useDesigner()
    const element=elementinstance as custominstance;
    const {label,required,helperText}=element.extraAttributes;
const form=useForm<propertiesformschema>({
    resolver:zodResolver(PropertiesSchema),
    mode:"onBlur",
    defaultValues:{
        label:label,
        required:required,
    
        helperText:helperText
    }


})
   useEffect(()=>{
 form.reset(element.extraAttributes)
   },[element,form])

   function applyChanges(values:propertiesformschema){
     updateElement(element.id,{
        ...element,
        extraAttributes:{
            ...values
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
    name="label"
    render={({field}) => (
      <FormItem>
        <FormLabel>Label</FormLabel>
        <FormControl>
        <Input
        onKeyDown={(e)=>{
            if(e.key=="Enter") e.currentTarget.blur()
        }}
         {...field}/>
        </FormControl>
        <FormDescription >
            The label of field <br/>It will displayed above the field
            </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />

   <FormField
    control={form.control}
    name="helperText"
    render={({field}) => (
      <FormItem>
        <FormLabel>HelperText</FormLabel>
        <FormControl>
        <Input
        onKeyDown={(e)=>{
            if(e.key=="Enter") e.currentTarget.blur()
        }}
         {...field}/>
        </FormControl>
        <FormDescription >
        The Helpertext of field <br/>It will displayed above the field
            </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="required"
    render={({field}) => (
      <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-md">
<div>
        <FormLabel>Required</FormLabel>
       
        <FormDescription >
        The Helpertext of field <br/>It will displayed above the field
            </FormDescription>
            </div>
            <FormControl>
       
      <Switch
      checked={field.value}
      onCheckedChange={field.onChange}/>
      </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  </form>
 </Form>
)
}