"use client"

// import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import SearchInput from './SearchInput';

import teacher from '@/lib/teacher';
import { admin } from '@/lib/teacher';
import UserButton from './UserButton';


export default function NavbarRoutes({imageUrl}) {
    
    const session =  useSession();
    const userId = session?.data?.user?._id
    const role = session?.data?.user?.role
    console.log("useridddd",userId)
    console.log("useridddd",session?.data?.user?.imageUrl)
    // const {userId}=useAuth();
    

    const pathname = usePathname();
    

    const isAdminPage = pathname?.startsWith("/admin");
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage =pathname === "/search";

  return (
    <>
    {isSearchPage &&(
        <div className='block'>
            <SearchInput/>
        </div>
    )}
    {!isSearchPage &&(
        <div>
            <h1 className='ml-4 text-xl'>Hello, <span className='font-bold'>{session?.data?.user?.username}</span></h1>
        </div>
    )}
        <div className=' flex gap-x-2 ml-auto '>
            {isTeacherPage || isCoursePage || isAdminPage ? (
                <Link href="/">
                    <Button size="sm" variant="destructive">
                        <LogOut className='h-4 w-4 mr-2'/>
                        Exit
                    </Button>
                </Link>
            ) : role === "teacher" ? (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="sucesss">
                        Teacher mode
                    </Button>
                </Link>
            ) :  role === "admin" ? (
                <Link href="/admin/accounts">
                    <Button  size="sm" variant="success">
                        Admin mode
                    </Button>
                </Link>
            ) : null}
            <UserButton
                imageUrl={imageUrl}
            />
            {/* <UserButton
                afterSignOutUrl='/'
            /> */}
        </div>
    </>
  )
}
