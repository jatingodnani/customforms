"use client"
import React, { useState, createContext, ReactNode } from 'react';
import { Forminstance } from '../Formelement';
type DesignerContexttype={
    elements: Forminstance[],
    addElement:(index:number,element:Forminstance)=>void;
}
export const ElementContext= createContext<DesignerContexttype | null>(null);

function ContextProvider({ children }:{
    children:ReactNode
}){
  const [elements, setElement] = useState<Forminstance[]>([]);

  const addElement = (index:number,element:Forminstance) => {
    setElement((prev) =>{ 
    const newelement=[...prev];
      newelement.splice(index,0,element);
      return newelement
  });
  };
  
  return (
    <ElementContext.Provider value={{elements,addElement}}>
      {children}
    </ElementContext.Provider>
  );
}

export default ContextProvider;
