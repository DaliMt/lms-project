import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const quiz = await Quiz.findById(params.quizId);

    if (!quiz || !quiz.title || !quiz.questions) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedQuiz = await Quiz.findByIdAndUpdate(params.quizId, {
      isPublished: true,
    });

    return NextResponse.json(publishedQuiz);
  } catch (error) {
    console.log("[QUIZ_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
