"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryItem({ label, value, icon: Icon }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryIds = searchParams.get("categoryIds")?.split(",") || [];
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryIds.includes(value);

  function onClick() {
    let newCategoryIds;

    if (isSelected) {
      newCategoryIds = currentCategoryIds.filter((id) => id !== value);
    } else {
      newCategoryIds = [...currentCategoryIds, value];
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryIds: newCategoryIds.length ? newCategoryIds.join(",") : null,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
}
