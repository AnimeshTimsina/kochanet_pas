import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBackgroundTextColor = (bgColor: string) => {
  const red = parseInt(bgColor.slice(1, 3), 16);
  const green = parseInt(bgColor.slice(3, 5), 16);
  const blue = parseInt(bgColor.slice(5, 7), 16);
  if (red * 0.299 + green * 0.587 + blue * 0.114 > 184) {
    return "#1e293b";
  }
  return "#ffffff";
};
