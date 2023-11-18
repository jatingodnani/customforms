"use client"
import {useContext} from "react"
import {ElementContext} from "../provider/contextprovider"
export default function useDesigner(){
    console.log("hii")
    const context=useContext(ElementContext)
    if(!context){
       throw new Error("not having context")
    }
    return context
}