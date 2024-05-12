"use client"
import * as z from "zod";
import axios from "axios";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import Image from "next/image";








export default function ImageForm({userdata,accountId }) {
    
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();


  async function onSubmit(values){
    
    try {
      console.log(values);

      await axios.patch(`/api/accounts/${accountId}`, values)
      toast.success("Account image updated");
      setIsEditing((e)=>!e)
      router.refresh();
    } catch  {
      toast.error("something was wrong !");
    }
  }



    return (
    <div className="mt-6 border  bg-slate-100 rounded-md p-4">
      <div className="font-medium flex mb-6  justify-between items-center">
          Account image
          <Button onClick={()=>setIsEditing((e)=>!e)} variant="ghost">
            {isEditing && (
              <>
                Cancel
              </>
            )}

            {!isEditing && !userdata.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
            )}

            {!isEditing && userdata.imageUrl && (
              <>
                 <Pencil className="h-4 w-4 mr-2"/>
                 Edit image
              </>
            )}


          </Button>
      </div>
      {!isEditing &&(
          !userdata.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative m-8 h-60 w-60 rounded-full overflow-hidden ">
              <Image
                alt="Upload"
                fill
                className="absolute inset-0 w-full h-full object-cover"
                src={userdata.imageUrl}
              />
            </div>
          )
      )}
      {isEditing &&(
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url)=>{
              if(url){
                onSubmit({imageUrl:url})
              }
            }}

          />
          <div className="text-xs text-muted-foreground mt-6   ">
              16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}
