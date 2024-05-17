import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/course";
import { Quiz } from "@/models/quiz";
import { redirect } from "next/navigation";

export default async function CourseIdPage({ params }) {
  await connectMongoDB();
  // Find the course by courseId
  const course = await Course.findById(params.courseId)
    .populate({
      path: "chapters",
      match: { isPublished: true }, // Filter only published chapters
      options: { sort: { position: 1 } }, // Sort chapters by position in ascending order
    })
    .populate({
      path: "quizzes",
      model: Quiz,
      match: { isPublished: true },
      options: { sort: { position: 1 } },
    })
    .exec();
  console.log("COURSE DETAZILS / ++", course);
  console.log("COURSE DETAZILS / ++");

  // console.log("quizzzzzzzzess ::", quiz.title);

  // If the course doesn't exist, redirect to home page
  if (!course) {
    return redirect("/");
  }
  // Redirect to the URL of the first published chapter of the course
  return redirect(`/courses/${course._id}/chapters/${course.chapters[0]._id}`);
}
