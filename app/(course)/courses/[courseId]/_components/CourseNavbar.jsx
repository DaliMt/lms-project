import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarRoutes from "@/components/NavbarRoutes";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";

export default async function CourseNavbar({course,progressCount}) {
  
  const session = await getServerSession(authOptions);
  // if (!session) redirect("/auth/dashboard")
  const userId = session?.user?._id; 

  await connectMongoDB();
  
  const user = await User.findById(userId);
  
  console.log(" edited user is ::: " ,user)
  
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-white">
        <NavbarRoutes
          imageUrl={user.imageUrl}
        />
    </div>
  )
}
