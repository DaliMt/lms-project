"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function QuestionActions({
  disabled,
  courseId,
  quizId,
  questionId,
  isPublished,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`
      );
      toast.success("Question deleted");
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
