export const dynamic = "force-dynamic";

import About from "@/components/about/About";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const AboutPage = async () => {
  const [aboutText, examplesText] = await Promise.all([
    getLocalizedTexts("about"),
    getLocalizedTexts("examples"),
  ]);

  return <About aboutText={aboutText} examplesText={examplesText} />;
};

export default AboutPage;
