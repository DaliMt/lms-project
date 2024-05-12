// import LoginForm from '@/components/(auth app)/LoginForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'

import LoginForm from "./_components/LoginForm";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function auth() {


  const session = await getServerSession(authOptions);
  console.log("server sessionv :: " , session)
  if (session) redirect("/auth/dashboard")
    
  return (
    <main>
        <LoginForm/>
        
    </main>
  )
}
