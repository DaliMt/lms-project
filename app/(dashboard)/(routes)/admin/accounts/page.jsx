import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/Columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Course from '@/models/course'
import {User} from '@/models/user'


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, UserCheck, UserRoundCog, UsersRound } from 'lucide-react'



export default async function CoursesPage() {
  // const {userId} = auth();
  // if(!userId){
  //   return redirect("/")
  // }
  // const courses = await Course.find({userId: userId}).sort({ createdAt: -1 });
  const users = await User.find().sort({ createdAt: -1 });

  return (
    <div className='p-6'>
      {/* <Link href="/teacher/create">
        <Button >
          New course
        </Button>
      </Link> */}
      <div className='grid grid-cols-4 gap-4 mb-4' >
        {/* total users */}
        <Card className="bg-sky-700">
            <div className='flex items-center justify-between'>
        <div>
        <CardHeader className=" flex flex-row  items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-md text-slate-100 font-normal">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  text-slate-100 font-bold ">
              
                <>
                    {users.length} 
                </>
            
            </div>
          </CardContent>
        </div>
    
          <div className='text-xl m-6 text-slate-100'>
            <UsersRound
            size="60px "
            strokeWidth={1.25}/>
          </div>
          </div>
        </Card>
        {/* total admins */}
        <Card className="bg-sky-700">
            <div className='flex items-center justify-between'>
        <div>
        <CardHeader className=" flex flex-row  items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-md text-slate-100 font-normal">Total Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  text-slate-100 font-bold ">
              
                <>
                    {users.filter(user => user.role === 'admin').length} 
                </>
            
            </div>
          </CardContent>
        </div>
    
          <div className='text-xl m-6 text-slate-100'>
            <UserRoundCog
            size="60px "
            strokeWidth={1.25}/>
            {/* <UserCheck
            size="60px "
            strokeWidth={1.25}/> */}
          </div>
          </div>
        </Card>
        {/* total techers  */}
        <Card className="bg-sky-700">
            <div className='flex items-center justify-between'>
        <div>
        <CardHeader className=" flex flex-row  items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-md text-slate-100 font-normal">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  text-slate-100 font-bold ">
              
                <>
                    {users.filter(user => user.role === 'teacher').length} 
                </>
            
            </div>
          </CardContent>
        </div>
    
          <div className='text-xl m-6 text-slate-100'>
            <UserCheck
            size="60px "
            strokeWidth={1.25}/>
          </div>
          </div>
        </Card>
        {/* total students */}
        <Card className="bg-sky-700">
            <div className='flex items-center justify-between'>
        <div>
        <CardHeader className=" flex flex-row  items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-md text-slate-100 font-normal">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  text-slate-100 font-bold ">
              
                <>
                    {users.filter(user => user.role === 'student').length} 
                </>
            
            </div>
          </CardContent>
        </div>
    
          <div className='text-xl m-6 text-slate-100'>
            <GraduationCap
            size="60px "
            strokeWidth={1.25}/>
          </div>
          </div>
        </Card>

       
    </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
