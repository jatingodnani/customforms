import { GetContentbyurl } from '@/actions/form'
import { Forminstance } from '@/components/Formelement'
import FormsubmitComponent from '@/components/FormsubmitComponent'
import React from 'react'

async function page({params}:{
    params:{
        formid:string
    }
}){
   const form=await GetContentbyurl(params.formid)
  
   if(!form){
    throw new Error("not found")
   }
   const formcontent = JSON.parse(form?.content) as Forminstance[]
  return (
  <FormsubmitComponent formurl={params.formid} content={formcontent}/>
  )
}

export default page