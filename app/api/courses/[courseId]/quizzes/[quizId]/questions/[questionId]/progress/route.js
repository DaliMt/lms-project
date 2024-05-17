import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectMongoDB from "@/lib/mongodb";
import { Quiz, UserQProgress } from "@/models/quiz";
import { auth } from "@clerk/nextjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    // const { userId } = auth();
    const { isCompleted } = await req.json();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    const session = await getServerSession(authOptions);
    if (!session) redirect("/auth/dashboard");
    const userId = session?.user?._id;

    await connectMongoDB();
    // Upsert the user progress
    const userQProgress = await UserQProgress.findOneAndUpdate(
      { userId: userId, quizId: params.quizId }, // Query
      { isCompleted: isCompleted }, // Update
      { upsert: true, new: true } // Options : if no document matches the query criteria, a new document will be created with the specified update criteria.
    );

    // Find the quiz
    const quiz = await Quiz.findById(params.quizId);

    if (!quiz.userProgress.includes(userQProgress._id)) {
      quiz.userQProgress.push(userQProgress);
      await quiz.save();
    }
    // if userprogress_id !== chapter.userpreogress._id
    // update the chapter userprogress array
    // const updatedChapter = await Chapter.findOneAndUpdate(
    //     { _id: params.chapterId },
    //     { $push: { userProgress: userProgress } }, // Push userId into the userProgress array
    //     { new: true } // Return the updated document
    //   );

    return NextResponse.json(userQProgress);
  } catch (error) {
    console.log("[QUIZ_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
