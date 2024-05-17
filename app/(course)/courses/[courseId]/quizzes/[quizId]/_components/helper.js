export const getBGColor = (userAnswer, correctAnswer, answer) => {
  const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined;

  if (
    (isAnswerCorrect === true && answer === userAnswer) ||
    (isAnswerCorrect === false && answer === correctAnswer)
  )
    return "bg-[#55AC78] text-white";

  if (isAnswerCorrect === false && answer === userAnswer)
    return "bg-[#AC5050] text-white";

  return "bg-blue-400 text-[#9F50AC]";
};
