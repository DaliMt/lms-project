"use client";

import { Quiz } from "@/models/quiz";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grid, Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QuizzesList({ items, onReorder, onEdit, quiz }) {
  const [isMounted, setIsMounted] = useState(false);
  const [quizzes, setQuizzes] = useState(quiz);
  // we use useefffect to prevent the hidration problem when moutin the clien componant in the server side page
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setQuizzes(quiz);
  }, [quiz]);

  console.log(items);
  console.log("quiz:", quiz);
  if (!isMounted) {
    return null;
  }

  function onDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(quizzes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedQuizzes = items.slice(startIndex, endIndex + 1);

    setQuizzes(items);
    console.log("items :", items);

    const bulkUpdateData = updatedQuizzes.map((quiz) => ({
      id: quiz._id,
      position: items.findIndex((item) => item._id === quiz._id),
    }));
    console.log("id :", quiz._id);
    console.log("bulkUpdateData : ", bulkUpdateData);

    console.log("quizzes : ", quizzes);

    onReorder(bulkUpdateData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="quizzes">
        {(provided) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            {quizzes?.map((quiz, index) => (
              <Draggable key={quiz._id} draggableId={quiz._id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "`flex items-center gap-x-2 bg-gray-200 border-gray-200 border text-gray-700 rounded-md mb-4 text-sm",
                      quiz.isPublished &&
                        "bg-blue-100 border-blue-200 text-blue-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        " flex gap-x-3 px-2 py-3 border-r border-r-gray-200 hover:bg-gray-300 rounded-l-md transition",
                        quiz.isPublished &&
                          "border-r-blue-200 hover:bg-blue-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <span className="flex gap-x-3">
                        <Grip className=" text-sky-700 h-5 w-5 " />
                        {quiz.title}
                      </span>
                      <div className="ml-auto pr-2 flex items-center gap-x-2">
                        {quiz.isFree && <Badge>Free</Badge>}
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            quiz.isPublished && "bg-sky-700"
                          )}
                        >
                          {quiz.isPublished ? "Published" : "Draft"}
                        </Badge>
                        <Pencil
                          onClick={() => onEdit(quiz._id)}
                          className="w-4 h-4 cursor-pointer hover:opacity-75 hover:text-sky-700   transition"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
