"use client"
import {ElementType, FormElement} from "../Formelement"
import {MdTextFields} from "react-icons/md"

const type:ElementType="TextField";
export const TextfieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
       id,
       type,
       extraAttributes:{
        label:"Text field",
        helperText: "helper Text",
        required:false,
        placeholder:"Value here"
       }
    }),
    designerBtnElement:{
        icon:MdTextFields,
        label:"Textfield"
    },
    designerComponent:()=><>this is designer </>,
    formComponent:()=><div>this form component</div>,
    properties:()=><div>Properties</div>
}