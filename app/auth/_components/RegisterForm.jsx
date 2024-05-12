'use client'

import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm() {

    const [username,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [role,setRole] = useState("")
    const [error,setError] = useState("")

    async function handleSubmit(e){
        e.preventDefault();

        if(!username || !password || !email || !role ){
            setError("All fields are necessary. ")
            
        }else{
            setError("")
        }

        try {

           
         const values = { username, email, password , role }  ; 

        //    const res = await fetch('../api/register',{
        //         method : "POST", 
        //         headers : {
        //             "Content-Type": "application/json"
        //         },
        //         body : JSON.stringify({name,email,password}) 
        //     })
        const res = await axios.post("/api/register", values);

        // if (res.ok) {
        //         const form = e.target;
        //         form.reset();
        //     } else {
        //         console.log("user registration failed !");
            // }

            if (res.status === 200) {
                const form = e.target;
                form.reset();
                
             }
             
            // return redirect("auth")
        } catch (error) {
            console.log("error during registration",error)
        }

    }
  return (
    <div className="grid place-items-center h-screen ">
    <div className=" shadow-lg rounded-lg p-5 border-t-4 border-green-500">
      <h1 className=" text-xl font-bold my-4">Register </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3" >
          <input className="w-[400px] border border-gray-200 py-2 px-6
         bg-zinc-100/40" onChange={e=>setName(e.target.value)}  type="text" placeholder="Full Name" />
          <input className='w-[400px] border border-gray-200 py-2 px-6
        bg-zinc-100/40' onChange={e=>setEmail(e.target.value)}   type="text" placeholder="email" />
          <input className='w-[400px] border border-gray-200 py-2 px-6
        bg-zinc-100/40' onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" />
         <select
          className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          onChange={e => setRole(e.target.value)}
         >
          <option value="">Select Role</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
          <button type='submit' className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>
          
          { error && (
          <div className=" bg-red-500 text-white text-sm w-fit py-1 px-3 rounded-md mt-2">
              {error}
          </div>
          )}
          
          <Link className=' text-sm mt-3 text-right ' href={"/auth"}>
              Already have an account? 
              <span className=' px-1 underline '>Login</span>
          </Link>
      </form>
    </div>
  </div>
  )
}
