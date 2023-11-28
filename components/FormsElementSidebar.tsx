import React from 'react'
import useDesigner from './hooks/useDesigner'
import { FormElemnts } from './Formelement';
import { AiOutlineClose } from "react-icons/ai";
import { Button } from './ui/button';
import { Separator } from './ui/separator';

function FormsElementSidebar() {
    const {selectedElement,setSelectedElement}=useDesigner();
    if(!selectedElement) return null;

    if(!selectedElement) return null;
    const PropertiesElement=FormElemnts[selectedElement?.type].properties
      return (
  <div className='flex flex-col gap-2'>
<div className='flex items-center justify-between'>
    <p className='text-sm text-foreground/70'>Element Properties</p>
    <Button size={"icon"} variant={"ghost"} onClick={()=>setSelectedElement(null)}>
        <AiOutlineClose />
    </Button>
  
</div>
<Separator/>
<PropertiesElement elementinstance={selectedElement}/>
  </div>
  )
}

export default FormsElementSidebar