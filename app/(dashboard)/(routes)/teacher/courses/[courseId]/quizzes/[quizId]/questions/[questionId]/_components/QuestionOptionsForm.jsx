"use client";
import axios from "axios";
import React, { useState } from "react";

const QuestionOptionsForm = ({ initialData, questionId, quizId, courseId }) => {
  let initialOptions = initialData.options;
  if (initialOptions.length === 0) {
    initialOptions = [""];
  }

  const [options, setOptions] = useState(initialOptions);
  if ((initialData.options = [])) {
    initialOptions = initialData.options || [""];
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = async () => {
    try {
      const newOptions = [...options, ""];
      setOptions(newOptions);

      const nonEmptyOptions = newOptions.filter((option) => option !== "");
      await axios.patch(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`,
        { options: nonEmptyOptions }
      );
    } catch (error) {
      console.error("Error adding option:", error);
    }
  };

  const handleRemoveOption = async (index) => {
    try {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
      const nonEmptyOptions = newOptions.filter((option) => option !== "");
      await axios.patch(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`,
        { options: nonEmptyOptions }
      );
    } catch (error) {
      console.error("Error removing option:", error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />

          <button
            type="button"
            onClick={() => handleRemoveOption(index)}
            className="text-red-500 font-bold px-3 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddOption}
        className="mt-2 bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Option
      </button>
    </div>
  );
};

export default QuestionOptionsForm;
