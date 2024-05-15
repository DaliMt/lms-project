import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import NavbarRoutes from '@/components/NavbarRoutes'
import connectMongoDB from '@/lib/mongodb';
import { User } from '@/models/user';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Navbar() {

  const session = await getServerSession(authOptions);
  // if (!session) redirect("/auth/dashboard")
  const userId = session?.user?._id; 

  await connectMongoDB();
  
  const user = await User.findById(userId);
  
  console.log(" edited user is ::: " ,user)


  return (
    <div className='p-4 border-b h-full bg-white flex items-center shadow-sm '>
        <NavbarRoutes
          imageUrl={user.imageUrl}
        />
    </div>
  )
}
