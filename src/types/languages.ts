// languages.ts
export type LanguageKey = "daDK" | "enGB";
export const SUPPORTED_LANGUAGES: { code: LanguageKey; label: string }[] = [
  { code: "enGB", label: "English (UK)" },
  { code: "daDK", label: "Danish (DK)" },
];
export const DEFAULT_LANGUAGE: LanguageKey = "daDK";
