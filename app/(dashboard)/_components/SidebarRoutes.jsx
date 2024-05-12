'use client'

import { BarChart, CircleUserRound, Compass, Layout, List, Settings } from "lucide-react"
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";





export default function SidebarRoutes() {
  
  const pathname = usePathname();
  
  const session =  useSession();
  if (!session) redirect("/auth/dashboard")
  const userId = session?.data?.user?._id; 
 
  const guestRoutes = [
    {
       icon : Layout,
       label : "Dashboard",
       href : "/",
    },
    {
       icon : Compass,
       label : "Browse",
       href : "/search",
    },
    {
      icon : Settings ,
      label : "LogOut",
      href : `/auth`,
  },
];



const adminRoutes = [
  {
    icon : List,
    label : "Courses",
    href : "/admin/courses",
},
{
  icon : BarChart,
  label : "Analytics",
  href : "/admin/analytics",
},
{
    icon : CircleUserRound ,
    label : "Accounts",
    href : "/admin/accounts",
},
{
    icon : Settings ,
    label : "Setting",
    href : `/admin/accounts/${userId}`,
},
{
  icon : Settings ,
  label : "LogOut",
  href : `/auth`,
},
]
  const teacherRoutes = [
    {
        icon : List,
        label : "Courses",
        href : "/teacher/courses",
    },
    {
      icon : BarChart,
      label : "Analytics",
      href : "/teacher/analytics",
    },
    // {
    //     icon : CircleUserRound ,
    //     label : "Accounts",
    //     href : "/teacher/accounts",
    // },
    {
        icon : Settings ,
        label : "Setting",
        href : `/teacher/accounts/${userId}`,
    },
    {
        icon : Settings ,
        label : "LogOut",
        href : `/auth`,
    },
  
  ]

  console.log("sessionnn" , session )

  const isTeacherPage= pathname?.includes("/teacher");

  const isAdminPage= pathname?.includes("/admin");
  
  // const routes = isTeacherPage ? teacherRoutes : guestRoutes ;
  const routes = isAdminPage ? adminRoutes : isTeacherPage ? teacherRoutes : guestRoutes ;

  return (
    <div className='flex flex-col w-full'>
        {routes.map(route=>(
            <SidebarItem
               key={route.href}         
               icon={route.icon}
               label={route.label}
               href={route.href}    
            />
        ))}
    </div>
  )
}
