import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/course";
import { auth } from "@clerk/nextjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    // const { userId } = auth();
    const { title } = await request.json();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const session = await getServerSession(authOptions);
    // if (!session) redirect("/auth/dashboard")
    const userId = session?.user?._id; 
    console.log("create course route userId:::",userId)
    console.log("create course route userId:::",session)
    await connectMongoDB();
    const course = await Course.create({ userId, title });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
