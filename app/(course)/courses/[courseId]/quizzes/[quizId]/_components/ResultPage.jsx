"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const totalQuestions = searchParams.get("totalQuestions");

  return (
    <div className="text-center text-black">
      <h1 className="font-bold text-24px">Quiz Complete!</h1>
      <p className="p-8 font-bold text-20px">
        Your Score: {score} / {totalQuestions}
      </p>
      <p className="text-[#9F50AC] font-bold text-14px">
        Well done! You have completed the quiz.
      </p>
    </div>
  );
};

export default ResultPage;
