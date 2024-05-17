import connectMongoDB from "@/lib/mongodb";
import Question from "@/models/question";
import { Quiz } from "@/models/quiz";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //     return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { list } = await req.json();
    await connectMongoDB();
    for (let item of list) {
      await Question.findByIdAndUpdate(item.id, { position: item.position });
    }

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
