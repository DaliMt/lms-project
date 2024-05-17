"use client";

import ConfirmModal from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function QuizActions({
  disabled,
  courseId,
  quizId,
  isPublished,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/quizzes/${quizId}/unpublish`
        );
        toast.success("Quiz unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/quizzes/${quizId}/publish`);
        toast.success("Quiz published");
      }
      router.refresh();
      return;
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/quizzes/${quizId}`);
      toast.success("Quiz deleted");
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
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
