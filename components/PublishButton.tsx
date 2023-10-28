import React from 'react'
import { Button } from './ui/button'
import {MdOutlinePublish} from "react-icons/md"
function PublishButton() {
  return (
    <Button variant={"outine"}   className="flex text-white bg-gradient-to-r 
    from-indigo-400 to-cyan-400 gap-2"><MdOutlinePublish size={20}/>Publish</Button>
  )
}

export default PublishButton
