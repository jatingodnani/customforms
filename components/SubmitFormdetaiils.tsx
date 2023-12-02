import { Getalldetailofsubmission } from '@/actions/form'
import React, { ReactNode } from 'react'
import { ElementType, Forminstance } from './Formelement'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDistance } from 'date-fns'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'

async function SubmitFormdetaiils({id}:{id:number}) {
  const form=await Getalldetailofsubmission(id)
type Row={[key:string]:string} &{
  submittedAt:Date
}
 if(!form){
  throw new Error("form not found")
 }
 const formcontent=JSON.parse(form.content) as Forminstance[];
 const columns:{
  id:string,
label:string,
 
type:ElementType
  required:boolean
}[]=[];

const row:Row[]=[]
formcontent.forEach((element)=>{
  switch(element.type){
    case "TextField":
      columns.push({
        id:element.id,
        label:element.extraAttributes?.label,
        type:element.type,
        required:element.extraAttributes?.required
      })
      break;
   default:
    break;
  }
})
form.Formsubmission.forEach((element)=>{
  const cont=JSON.parse(element.content)
  
  row.push({
    ...cont,
    submittedAt:element.createdAt
  })
})
console.log(columns,row);
  return (

    <>
    <h1 className='text-2xl my-4 font-bold'>Submissions</h1>
    <div className='rounded-md border'>
    <Table>

  <TableHeader>
    <TableRow>
      {
        columns.map((column)=>{
          return <TableHead className="uppercase"key={column.id}>{column.label}</TableHead>
        })
      }
      <TableHead className="text-muted-foreground uppercase text-right">SubmittedAt</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
  
      {
        row.map((ele,index)=>(
        <TableRow key={index}>
            {
              columns.map((each)=>(
                  <RowCell
                   key={each.id} 
                   type={each.type}
                   value={ele[each.id]}
                   />
              ))
            }
            <TableCell className='text-right text-muted-foreground'>
{formatDistance(ele.submittedAt,new Date(),{
  addSuffix:true
})}
            </TableCell>
          </TableRow>
        ))
      }
      

  </TableBody>
</Table>

    </div>
    </>
  )
}



function RowCell({type,value}:{type:ElementType,value:string}){


     let node:ReactNode=value;
     switch(type){
      case "DateField":
        if(!value) break;
        const date=new Date(value);
        node=<Badge variant={"outline"} ></Badge>
        break;
        case "CheckBox":
          const checked=value=="true"?true:false;
          node=<Checkbox checked={checked} disabled/>
          break;
          default:
            break;
     }
     return<TableCell>{node}</TableCell>
}
export default SubmitFormdetaiils