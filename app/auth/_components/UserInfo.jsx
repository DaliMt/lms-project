"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


export default  function UserInfo() {

//   const { data: session } = useSession();
  const session =  useSession();

  

  console.log("sessionnn" , session )

  console.log("sessionxxx" , session )
// const session ="gjg"

  return (
    <>
    {session && (
        <>
       
        <div className="bg-sky-700 grid place-items-center h-screen">
      <div className="  shadow-lg p-8 bg-slate-100 rounded-md  flex  flex-col gap-2 my-6 ">
        <h1 className="text-xl font-medium text-red-700">Are You Sure of LoginOut ?</h1>
        <div>
          Name : <span className=" font-bold">{session?.data?.user?.username}</span>
        </div>
        <div>
          Email : <span className=" font-bold">{session?.data?.user?.email}</span>
        </div>
        {session && (
        <button  onClick={() => signOut()}  className=" bg-red-500 text-white font-bold py-2 mt-3">
          Log Out
        </button> )}
      </div>
    </div>
    </>
    )}
    </>
  );
}
