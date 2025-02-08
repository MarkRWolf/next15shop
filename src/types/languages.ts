// languages.ts
export type LanguageKey = "daDK" | "enGB";
export const SUPPORTED_LANGUAGES: { code: LanguageKey; label: string }[] = [
  { code: "enGB", label: "English (UK)" },
  { code: "daDK", label: "Danish (DK)" },
];
export const DEFAULT_LANGUAGE: LanguageKey = "daDK";
export type nameKey = `name_${LanguageKey}`;

export type nameFields = {
  [K in nameKey]: string;
};
