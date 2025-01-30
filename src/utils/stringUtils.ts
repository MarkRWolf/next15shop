export const arrayFromNewLines = (text: string): string[] => {
  const normalizedText = text.replace(/\\n/g, "\n");
  return normalizedText.split("\n");
};
