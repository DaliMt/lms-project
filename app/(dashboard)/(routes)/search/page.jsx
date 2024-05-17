import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";
import Categories from "./_components/Categories";
import { GetCourses } from "@/actions/GetCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Difficulties from "./_components/Difficulties";

export default async function SearchPage({ searchParams }) {
  // const {userId}=auth();
  // if(!userId){
  //   return redirect("/");
  // }

  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/dashboard");
  const userId = session?.user?._id;

  await connectMongoDB();
  const categories = await Category.find().sort({ name: 1 });

  console.log(categories);

  const courses = await GetCourses({ userId, ...searchParams });
  console.log("seach course page :::", courses);

  return (
    <div className="p-6 space-y-4">
      <Categories items={categories} />
      <Difficulties />
      <CoursesList items={courses} />
    </div>
  );
}
