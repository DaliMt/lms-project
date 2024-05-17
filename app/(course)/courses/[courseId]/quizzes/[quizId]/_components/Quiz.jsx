"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import QuestionCard from "./QuestionCard";
import Button from "./Button";
import { Lock } from "lucide-react";
import { useConfettiStore } from "@/hooks/UseConfettiStore";
import toast from "react-hot-toast";
import axios from "axios";
// Components

const Quiz = ({
  questions,
  isLocked,
  quizId,
  courseId,
  nextQuizId,
  isCompleted,
}) => {
  const totalQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [lastComplete, setLastComplete] = useState(false);

  const isQuestionAnswered = userAnswers[currentQuestionIndex] !== undefined;

  const router = useRouter();
  const confetti = useConfettiStore();

  const handleOnAnswerClick = (answer) => {
    // If user has already answered, do nothing
    if (isQuestionAnswered) return;
    // Check answer against correct answer
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log("answerrrrrr", answer);
    console.log("corrrect answerrrrrr", correctAnswer);
    const isCorrect = correctAnswer === answer;
    // Add score if answer is correct
    if (isCorrect) setScore((prev) => prev + 1);
    // Save the answer in the object for user answers
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleChangeQuestion = (step) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
    setCurrentQuestionIndex(newQuestionIndex);
  };

  const handleQuizEnd = () => {
    setQuizComplete(true);
  };

  async function handleQuizFinish() {
    try {
      if (quizComplete && !!isCompleted) {
        await axios.put(
          `/api/courses/${courseId}/quizzes/${quizId}/progress`,
          {
            isCompleted: true,
          },
          toast.success("Progress updated")
        );
      }
      if (!nextQuizId) {
        confetti.onOpen();
      }

      router.refresh();
      if (nextQuizId) {
        router.push(`/courses/${courseId}/quizzes/${nextQuizId}`);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      {!isLocked && !quizComplete && (
        <div className="text-black text-center">
          <p className="p-8 font-bold text-20px">Score: {score}</p>
          <p className="text-[#9F50AC] font-bold pb-2 text-14px">
            Question {currentQuestionIndex + 1} out of {totalQuestions}
          </p>
          <QuestionCard
            currentQuestionIndex={currentQuestionIndex}
            question={questions[currentQuestionIndex].title}
            options={questions[currentQuestionIndex].options}
            userAnswer={userAnswers[currentQuestionIndex]}
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onClick={handleOnAnswerClick}
          />

          <div className="flex justify-evenly mt-16 ">
            <Button text="Prev" onClick={() => handleChangeQuestion(-1)} />
            <Button
              text={
                currentQuestionIndex === totalQuestions - 1 ? "End" : "Next"
              }
              onClick={
                currentQuestionIndex === totalQuestions - 1
                  ? handleQuizEnd
                  : () => handleChangeQuestion(1)
              }
            />
          </div>
        </div>
      )}
      {!isLocked && quizComplete && (
        <div className="text-center text-black">
          <h1 className="font-bold text-24px">Quiz Complete!</h1>
          <p className="p-8 font-bold text-20px">
            Your Score: {score} / {totalQuestions}
          </p>
          <p className="text-[#9F50AC] font-bold text-14px">
            Well done! You have completed the quiz.
          </p>
          <div className=" mt-16 ">
            <Button
              text={!nextQuizId ? "Finish" : "Next Quiz"}
              onClick={nextQuizId ? handleQuizFinish : () => router.push(`/`)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
