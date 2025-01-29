import Terms from "@/components/terms/Terms";
import { Language } from "../../../../sanity.types";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const AboutPage = async () => {
  const termsText: Language[] = await getLocalizedTexts("terms");

  return <Terms termsText={termsText} />;
};

export default AboutPage;
