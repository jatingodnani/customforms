"use client"

import React, { useRef, useState } from 'react'
import { FormElemnts, Forminstance } from './Formelement'
import { Button } from './ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { toast } from './ui/use-toast'
import { submitformbyurl } from '@/actions/form'


function FormsubmitComponent({ formurl, content }: { formurl: string, content: Forminstance[] }) {

  const formvalues = useRef<{ [key: string]: string }>({})


  const formvalidation = useRef<{ [key: string]: boolean }>({})
  const [randomnum, setrandom] = useState(new Date().getTime())
  const [submitted, setsubmitted] = useState(false)


  const vaalidationform: () => boolean = () => {
    for (let field of content) {
      const actualval = formvalues.current[field.id] || "";
      const valid = FormElemnts[field.type].validate(field, actualval);
      if (!valid) {
        formvalidation.current[field.id] = true;

      }
    }

    if (Object.keys(formvalidation.current).length > 0) {
      return false;
    }
    return true;
  }

  const submitvalue = (key: string, value: string) => {
    formvalues.current[key] = value
  }

  const submitform = async () => {
    formvalidation.current = {};
    const valid = vaalidationform()
    if (!valid) {
      setrandom(new Date().getTime())
      toast({
        title: "Error",
        description: "check Again",
        variant: "destructive"
      })
      return;
    }

    try {
      const content = JSON.stringify(formvalues.current);

      await submitformbyurl(formurl, content)
      setsubmitted(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Not Submitted",
        variant: "destructive"
      })
    }

  }
  if (submitted) {
    return <div className='flex justify-center items-center w-full h-full'><div className="max-w-[620px] flex flex-col gap-2 bg-background w-full 
    border shadow-xl shadow-blue-700 rounded p-8">
      <p className='text-2xl font-bold'>Form Submitted</p>
      <p className='text-muted-foreground'>Thankyou for submitting the form,you can close the page</p>
    </div></div>
  }
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div key={randomnum} className="max-w-[620px] flex flex-col gap-6 flex-grow  bg-background w-full 
        overflow-y-auto border shadow-xl shadow-blue-700 rounded p-8">
        {
          content.map((element) => {
            const FormElement = FormElemnts[element.type].formComponent
            return (
              <FormElement
                elementinstance={element}
                key={element.id}
                submitvalue={submitvalue}
                isInvalid={formvalidation.current[element.id]}
                defaultvalue={formvalues.current[element.id]}

              />

              
            )
          })
        }
        <Button
          onClick={submitform}
          className='gap-2'
        ><HiCursorClick size={20} />Submit</Button>
      </div>

    </div>
  )
}

export default FormsubmitComponent