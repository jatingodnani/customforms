
"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImShare } from "react-icons/im";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";


function Formlinkshare({shareUrl}:{shareUrl:string}){
  const [mounted,setmounted]=useState<boolean>(false)
  useEffect(()=>{
setmounted(true)
  },[])
if(!mounted){
  return null
}
  const shareLink=`${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-6 items-center"> 
    <Input readOnly value={shareLink}/>
    <Button className="w-[250px] font-bold gap-2" onClick={()=>{
        navigator.clipboard.writeText(shareLink)
        toast({
            title:"Link Copied",
            description:"Link Copied to Clipboard",
           
            duration:3000,
          
            
        })
    }} >
    <ImShare className="h-4 w-4" />
        Share Link
        </Button>
    </div>

  )
}

export default Formlinkshare