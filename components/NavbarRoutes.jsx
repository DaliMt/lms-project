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


export default function NavbarRoutes() {
    
    const session =  useSession();
    const userId = session?.data?.user?._id
    const role = session?.data?.user?.role
    console.log("useridddd",userId)
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
        <div className=' flex gap-x-2 ml-auto '>
            {isTeacherPage || isCoursePage || isAdminPage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className='h-4 w-4 mr-2'/>
                        Exit
                    </Button>
                </Link>
            ) : role === "teacher" ? (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            ) :  role === "admin" ? (
                <Link href="/admin/accounts">
                    <Button size="sm" variant="ghost">
                        Admin mode
                    </Button>
                </Link>
            ) : null}

            {/* <UserButton
                afterSignOutUrl='/'
            /> */}
        </div>
    </>
  )
}
