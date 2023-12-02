import React from "react";
import { TextfieldFormElement } from "./fields/Textfield";
import { TitlefieldFormElement } from "./fields/Titlefield";

export type ElementType="TextField" | "TitleField" ;
export type submitvalue=(key:string,value:string)=>void


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
    formComponent:React.FC<{
        elementinstance:Forminstance,
        submitvalue?:(key:string,value:string)=>void,
        isInvalid?:boolean,
        defaultvalue?:string
    }>;
    properties:React.FC<{
        elementinstance:Forminstance
    }>
    validate:(FormElement:Forminstance,currentvalue:string)=>boolean
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
TextField:TextfieldFormElement,
TitleField:TitlefieldFormElement

}