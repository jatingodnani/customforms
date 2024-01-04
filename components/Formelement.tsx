import React from "react";
import { TextfieldFormElement } from "./fields/Textfield";
import { TitlefieldFormElement } from "./fields/Titlefield";
import { SubTitlefieldFormElement } from "./fields/SubtitleField";
import { ParaGraphfieldFormElement } from "./fields/ParaGraphField";

import { SeparatorfieldFormElement } from "./fields/Seperatorfireld";
import { SpacefieldFormElement } from "./fields/SpaceField";
import { NumberfieldFormElement } from "./fields/Numberfield";
import { TextAreafieldFormElement } from "./fields/TextArefield";
import { DatefieldFormElement } from "./fields/Datefield";
import { SelectfieldFormElement } from "./fields/SelectField";
import { CheckfieldFormElement } from "./fields/CheckField";
export type ElementType="TextField" | "TitleField" |"SubTitleField" |"SpaceField"
|"ParagraphField"|"CheckField"|"SelectField"|"SeparatorField"|"NumberField"|"TextAreaField"|"DateField";
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
TitleField:TitlefieldFormElement,
SubTitleField:SubTitlefieldFormElement,
ParagraphField:ParaGraphfieldFormElement,
SeparatorField:SeparatorfieldFormElement,
SpaceField:SpacefieldFormElement,
NumberField:NumberfieldFormElement,
TextAreaField:TextAreafieldFormElement,
DateField:DatefieldFormElement,
SelectField:SelectfieldFormElement,
CheckField:CheckfieldFormElement
}