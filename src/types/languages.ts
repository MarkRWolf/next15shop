// languages.ts
export type LanguageKey = "daDK" | "enGB" | "deDE";
export const SUPPORTED_LANGUAGES: { code: LanguageKey; label: string }[] = [
  { code: "enGB", label: "English (UK)" },
  { code: "daDK", label: "Danish (DK)" },
  { code: "deDE", label: "German (DE)" },
];
export const DEFAULT_LANGUAGE: LanguageKey = "daDK";
