// import { GetChapter } from "@/actions/GetChapter";
import Banner from "@/components/Banner";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import { Separator } from "@/components/ui/separator";
// import Preview from "@/components/Preview";
// import { File } from "lucide-react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { GetQuiz } from "@/actions/GetQuiz";
import Quiz from "./_components/Quiz";

// import { useState } from "react";

export default async function QuizIdPage({ params }) {
  // const { userId } = auth();
  // if (!userId) {
  //   return redirect("/");
  // }
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/dashboard");
  const userId = session?.user?._id;

  const { quiz, course, nextQuiz, questions, userQProgress, purchase } =
    await GetQuiz({
      userId,
      quizId: params.quizId,
      courseId: params.courseId,
    });

  // remove !quiz
  if (!course) {
    return redirect("/");
  }

  const isLocked = !purchase;

  // set completeOnEnd to true if the user has purchased the course and has not completed the chapter yet. Otherwise, it will be set to false.
  // const completeOnEnd = !!purchase && !userQProgress?.isCompleted;

  // const [score, setScore] = useState(0);
  const TOTAL_QUESTIONS = 10;

  return (
    <div>
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to take this quiz."
        />
      )}
      <Quiz
        questions={questions}
        isLocked={isLocked}
        quizId={params.quizId}
        nextQuizId={nextQuiz?._id}
        courseId={params.courseId}
        isCompleted={quiz.userQProgress?.isCompleted}
      />
    </div>
  );
}
