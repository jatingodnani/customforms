"use client"
import React, { startTransition, useTransition } from 'react'
import { Button } from './ui/button'
import {MdOutlinePublish} from "react-icons/md"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaSpinner,FaIcons } from 'react-icons/fa'
import { Toast } from './ui/toast'
import { toast } from './ui/use-toast'
import { publishform } from '@/actions/form'
import { useRouter } from 'next/navigation'

 function PublishButton({id}:{id:number}) {
 const router=useRouter()
  const [loading,settransition]=useTransition()
  const publishedform=async()=>{
   try{
   await publishform(id)
      toast({
        title:"Success",
        description:"Your form is available to the public",
        
      })
      router.refresh()
   }catch(error){
    console.log(error)
    toast({
      title:"Error",
      description:"Something went wrong",
      
    })
   }
  }
  return (

    <AlertDialog>
    <AlertDialogTrigger>
    <Button variant={"outine"}   className="flex text-white bg-gradient-to-r 
    from-indigo-400 to-cyan-400 gap-2"><MdOutlinePublish size={20}/>Publish</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.After publishing,you will not able to  Edit this form.
          <br/>
          <br/>
            By publishing this form you will make it available to the users.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction disabled={loading} onClick={(e)=>{
          e.preventDefault();
         settransition(publishedform)
        }}
        >{loading?<FaSpinner className="animate-spain w-6 h-6"/>:"Publish"}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default PublishButton
