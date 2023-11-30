import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from "react-icons/md"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useDesigner from './hooks/useDesigner'
import { FormElemnts } from './Formelement'
function PreviewButton() {
  const {elements}=useDesigner()
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button variant={"outine"}  className="gap-2" ><MdPreview className="w-6 h-6"/>Preview</Button>
    </DialogTrigger>
    <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col p-0 gap-0">
    <div className="px-4 py-4 border-b">
      <p className='text-lg font-bold text-muted-foreground'>Form Preview</p>
      <p className='text-sm text-muted-foreground'>This is how form will look like to users.</p>
    </div>
    <div className='bg-accent 
    flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto'>

      <div className='max-w-[620px] flex gap-4 flex-grow flex-col bg-background h-full 
      w-full rounded-2xl  p-8 overflow-y-auto '>

        {
elements.map((element)=>{
  const FormComponent=FormElemnts[element.type].formComponent;
  return <FormComponent key={element.id}  elementinstance={element}/>
})
        }
      </div>
    </div>
    </DialogContent>
  </Dialog>
   
  )
}

export default PreviewButton
