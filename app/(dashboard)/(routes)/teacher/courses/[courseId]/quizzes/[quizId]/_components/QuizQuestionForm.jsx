"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
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
import QuizQuestionList from "./QuizQuestionList";

const formSchema = z.object({
  title: z.string().min(1),
});

export default function QuizQuestionForm({
  initialData,
  quizId,
  question,
  courseId,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((e) => !e);
  };

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values) {
    try {
      console.log(values);
      await axios.post(
        `/api/courses/${courseId}/quizzes/${quizId}/questions`,
        values
      );
      toast.success("question created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("something was wrong !");
    }
  }

  async function onReorder(updateData) {
    try {
      console.log("questions ::: ", question);
      console.log("updateddatais :", updateData);
      setIsUpdating(true);
      await axios.put(
        `/api/courses/${courseId}/quizzes/${quizId}/questions/reorder`,
        {
          list: updateData,
        }
      );
      toast.success("questions reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id) => {
    router.push(
      `/teacher/courses/${courseId}/quizzes/${quizId}/questions/${id}`
    );
  };

  return (
    <div className="relative mt-6 border  bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center ">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex   justify-between items-center">
        quiz questions
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating && <>Cancel</>}

          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a question
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 text-gray-200"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-gray-700"
                      disabled={isSubmitting}
                      placeholder=" quiz title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.questions.length && "text-slate-500 italic"
          )}
        >
          {!initialData.questions.length && "No quizzes"}

          <QuizQuestionList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.questions || []}
            question={question}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and Drop to reorder the questions
        </p>
      )}
    </div>
  );
}
