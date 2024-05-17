import React from "react";
import { getBGColor } from "./helper";

const QuestionCard = ({
  currentQuestionIndex,
  question,
  options,
  userAnswer,
  onClick,
  correctAnswer,
}) => {
  return (
    <div>
      <div className="p-5 flex flex-col ">
        <p
          className="text-20px max-w-400px text-lg"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className="flex flex-col items-center pt-8">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onClick(options.indexOf(option) + 1)}
            className={`${getBGColor(
              userAnswer,
              correctAnswer,
              options.indexOf(option) + 1
            )} cursor-pointer flex items-center justify-center select-none font-bold min-h-45px size-8 max-w-400 w-80 my-2 rounded-full`}
          >
            <span
              className="truncate"
              dangerouslySetInnerHTML={{ __html: option }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
