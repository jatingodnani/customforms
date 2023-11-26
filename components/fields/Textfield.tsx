"use client"
import {ElementType, FormElement, Forminstance} from "../Formelement"
import {MdTextFields} from "react-icons/md"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type:ElementType="TextField";
const  extraAttributes={
    label:"Text field",
    helperText: "helper Text",
    required:false,
    placeholder:"Value here"
   }
export const TextfieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes
    }),
    designerBtnElement:{
        icon:MdTextFields,
        label:"Textfield"
    },
    designerComponent:DesignerComponent,
    formComponent:()=><div>this form component</div>,
    properties:()=><div>Properties</div>
}
type custominstance=Forminstance &{
    extraAttributes:typeof extraAttributes
}


function DesignerComponent({elementinstance}:{elementinstance:Forminstance}){
  const element=elementinstance as custominstance
  const {label,required,placeholder,helperText}=element.extraAttributes
    return (<div className="flex flex-col gap-2 w-full">
        <Label>
            {label}
            {required && <span className="text-red-500">*</span>}
        </Label>
<Input readOnly disabled placeholder={placeholder}/>
{helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>)
}