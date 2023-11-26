"use client"
import React, { useState, createContext, ReactNode } from 'react';
import { Forminstance } from '../Formelement';
type DesignerContexttype={
    elements: Forminstance[],
    addElement:(index:number,element:Forminstance)=>void;
    removeElement:(id:string)=>void;
}
export const ElementContext= createContext<DesignerContexttype | null>(null);

function ContextProvider({ children }:{
    children:ReactNode
}){
  const [elements, setElement] = useState<Forminstance[]>([]);

  const addElement = (element:Forminstance) => {
    setElement((prev) =>{ 
    return [...prev,element]

    
  });
  };
  const removeElement = (id:string) => {
    setElement((prev) => prev.filter((element) => element.id!== id));
  };
  
  return (
    <ElementContext.Provider value={{elements,addElement,removeElement}}>
      {children}
    </ElementContext.Provider>
  );
}

export default ContextProvider;
