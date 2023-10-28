"use client"

function Error({error}:{error:Error}) {
 
  return (
    <div className="flex w-full h-full items-center justify-center ">
      <h2 className="text-destcructive" >Something Went WRONG!! Sorry </h2>
    </div>
  )
}

export default Error
