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
import QuizzesList from "./QuizzesList";

const formSchema = z.object({
  title: z.string().min(1),
});

export default function QuizForm({ initialData, courseId, quiz }) {
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
      await axios.post(`/api/courses/${courseId}/quizzes`, values);
      toast.success("quiz created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("something was wrong !");
    }
  }

  async function onReorder(updateData) {
    try {
      console.log("quizzes ::: ", quiz);
      console.log("updateddatais :", updateData);
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/quizzes/reorder`, {
        list: updateData,
      });
      toast.success("quizzes reordered");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id) => {
    router.push(`/teacher/courses/${courseId}/quizzes/${id}`);
  };

  return (
    <div className="relative mt-6 border  bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center ">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex   justify-between items-center">
        Course quizzes
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating && <>Cancel</>}

          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a quiz
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
            !initialData.quizzes.length && "text-slate-500 italic"
          )}
        >
          {!initialData.quizzes.length && "No quizzes"}

          <QuizzesList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.quizzes || []}
            quiz={quiz}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and Drop to reorder the quizzes
        </p>
      )}
    </div>
  );
}

// "use client";
// import * as z from "zod";
// import axios from "axios";
// import React, { useState } from "react";
// import Quiz from "@/models/quiz";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PlusCircle } from "lucide-react";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "Title is required",
//   }),
// });

// export default function QuizForm({ initialData, courseId, quiz }) {
//   // State variables for storing the quiz data
//   const [Quizs, setQuizs] = useState([]);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: initialData,
//   });

//   const { isSubmitting, isValid } = form.formState;

//   async function onSubmit(values) {
//     try {
//       console.log(values);
//     } catch {
//       toast.error("something was wrong !");
//     }
//   }

//   // Function to handle adding a new Quiz
//   const addQuiz = () => {
//     // Create a new Quiz object based on the QuizSchema
//     const newQuiz = { Quiz: "", options: [], correctAnswer: "" };

//     // Add the new Quiz to the list of Quizs
//     setQuizs([...Quizs, newQuiz]);
//   };

//   return (
//     <div className="mt-6 border  bg-slate-100 rounded-md p-4">
//       {/* Button to add a new Quiz */}
//       <div className="font-medium flex   justify-between items-center">
//         Quizs
//         <Button onClick={addQuiz} variant="ghost">
//           <PlusCircle className="h-4 w-4 mr-2" />
//           Add Quiz
//         </Button>
//       </div>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-4 mt-4 text-gray-200"
//         >
//           <FormField
//             control={form.control}
//             name="title"
//             render={() => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     className="text-gray-700"
//                     disabled={isSubmitting}
//                     placeholder=" exemple : this is my course title"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex items-center gap-x-2">
//             <Button disabled={!isValid || isSubmitting} type="submit">
//               Save
//             </Button>
//           </div>
//         </form>
//       </Form>

//       {/* Render the Quizs */}
//       {Quizs.map((Quiz, index) => (
//         <div
//           key={index}
//           className="font-medium flex   justify-between items-center"
//         >
//           {/* Render the Quiz text */}
//           <input
//             type="text"
//             value={Quiz.Quiz}
//             onChange={(e) => {
//               // Update the Quiz text
//               const updatedQuiz = { ...Quiz, Quiz: e.target.value };
//               const updatedQuizs = [...Quizs];
//               updatedQuizs[index] = updatedQuiz;
//               setQuizs(updatedQuizs);
//             }}
//           />

//           {/* Render the options */}
//           {Quiz.options.map((option, optionIndex) => (
//             <div key={optionIndex}>
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(e) => {
//                   // Update the option
//                   const updatedQuiz = { ...Quiz };
//                   updatedQuiz.options[optionIndex] = e.target.value;
//                   const updatedQuizs = [...Quizs];
//                   updatedQuizs[index] = updatedQuiz;
//                   setQuizs(updatedQuizs);
//                 }}
//               />
//             </div>
//           ))}

//           {/* Render the correct answer */}
//           <input
//             type="text"
//             value={Quiz.correctAnswer}
//             onChange={(e) => {
//               // Update the correct answer
//               const updatedQuiz = {
//                 ...Quiz,
//                 correctAnswer: e.target.value,
//               };
//               const updatedQuizs = [...Quizs];
//               updatedQuizs[index] = updatedQuiz;
//               setQuizs(updatedQuizs);
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// /* import React, { useState } from "react";
// import Quiz from "@/models/quiz";

// const QuizForm = () => {
//   // State variables for storing the quiz data
//   const [Quizs, setQuizs] = useState([]);

//   // Function to handle adding a new Quiz
//   const addQuiz = () => {
//     // Create a new Quiz object based on the QuizSchema
//     const newQuiz = { ...Quiz.text };

//     // Add the new Quiz to the list of Quizs
//     setQuizs([...Quizs, newQuiz]);
//   };

//   return (
//     <div>
//       {/* Render the Quizs */}
//       {Quizs.map((Quiz, index) => (
//         <div key={index}>
//           {/* Render the Quiz text */}
//           <input
//             type="text"
//             value={Quiz.text}
//             onChange={(e) => {
//               // Update the Quiz text
//               const updatedQuiz = { ...Quiz, text: e.target.value };
//               const updatedQuizs = [...Quizs];
//               updatedQuizs[index] = updatedQuiz;
//               setQuizs(updatedQuizs);
//             }}
//           />

//           {/* Render the options */}
//           {Quiz.options.map((option, optionIndex) => (
//             <div key={optionIndex}>
//               <input
//                 type="text"
//                 value={option}
//                 onChange={(e) => {
//                   // Update the option
//                   const updatedQuiz = { ...Quiz };
//                   updatedQuiz.options[optionIndex] = e.target.value;
//                   const updatedQuizs = [...Quizs];
//                   updatedQuizs[index] = updatedQuiz;
//                   setQuizs(updatedQuizs);
//                 }}
//               />
//             </div>
//           ))}

//           {/* Render the correct answer */}
//           <input
//             type="text"
//             value={Quiz.correctAnswer}
//             onChange={(e) => {
//               // Update the correct answer
//               const updatedQuiz = {
//                 ...Quiz,
//                 correctAnswer: e.target.value,
//               };
//               const updatedQuizs = [...Quizs];
//               updatedQuizs[index] = updatedQuiz;
//               setQuizs(updatedQuizs);
//             }}
//           />
//         </div>
//       ))}

//       {/* Button to add a new Quiz */}
//       <button onClick={addQuiz}>Add Quiz</button>
//     </div>
//   );
// };

// export default QuizForm;
