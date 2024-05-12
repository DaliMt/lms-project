// 'use client'

import connectMongoDB from '@/lib/mongodb';
import EditAccountForm from './_components/EditAccountForm';
import { User } from '@/models/user';
import ImageForm from './_components/ImageForm';



export default async function AccountPage({params}) {
 



 
  await connectMongoDB();
  
  const user = await User.findById(params.accountId);
  
  console.log(" edited user is ::: " ,user)


  return (
   <>
      {/* <ImageForm
          userdata ={user}
          accountId={params.accountId}
      /> */}
      <EditAccountForm
          userdata ={user}
          accountId={params.accountId}
      
      />
    </>
    
  )
}
