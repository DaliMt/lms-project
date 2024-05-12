'use client'
import * as z from 'zod';
import axios from 'axios';
import {zodResolver} from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {From ,FormControl,FormDescription,FormField,FormLabel,FormMessage, FormItem  } from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
//   username : z.string().min(1,{
//     message : "Username is required"
//   }),
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
    role :  z.string().min(1, 'Role is required'),
})


export default function CreatePage() {
  const router =useRouter();
  const form = useForm({
    resolver : zodResolver(formSchema),
    defaultValues : {
      username: "",
      email: "",
      password: "",
      role : "",
    }
  })

  const {isSubmitting,isValid} = form.formState;

  async function onSubmit(values){
    try {

        // console.log(values)
      const res = await axios.post("/api/accounts",values)
      
    //   router.push(`/teacher/accounts/${res.data._id}`)
    console.log("acoount:::" , res.data)
      router.push(`/teacher/accounts`)
      toast.success("account created")
      router.refresh();
    } catch  {
      toast.error("Something went wrong!")
    }
  }

    const selectedOption = [
    {
      value: "student",
      label: "student",
    },
    {
      value: "teacher",
      label: "teacher",
    },
    {
      value: "admin",
      label: "admin",
    },
  ]


  return (
    <div className='max-w-5xl mx-auto bg-slate-400/30 flex md:items-center md:justify-center  h-full p-6 '>
      <div>
        <h1 className='text-2xl'>
          Create new  Account
        </h1>
        {/* <p className='text-sm text-slate-600'>
          what would you like to name this course?
        </p> */}

        <FormProvider {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' space-y-8 mt-8'
          >
            <div  className='space-y-2' >
                <FormField
                    control={form.control}
                    name="username"
                    render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>   
                            <Input
                                disabled={isSubmitting}
                                placeholder="blaaa"
                                {...field}
                            />
                        </FormControl>
                        {/* <FormDescription>
                        what will you teach in this course?
                        </FormDescription> */}
                        <FormMessage/>
                    </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>   
                            <Input
                                disabled={isSubmitting}
                                placeholder="mail@example.com"
                                {...field}
                            />
                        </FormControl>
                        {/* <FormDescription>
                        what will you teach in this course?
                        </FormDescription> */}
                        <FormMessage/>
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Password
                        </FormLabel>
                        <FormControl>   
                            <Input
                                type="password"
                                disabled={isSubmitting}
                                placeholder="Enter your password"
                                {...field}
                            />
                        </FormControl>
                        {/* <FormDescription>
                        what will you teach in this course?
                        </FormDescription> */}
                        <FormMessage/>
                    </FormItem>
                    )}
                />

          <FormField 
              
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem  >
                  <FormLabel>
                            role
                  </FormLabel>
                  <FormControl >
                    {/* <Combobox
                      options={options}
                      disabled={isSubmitting}
                      {...field}

                    /> */}
              

            
                      
                    <Select  onValueChange={field.onChange}>
                          <SelectTrigger className="w-full text-slate-500">
                            <SelectValue  placeholder={selectedOption?.label || "select user Role "} />
                          </SelectTrigger>
                      
                          <SelectContent  >
                            {
                              selectedOption.map((op) => (
                                <SelectItem value={op.value}>{op.label}</SelectItem>
                                  // label: op.name,
                                  // value: op._id,
                                ))
                            }
                          </SelectContent>

                    </Select>

                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            </div>
            <div className='flex items-center gap-x-2'>
              <Link href="/teacher/accounts">
                <Button 
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                  type="submit"
                  disabled = {!isValid || isSubmitting }
              >
                Continue
              </Button>
            </div>
          </form>
        </FormProvider>

   
      </div>
    </div>
  )
}
