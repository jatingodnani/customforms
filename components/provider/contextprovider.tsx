"use client"
import React, { useState, createContext, ReactNode } from 'react';
import { Forminstance } from '../Formelement';
type designerContexttype={
    element: Forminstance[],
    addElement:(index:number,element:Forminstance)=>void;
}
export const ElementContext = createContext<designerContexttype | null>(null);

function ContextProvider({ children }:{
    children:ReactNode
}){
  const [element, setElement] = useState<Forminstance[] | null>([]);

  const addElement = (index:number,element:Forminstance) => {
    setElement((prev) =>{ 
    const newelement=[...prev];
      newelement.splice(index,0,element);
      return newelement
  });
  };
  

  const value = {
    element,
    setElement,
    addElement,
  };

  return (
    <ElementContext.Provider value={value}>
      {children}
    </ElementContext.Provider>
  );
}

export default ContextProvider;
