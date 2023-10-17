import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomString():string {
    var random_string = Math.random().toString(32).substring(2, 6) + Math.random().toString(32).substring(2, 6);
    return random_string
}