import { GetFormByid} from "@/actions/form"
import FormBuilder from "@/components/FormBuilder";
import Formlinkshare from "@/components/Formlinkshare";
import Visitbtn from "@/components/Visitbtn";
import { Button } from "@/components/ui/button";
import { StatsCard } from "../../page";
import { HiCursorClick } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import SubmitFormdetaiils from "@/components/SubmitFormdetaiils";


async function Builder({params}:{
     params:{
          id:string
     }
}){
    const {id}=params;
   

    
const form=await  GetFormByid(Number(id));
const {visits,submissions}=form;
if(!form){
     throw new Error("form not found")
 }
 let submissionRate = 0;
 if (visits > 0) {
   submissionRate = (submissions / visits) * 100;
 }
 let bounceRate = 100 - submissions;
 return(
 <>
 <div className="py-10 border-t border-b border-muted w-full px-5">
<div className="w-full flex justify-between ">
<h1 className="text-4xl font-bold truncate">{form.name}</h1>
<Visitbtn shareUrl={form.shareUrl}/>
</div>
</div>
<div className="py-4 border-b border-muted w-full">
<div className="container flex justify-between w-full">
     <Formlinkshare shareUrl={form.shareUrl}/>
</div>
</div>
<div className="w-full pt-8 gap-4 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
<StatsCard
        title="Total visits"
        value={visits.toLocaleString() || ""}
        icon={<LuView size={30} className="text-blue-600" />}
        loading={false}
        helper={"All Time Form visits"}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        value={submissions.toLocaleString() || ""}
        icon={<FaWpforms size={30} className="text-yellow-600" />}
        loading={false}
        helper={"All Time Form Submissions"}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submissions Rate"
        value={submissionRate.toLocaleString() || ""}
        icon={<HiCursorClick size={30} className="text-green-600" />}
        loading={false}
        helper={"Visits That Resut In Form Submission"}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate"
        value={bounceRate.toLocaleString() || ""}
        icon={<TbArrowBounce size={30} className="text-red-600" />}
        loading={false}
        helper={"Visits Which are not Submitted"}
        className="shadow-md shadow-red-600"
      />


</div>
<div className="container pt-10">
     <SubmitFormdetaiils id={form.id}/>
</div>
 </>)

}
export default Builder;