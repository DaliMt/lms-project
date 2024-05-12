// import { GetAnalytics } from '@/actions/GetAnalytics';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import DataCard from './_components/DataCard';
import Chart from './_components/Chart';
import  GetAllAnalytics  from '@/actions/GetAllAnalytics';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function AnalyticsPage() {
  
  // const { userId } = auth();
  //   if (!userId) {
  //       return redirect('/');
  //   }
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/dashboard")
  const userId = session?.user?._id; 
console.log("data session from analytic page :: ",session)
console.log("data session from analytic page :: ",userId)

    const {
      data,
      totalRevenue,
      totalSales,
      totalChapters,
      totalAttachments,
  } = await GetAllAnalytics(userId);

  console.log("analitic data ::: ",totalRevenue,totalSales,data )

  return (
    <div className='p-6'>
      <div className='grid grid-cols-2 gap-4 mb-4' >
      <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
      />
      <DataCard 
          label="Total Sales"
          value={totalSales}
          shouldFormat={false}
      />
      <DataCard 
          label="Total Published Chapters"
          value={totalChapters}
          shouldFormat={false}
      />
      <DataCard 
          
          label="Total Publiched Attachments"
          value={totalAttachments}
          shouldFormat={false}
      />
      </div>
      <Chart
          data={data}
      />

    </div>
  )
}
