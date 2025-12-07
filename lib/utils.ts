import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names using clsx and tailwind-merge.
 * This ensures that Tailwind classes are properly deduplicated and merged.
 * 
 * @param inputs - The class values to merge (strings, objects, arrays, etc.)
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
