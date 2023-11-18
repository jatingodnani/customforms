"use client"

import {useContext} from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi';
import { ElementContext } from './provider/contextprovider';
function SaveButton() {
  const element=useContext(ElementContext)
  console.log(element)
  return (
    <Button variant={"outine"}  className="gap-2" >
        <HiSaveAs size={20}/>
        Save
        </Button>
      
    
  )
}

export default SaveButton
