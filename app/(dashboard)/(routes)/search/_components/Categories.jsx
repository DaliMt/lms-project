"use client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import CategoryItem from "./CategoryItem";

<<<<<<< HEAD
  const iconMap = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Web dev": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
  };
=======
const iconMap = {
  music: FcMusic,
  // "Photography": FcOldTimeCamera,
  finance: FcSportsMode,
  accounting: FcSalesPerformance,
  "web dev": FcMultipleDevices,
  // "Filming": FcFilmReel,
  // "Engineering": FcEngineering,
};
>>>>>>> f52273743e40551e1af9853cffd6f296535350c1

export default function Categories({ items }) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item._id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item._id}
        />
      ))}
    </div>
  );
}
