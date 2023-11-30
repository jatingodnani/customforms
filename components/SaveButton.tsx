"use client"

import {useContext, useTransition} from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi';
import useDesigner from './hooks/useDesigner';
import { Savefunctionalityform } from '@/actions/form';
import { toast } from './ui/use-toast';
import { FaSpinner } from 'react-icons/fa';

function SaveButton({id}:{id:number}) {
 
  const {elements}=useDesigner();
  const [loading,setloading]=useTransition()
const updatesaveitem=async()=>{
  try{
    const JsonElemment=JSON.stringify(elements);
     await Savefunctionalityform(id,JsonElemment);
     toast({
      title:"Success",
      description:"Your form has been saved"

     })
  }catch(error){
    toast({
      title:"Error",
      description:"Something went wrong"
      ,variant:"destructive"

     })
  }
}
  return (
    <Button 
    onClick={()=>{
      setloading(updatesaveitem)
      }} 
      variant={"outine"} 
       className="gap-2" >
        <HiSaveAs size={20}/>
        Save
        {loading && <FaSpinner className="animate-spin"
        />}
        </Button>
      
    
  )
}

export default SaveButton
