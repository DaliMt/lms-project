import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function UserButton({imageUrl}) {
    const session =  useSession();
    console.log("image session::",session)
    const userId = session?.data?.user?._id
  return (
    // <div className="relative m-8 h-3 w-3 rounded-full overflow-hidden ">
            //   <Image
            //     alt="Upload"
            //     fill
            //     className="absolute inset-0 w-full h-full object-cover"
            //     src={imageUrl}
            //   />
    // </div>
    <Link href= {`/${session?.data?.user?.role}/accounts/${userId}`}>
        <div className="relative  h-10 w-10 rounded-full overflow-hidden">
                <Image
                    alt="Upload"
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                    src={imageUrl}
                />
        </div>
    </Link>
  )
}
