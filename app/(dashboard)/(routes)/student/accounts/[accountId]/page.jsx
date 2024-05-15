// 'use client'

import connectMongoDB from '@/lib/mongodb';
// import EditAccountForm from './_components/EditAccountForm';
import { User } from '@/models/user';
import EditAccountForm from '../../../teacher/accounts/[accountId]/_components/EditAccountForm';




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
