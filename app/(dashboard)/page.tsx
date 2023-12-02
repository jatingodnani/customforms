import { GetFormStats, Getforms } from "@/actions/form";
import { Skeleton } from "@/components/ui/skeleton";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt} from "react-icons/bi"
import { FaWpforms } from "react-icons/fa";
import { Form } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { HiCursorClick } from "react-icons/hi";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import {FaEdit} from "react-icons/fa"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateformButton from "@/components/CreateformButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-4" />
      <h2 className="font-bold text-4xl col-span-2">Your Forms</h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateformButton />
        <Suspense>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}
interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
export function StatsCards(props: StatsCardProps) {
  const { loading, data } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        value={data?.visits.toLocaleString() || ""}
        icon={<LuView size={30} className="text-blue-600" />}
        loading={loading}
        helper={"All Time Form visits"}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        value={data?.submissions.toLocaleString() || ""}
        icon={<FaWpforms size={30} className="text-yellow-600" />}
        loading={loading}
        helper={"All Time Form Submissions"}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submissions Rate"
        value={data?.submissionRate.toLocaleString() || ""}
        icon={<HiCursorClick size={30} className="text-green-600" />}
        loading={loading}
        helper={"Visits That Resut In Form Submission"}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate"
        value={data?.bounceRate.toLocaleString() || ""}
        icon={<TbArrowBounce size={30} className="text-red-600" />}
        loading={loading}
        helper={"Visits Which are not Submitted"}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

export function StatsCard({
  loading,
  title,
  value,
  icon,
  helper,
  className,
}: {
  loading: boolean;
  title: string;
  value: string;
  icon: ReactNode;
  helper: string;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex  justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="font-bold text-2xl">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs pt-4 text-muted-foreground ">{helper}</p>
      </CardContent>
    </Card>
  );
}

async function FormCards() {
  const forms = await Getforms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="flex item-center justify-between">
          <span className="font-bold h-[30px] truncate">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant={"destructive"}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {
            form.published && (<span className="flex item-center gap-2 my-2 w-full">
              <LuView size={20}/>
              <span>{form.visits}</span>
              <FaWpforms size={20}/>
              <span>{form.submissions}</span>
              </span>)
          }
        </CardDescription>
        <CardContent  className="h-[20px] p-0 text-sm text-muted-foreground ">
       {form.description ? form.description :<span>No Description</span>}
        </CardContent>
        <CardFooter className="py-4 w-full">
          {form.published && (
<Button variant="secondary" className="w-full py-2 gap-4" asChild>
  <Link href={`/forms/${form?.id}`}>View Submissions<BiRightArrowAlt size={30}/></Link>
</Button>
            )}
                   {!form.published && (
<Button  variant="secondary" className="w-full text-md gap-4 py-2" asChild>
  <Link href={`/builder/${form?.id}`}>Edit Form<FaEdit size={20} /></Link>
</Button>
            )}
          </CardFooter>
      </CardHeader>

    </Card>
  );
  }

