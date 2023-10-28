"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Textarea } from "@/components/ui/textarea"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  
import {ImSpinner2} from "react-icons/im"
import {BsFileEarmarkPlus} from "react-icons/bs"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { useForm } from "react-hook-form"
import { formSchema,formSchemaType } from "@/schemas/form"
import {CreateForm} from "@/actions/form"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {useRouter} from "next/navigation"
function CreateformButton() {
  const { toast } = useToast()
  const router=useRouter()
  const form=useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  });
  async function onSubmit(values: formSchemaType) {
    console.log("hoo")
    
  try{
   const formid=await  CreateForm(values)
   toast({
    
    title: `Successfully Created`, 

  })
  console.log(formid)
  router.push(`/builder/${formid}`)
  }catch{
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.You cant add same name",
     
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }
}
  
  
  return (
    <Dialog>
          <DialogTrigger asChild>
        <Button
        variant={"outline"} className="group border border-primary/20 h-[200px] flex flex-col items-center justify-center border-dashed hover:border-primary hover:cursor-pointer gap-3">
         <BsFileEarmarkPlus className="text-muted-forground group-hover:text-primary" size={30}/>
          <p className="text-2xl font-bold text-muted-foreground group-hover:text-primary">Create New Form</p>
          </Button>
      </DialogTrigger>
      <DialogContent>
     <DialogHeader>
        <DialogTitle>Create Form  </DialogTitle>
        <DialogDescription>Create a Form to Start Collectiong Responses</DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name" {...field} />
              </FormControl>
             
            </FormItem>
          )}
        />
      
    
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea row={5}  placeholder="Description about form" {...field} />
              </FormControl>
             
            </FormItem>
          )}
        />
     
      </form>
      <Button 
      onClick={
        form.handleSubmit(onSubmit)
      }
      disabled={form.formState.isSubmitting} type="submit">{
        !form.formState.isSubmitting?<span>Save</span>:<ImSpinner2 className="animate-spin"/>
}</Button>
    </Form>
        </DialogContent>
        </Dialog>

  )
}

export default CreateformButton