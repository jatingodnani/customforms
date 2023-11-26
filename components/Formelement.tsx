import React from "react";
import { TextfieldFormElement } from "./fields/Textfield";

export type ElementType="TextField";



export type FormElement={
    type:ElementType;
    construct:(id:string)=>Forminstance
    designerBtnElement:{
        icon:React.ElementType,
        label:string
    }
    designerComponent:React.FC<{
        elementinstance:Forminstance
    }>;
    formComponent:React.FC;
    properties:React.FC
}






export type Forminstance={
    id:string;
    type:ElementType
    extraAttributes?:Record<string,any>
}


type FormElementType={
    [key in ElementType]:FormElement
}


export const FormElemnts:FormElementType={
TextField:TextfieldFormElement

}