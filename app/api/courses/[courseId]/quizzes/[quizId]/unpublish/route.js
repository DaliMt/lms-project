import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import Course from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();

    const unpublishedQuiz = await Quiz.findByIdAndUpdate(params.quizId, {
      isPublished: false,
    });

    // seeing all course quizs which are publiched
    const publishedQuizzesInCourse = await Quiz.find({
      course: params.courseId,
      isPublished: true,
    });

    // Check if there are no published quizs in the course
    if (!publishedQuizzesInCourse.length) {
      // Update the course to mark it as unpublished
      await Course.findByIdAndUpdate(params.quizId, { isPublished: false });
    }

    return NextResponse.json(unpublishedQuiz);
  } catch (error) {
    console.log("[QUIZ_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
