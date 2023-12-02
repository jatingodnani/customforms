"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function Visitbtn({shareUrl}:{shareUrl:string}){
  const [mounted,setmounted]=useState<boolean>(false)
  useEffect(()=>{
setmounted(true)
  },[])
if(!mounted){
  return null
}
  const shareLink=`${window.location.origin}/submit/${shareUrl}`;
  return (
<Button className="w-[200px] font-bold" onClick={()=>{
  window.open(shareLink,"_blank");
}}>Visit</Button>
  )
}

export default Visitbtn