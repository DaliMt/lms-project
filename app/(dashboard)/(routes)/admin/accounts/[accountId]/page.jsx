// 'use client'

import connectMongoDB from '@/lib/mongodb';
// import EditAccountForm from './_components/EditAccountForm';
import { User } from '@/models/user';
import ImageForm from './_components/ImageForm';
import EditAccountForm from './_components/EditAccountForm';



export default async function AccountPage({params}) {
 



 
  await connectMongoDB();
  
  const Edituser = await User.findById(params.accountId);
  
  console.log(" edited user is ::: " ,Edituser)


  return (
   <>
      {/* <ImageForm
          userdata ={user}
          accountId={params.accountId}
      /> */}
      <EditAccountForm
          userdata ={Edituser}
          accountId={params.accountId}
      
      />
    </>
    
  )
}
