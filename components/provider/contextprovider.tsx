"use client"
import React, { useState, createContext, ReactNode } from 'react';
import { Forminstance } from '../Formelement';
type DesignerContexttype={
    elements: Forminstance[];
    addElement:(index:number,element:Forminstance)=>void;
    setElement:React.Dispatch<React.SetStateAction<Forminstance[]>>
    removeElement:(id:string)=>void;
    selectedElement:Forminstance;
    setselectedElement: React.Dispatch<React.SetStateAction<Forminstance | null>>
    updateElement:(id:string,element:Forminstance)=>void;
}
export const ElementContext= createContext<DesignerContexttype | null>(null);

function ContextProvider({ children }:{
    children:ReactNode
}){
  const [elements,setElement] = useState<Forminstance[]>([]);
const [selectedElement,setSelectedElement]=useState<Forminstance>()
  const addElement = (index:number,element:Forminstance) => {
    
    setElement((prev) =>{ 
     const allelement=[...prev];
allelement.splice(index,0,element)
return allelement;

    
  });
  };
  const updateElement=(id:string,element:Forminstance)=>{
      setElement((prev)=>{
        const newelement=[...prev];
        const index=newelement.findIndex((e)=>e.id===id);
        newelement[index]=element;
        return newelement
      })
  }
  const removeElement = (id:string) => {
   
    setElement((prev) => prev.filter((element) => element.id!== id));
  };
  
  return (
    <ElementContext.Provider value={{elements,addElement,removeElement,updateElement,
    selectedElement,setSelectedElement,setElement}}>
      {children}
    </ElementContext.Provider>
  );
}

export default ContextProvider;
