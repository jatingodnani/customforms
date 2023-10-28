import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from "react-icons/md"
function PreviewButton() {
  return (
    <Button variant={"outine"}  className="gap-2" ><MdPreview size={20}/>Preview</Button>
  )
}

export default PreviewButton
