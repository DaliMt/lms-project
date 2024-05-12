import connectMongoDB from "@/lib/mongodb";
import {User} from "@/models/user";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    // const { userId } = auth();
    // const { title } = await request.json();
    const values = await req.json();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    await connectMongoDB();
    const user = await User.create({...values});
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
