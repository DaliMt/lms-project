import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/course";

import { Quiz } from "@/models/quiz";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    // const { userId } = auth();
    const { title } = await req.json();

    const { courseId } = params;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    await connectMongoDB();
    // Find the last quiz and get its position
    const lastQuiz = await Quiz.findOne({ course: courseId })
      .sort({ position: -1 })
      .exec();

    const newPosition = lastQuiz ? lastQuiz.position + 1 : 1;
    // Create a new quiz
    const quiz = await Quiz.create({
      title,
      course: courseId,
      position: newPosition,
    });

    // Find the course by its ID
    const course = await Course.findOne({ _id: courseId });
    // Adding the newly created quiz to the course's quizzes array
    await course.quizzes.push(quiz);
    await course.save();

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZZES]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
