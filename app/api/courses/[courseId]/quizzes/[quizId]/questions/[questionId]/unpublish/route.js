import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import Course from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Question from "@/models/question";

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();

    const unpublishedQuestion = await Question.findByIdAndUpdate(
      params.questionId,
      {
        isPublished: false,
      }
    );

    // seeing all course quizzes which are publiched
    const publishedQuestionsInQuiz = await Question.find({
      quiz: params.quizId,
      isPublished: true,
    });

    // Check if there are no published quizs in the course
    if (!publishedQuestionsInQuestion.length) {
      // Update the course to mark it as unpublished
      await Quiz.findByIdAndUpdate(params.questionId, { isPublished: false });
    }

    return NextResponse.json(unpublishedQuestion);
  } catch (error) {
    console.log("[Question_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
