import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import { NextResponse } from "next/server";
import Course from "@/models/course";

// delete quiz data

export async function DELETE(req, { params }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const quiz = await Quiz.findById(params.quizId);
    if (!quiz) {
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
    const deletedQuiz = await Quiz.findByIdAndDelete(params.quizId);

    // Remove chapter ID from the quizzes array in the Course model
    await Course.findByIdAndUpdate(params.courseId, {
      $pull: { quizzes: params.quizId },
    });

    // seeing all course quizzes which are publiched
    const publishedQuizzesInCourse = await Quiz.find({
      course: params.courseId,
      isPublished: true,
    });
    console.log(publishedQuizzesInCourse);
    console.log(publishedQuizzesInCourse.length);

    // Check if there are no published chapters in the course
    if (!publishedQuizzesInCourse.length) {
      // Update the course to mark it as unpublished
      await Course.findByIdAndUpdate(params.courseId, { isPublished: false });
    }

    return NextResponse.json(deletedQuiz);
  } catch (error) {
    console.log("[Quiz_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// update the quiz data

export async function PATCH(req, { params }) {
  try {
    // const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectMongoDB();
    const quiz = await Quiz.findByIdAndUpdate(params.quizId, {
      ...values,
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[QUIZ_CHAPTER_ID]", error);
    return new NextResponse("Internal error ", { status: 500 });
  }
}
