import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import connectMongoDB from "@/lib/mongodb";
import { Quiz } from "@/models/quiz";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

import Banner from "@/components/Banner";

import Question from "@/models/question";
import QuestionActions from "./_components/QuestionActionForm";
import QuestionTitleForm from "./_components/QuestionTitleForm";
import QuestionOptionsForm from "./_components/QuestionOptionsForm";
import QuestionCorrectAnswerForm from "./_components/QuestionCorrectAnswerForm";

export default async function QuestionIdPage({ params }) {
  // const { userId } = auth();
  const { questionId } = params;
  // if (!userId) {
  //     return redirect("/");
  // }
  console.log("questionId :", questionId);
  await connectMongoDB();
  const question = await Question.findById(questionId);

  if (!question) {
    console.log("question not found");
    return redirect("/");
  }

  const requiredFields = [
    question.title,
    question.options,
    question.correctAnswer,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!question.isPublished && (
        <Banner
          variant="warning"
          label="This quiz is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/quizzes/${params.quizId}`}
              className="flex place-items-center text-sm hover:opacity-60 transition mb-6  "
            >
              <ArrowLeft className="h-4 w-4 mr-2 " />
              Back to quiz setup page
            </Link>
            <div className="flex items-center justify-between w-full ">
              <div className="flex flex-col gap-y-2  ">
                <h1 className="text-2xl font-medium">Question Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <QuestionActions
                disabled={!isComplete}
                courseId={params.courseId}
                quizId={params.quizId}
                questionId={questionId}
                isPublished={question.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-16 ">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your question</h2>
              </div>
              <QuestionTitleForm
                initialData={question}
                questionId={questionId}
                quizId={params.quizId}
                courseId={params.courseId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2 mt-6">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Enter Correct Answer Number</h2>
              </div>
              <QuestionCorrectAnswerForm
                initialData={question}
                questionId={questionId}
                quizId={params.quizId}
                courseId={params.courseId}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Add Options</h2>
              </div>
              <QuestionOptionsForm
                initialData={question}
                questionId={questionId}
                quizId={params.quizId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
