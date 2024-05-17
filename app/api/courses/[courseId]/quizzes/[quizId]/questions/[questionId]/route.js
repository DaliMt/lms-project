import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import Question from "@/models/question";

// delete quiz data

export async function DELETE(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const question = await Question.findById(params.questionId);
    if (!question) {
      return new NextResponse("Not Found", { status: 404 });
    }
    // if (quiz.videoUrl){
    //    // Find existing MuxData document based on chapterId
    //    const existingMuxData = await MuxData.findOne({ chapterId: params.chapterId });

    //    // If existing MuxData document exists, delete its asset
    //    if (existingMuxData) {
    //        await mux.video.assets.delete(existingMuxData.assetId);
    //        console.log('Mux asset deleted successfully');

    //        // Delete the existing MuxData document
    //        await MuxData.findByIdAndDelete(existingMuxData._id);
    //        console.log('Existing MuxData document deleted successfully');
    //    }
    // }

    //deleting the quiz from databse
    const deletedQuestion = await Question.findByIdAndDelete(params.questionId);

    // Remove chapter ID from the quizzes array in the Course model
    await Quiz.findByIdAndUpdate(params.quizId, {
      $pull: { questions: params.questionId },
    });

    // seeing all course quizzes which are publiched
    const publishedQuestionsInQuiz = await Question.find({
      quiz: params.quizId,
      isPublished: true,
    });
    console.log(publishedQuestionsInQuiz);
    console.log(publishedQuestionsInQuiz.length);

    // Check if there are no published chapters in the course
    if (!publishedQuestionsInQuiz.length) {
      // Update the course to mark it as unpublished
      await Quiz.findByIdAndUpdate(params.quizId, { isPublished: false });
    }

    return NextResponse.json(deletedQuestion);
  } catch (error) {
    console.log("[Question_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// update the quiz data

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    const { questionId } = params;
    const values = await req.json();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const question = await Question.findByIdAndUpdate(questionId, {
      ...values,
    });

    return NextResponse.json(question);
  } catch (error) {
    console.log("[Question_Quiz_ID]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
