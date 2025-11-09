import { enEN } from "./en-EN";
import { nlNL } from "./nl-NL";

export type Locale = "en-EN" | "nl-NL";

export type TranslationKeys = typeof enEN;

export const translations = {
  "en-EN": enEN,
  "nl-NL": nlNL,
} as const;

export const defaultLocale: Locale = "en-EN";

export const availableLocales: Locale[] = ["en-EN", "nl-NL"];

export type TranslationKey = string; // Will be used for nested key access like "common.name"

