import connectMongoDB from "@/lib/mongodb";
import { Purchase } from "@/models/purchase";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/CourseProgress";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CourseQuizItem from "./CourseQuizItem";

export default async function CourseSidebar({ course, progressCount }) {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/dashboard");
  const userId = session?.user?._id;

  await connectMongoDB();
  const purchase = await Purchase.findOne({
    userId,
    courseId: course._id,
  });
  console.log("userId to put it in purchage ::  ", session);
  console.log("purchese is ::", purchase);
  course.quizzes.map((quiz) => console.log("ttttttttttt ::", quiz.title));
  console.log("ttttttttttt ::", course.title);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-7 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter._id}
            id={chapter._id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course._id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
      {purchase && (
        <div className="p-5 flex flex-col border-b ">
          <h2 className="font-semibold text-blue-600/75">Quizzes</h2>
        </div>
      )}
      <div className="flex flex-col w-full">
        {course.quizzes.map((quiz) => (
          <CourseQuizItem
            key={quiz._id}
            id={quiz._id}
            label={quiz.title}
            isCompleted={!!quiz.userQProgress?.[0]?.isCompleted}
            courseId={course._id}
            isLocked={!purchase}
          />
        ))}
      </div>
    </div>
  );
}
