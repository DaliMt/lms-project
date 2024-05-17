import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

import Banner from "@/components/Banner";
import QuizActions from "./_components/QuizActionForm";
import QuizTitleForm from "./_components/QuizTitleForm";

import Question from "@/models/question";
import QuizQuestionForm from "./_components/QuizQuestionForm";

export default async function QuizIdPage({ params }) {
  // const { userId } = auth();
  const { quizId } = params;
  // if (!userId) {
  //     return redirect("/");
  // }
  console.log("quizId :", quizId);
  await connectMongoDB();
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    console.log("quiz not found");
    return redirect("/");
  }

  // load question data
  const quest = await Question.find({ quiz }).sort({ position: 1 });

  // load attachments data

  // load chapters data

  // load quizzes data

  const requiredFields = [quiz.title, quiz.questions.length > 0];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This quiz is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex place-items-center text-sm hover:opacity-60 transition mb-6  "
            >
              <ArrowLeft className="h-4 w-4 mr-2 " />
              Back to course setup page
            </Link>
            <div className="flex items-center justify-between w-full ">
              <div className="flex flex-col gap-y-2  ">
                <h1 className="text-2xl font-medium">Quiz Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuizActions
                disabled={!isComplete}
                courseId={params.courseId}
                quizId={quizId}
                isPublished={quiz.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-16 ">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your quiz</h2>
              </div>
              <QuizTitleForm
                initialData={quiz}
                quizId={quizId}
                courseId={params.courseId}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Add Questions</h2>
              </div>
              <QuizQuestionForm
                initialData={quiz}
                quizId={quizId}
                question={quest}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
