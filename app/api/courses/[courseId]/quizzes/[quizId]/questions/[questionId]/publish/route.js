import connectMongoDB from "@/lib/mongodb";
import Question from "@/models/question";
import Quiz from "@/models/quiz";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const question = await Question.findById(params.questionId);

    if (
      !question ||
      !question.title ||
      !question.options ||
      !question.correctAnswer
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedQuestion = await Question.findByIdAndUpdate(
      params.uestionId,
      {
        isPublished: true,
      }
    );

    return NextResponse.json(publishedQuestion);
  } catch (error) {
    console.log("[Question_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
