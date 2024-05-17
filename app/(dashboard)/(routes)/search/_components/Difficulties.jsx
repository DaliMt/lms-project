"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Difficulties() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDifficulty = searchParams.get("difficulty");

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  function onClick(difficulty) {
    const newDifficulty = currentDifficulty === difficulty ? null : difficulty;

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...Object.fromEntries(searchParams.entries()), // Keep existing query parameters
          difficulty: newDifficulty,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }

  return (
    <div className="flex gap-2">
      {difficulties.map((difficulty) => {
        const isSelected = currentDifficulty === difficulty;
        return (
          <button
            key={difficulty}
            onClick={() => onClick(difficulty)}
            className={cn(
              "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
              isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            type="button"
          >
            {difficulty}
          </button>
        );
      })}
    </div>
  );
}
