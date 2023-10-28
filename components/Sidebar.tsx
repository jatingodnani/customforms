import React from 'react'
import { FormElemnts } from './Formelement'
import SidebarbtnElement from './SidebarbtnElement'

function Sidebar() {
  return (
    <div className="h-full w-[400px]  max-w-[400px]  flex flex-col
     flex-grow gap-2 border-l-2 p-4 bg-background overflow-y-auto">
      sideba5r
      <SidebarbtnElement formelement={FormElemnts.TextField}/>
    </div>
  )
}

export default Sidebar
