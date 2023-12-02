import {ImSpinner2 } from "react-icons/im"

async function Loading(){
    return <div className="flex w-full h-full items-center justify-center">
        <ImSpinner2 className="animate-spin" size={50}/>
    </div>
}

export default Loading