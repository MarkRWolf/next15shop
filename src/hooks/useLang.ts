import useLangStore from "@/store/langStore";

const useLang = () => {
  const { lang } = useLangStore();
  return lang;
};

export default useLang;
