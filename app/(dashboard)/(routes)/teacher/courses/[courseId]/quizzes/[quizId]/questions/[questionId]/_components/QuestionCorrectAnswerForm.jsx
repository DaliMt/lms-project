"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  correctAnswer: z.string().min(1, {
    message: "Correct Answer is required",
  }),
});

export default function QuestionCorrectAnswerForm({
  initialData,
  questionId,
  quizId,
  courseId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      await axios.patch(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`,
        values
      );
      toast.success("Correct answer updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex justify-between items-center">
        Correct Answer
        <Button onClick={() => setIsEditing((prev) => !prev)} variant="ghost">
          {isEditing ? "Cancel" : "Edit Correct Answer"}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.correctAnswer && "text-slate-500 italic"
          )}
        >
          {initialData.correctAnswer || "No correct answer"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 text-gray-200"
          >
            <FormField
              control={form.control}
              name="correctAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-gray-700"
                      disabled={isSubmitting}
                      placeholder="e.g. Option 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
