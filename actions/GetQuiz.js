import connectMongoDB from "@/lib/mongodb";
import Attachment from "@/models/attachment";
import { Quiz, UserQProgress } from "@/models/quiz";
import Course from "@/models/course";
import { Purchase } from "@/models/purchase";
import Question from "@/models/question";

export async function GetQuiz({ userId, courseId, quizId }) {
  try {
    await connectMongoDB();

    // Find the course to check if it's published and get its price
    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    }).select("price");
    // Find the chapter by its ID and check if it's published
    const quiz = await Quiz.findOne({
      _id: quizId,
      isPublished: true,
    }).populate({
      path: "questions",
      model: "Question",
    });

    // If chapter or course not found, throw an error
    if (!quiz || !course) {
      throw new Error("quiz or course not found");
    }

    let nextQuiz = null;

    // Check if the user has purchased the course
    const purchase = await Purchase.findOne({ userId, courseId });

    // If the chapter is free or the user has purchased the course
    if (purchase) {
      // Find muxData associated with the chapter

      // Find the next chapter after the current chapter
      nextQuiz = await Quiz.findOne({
        course: courseId,
        isPublished: true,
        position: { $gt: quiz.position },
      }).sort({ position: 1 });
    }
    let questions = await Question.find({ quiz: quizId });

    // Find user progress for the chapter
    // const UserQProgress = await UserQProgress.findOne({ userId, quizId });

    // Return the retrieved data
    return {
      quiz,
      course,
      nextQuiz,
      questions,
      // UserQProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GET_QUIZ]", error);
    return {
      quiz: null,
      course: null,
      nextQuiz: null,

      // UserQProgress: null,
      purchase: null,
    };
  }
}
