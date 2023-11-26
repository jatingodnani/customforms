"use client"

import {useContext} from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi';

function SaveButton() {
  

  return (
    <Button variant={"outine"}  className="gap-2" >
        <HiSaveAs size={20}/>
        Save
        </Button>
      
    
  )
}

export default SaveButton
