import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/course";
import Question from "@/models/question";

import { Quiz } from "@/models/quiz";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    // const { userId } = auth();
    const { title } = await req.json();

    const { quizId } = params;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    await connectMongoDB();
    // Find the last quiz and get its position
    const lastQuestion = await Question.findOne({ quiz: quizId })
      .sort({ position: -1 })
      .exec();

    const newPosition = lastQuestion ? lastQuestion.position + 1 : 1;
    // Create a new quiz
    const question = await Question.create({
      title,
      quiz: quizId,
      position: newPosition,
    });

    // Find the course by its ID
    const quiz = await Quiz.findOne({ _id: quizId });
    // Adding the newly created quiz to the course's quizzes array
    await quiz.questions.push(question);
    await quiz.save();

    return NextResponse.json(question);
  } catch (error) {
    console.log("[QuestionS]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
