import { GetFormByid} from "@/actions/form"
import FormBuilder from "@/components/FormBuilder";


async function Builder({params}:{
     params:{
          id:string
     }
}){
    const {id}=params;
    console.log(id)
    
const builderform=await  GetFormByid(Number(id));

if(!builderform){
     throw new Error("form not found")
 }
 return <FormBuilder form={builderform} />

}
export default Builder;